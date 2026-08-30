'use client';

import { db } from './db';
import type { CheckInEvent, Club, Scan } from './types';

export const ATTENDANCE_SHEET_URL =
  'https://docs.google.com/spreadsheets/d/1oE_lpLA3xXhXZ7H6PRpvReGskOxUfabcI7DyiiMrxOc/edit';

export const DEFAULT_SYNC_URL =
  'https://script.google.com/macros/s/AKfycbx0YFqt0zFe7eiAPtCR6bNV_ym6FedqgPdEk0QTGDSULgqc3etjaR6-GG-Ui3p3-ZNP/exec';

type SyncRecord = {
  id: string;
  checkedInAt: string;
  name: string;
  event: string;
  club: string;
  confidence: number;
  source: Scan['source'];
  device: string;
};

async function buildRecord(scan: Scan): Promise<SyncRecord> {
  const [event, club] = await Promise.all([
    db.events.get(scan.eventId) as Promise<CheckInEvent | undefined>,
    db.clubs.get(scan.clubId) as Promise<Club | undefined>,
  ]);
  return {
    id: scan.id,
    checkedInAt: scan.checkedInAt,
    name: scan.name,
    event: event?.name || 'Unknown event',
    club: club?.name || 'Unknown club',
    confidence: scan.confidence,
    source: scan.source,
    device: scan.deviceLabel,
  };
}

export async function getSyncUrl() {
  return (await db.settings.get('syncUrl'))?.value || DEFAULT_SYNC_URL;
}

export async function saveSyncUrl(value: string) {
  await db.settings.put({ key: 'syncUrl', value: value.trim() });
}

export async function syncPendingScans() {
  const syncUrl = await getSyncUrl();
  if (!syncUrl) throw new Error('The Google Sheets sync endpoint has not been connected yet.');

  const pending = await db.scans.where('syncStatus').anyOf('pending', 'error').toArray();
  if (!pending.length) return { accepted: 0, duplicates: 0 };
  await db.scans.bulkUpdate(pending.map((scan) => ({ key: scan.id, changes: { syncStatus: 'syncing' } })));

  try {
    const records = await Promise.all(pending.map(buildRecord));
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 20000);
    const response = await fetch(syncUrl, {
      method: 'POST',
      redirect: 'follow',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({ records }),
      signal: controller.signal,
    });
    window.clearTimeout(timeout);
    if (!response.ok) throw new Error(`Sync endpoint returned ${response.status}.`);
    const result = (await response.json()) as {
      ok?: boolean;
      accepted?: string[];
      duplicates?: string[];
      error?: string;
    };
    if (!result.ok) throw new Error(result.error || 'The sync endpoint rejected this batch.');
    const completedIds = new Set([...(result.accepted || []), ...(result.duplicates || [])]);
    await db.scans.bulkUpdate(
      pending.map((scan) => ({
        key: scan.id,
        changes: completedIds.has(scan.id)
          ? { syncStatus: 'synced' as const, syncError: undefined }
          : { syncStatus: 'error' as const, syncError: 'No confirmation returned for this record.' },
      })),
    );
    return { accepted: result.accepted?.length || 0, duplicates: result.duplicates?.length || 0 };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Sync failed.';
    await db.scans.bulkUpdate(
      pending.map((scan) => ({ key: scan.id, changes: { syncStatus: 'error', syncError: message } })),
    );
    throw error;
  }
}

export async function exportScansCsv() {
  const scans = await db.scans.orderBy('checkedInAt').reverse().toArray();
  const records = await Promise.all(scans.map(buildRecord));
  const escape = (value: string | number) => `"${String(value).replaceAll('"', '""')}"`;
  const rows = [
    ['Checked In', 'Name', 'Event', 'Club', 'Confidence', 'Source', 'Device', 'Scan ID'],
    ...records.map((row) => [
      row.checkedInAt,
      row.name,
      row.event,
      row.club,
      row.confidence,
      row.source,
      row.device,
      row.id,
    ]),
  ];
  const blob = new Blob([rows.map((row) => row.map(escape).join(',')).join('\n')], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `scarlet-check-in-${new Date().toISOString().slice(0, 10)}.csv`;
  link.click();
  URL.revokeObjectURL(url);
}
