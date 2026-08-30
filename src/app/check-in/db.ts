'use client';

import Dexie, { type EntityTable } from 'dexie';
import type { AppSetting, CheckInEvent, Club, Scan } from './types';

class ScarletCheckInDatabase extends Dexie {
  clubs!: EntityTable<Club, 'id'>;
  events!: EntityTable<CheckInEvent, 'id'>;
  scans!: EntityTable<Scan, 'id'>;
  settings!: EntityTable<AppSetting, 'key'>;

  constructor() {
    super('scarlet-check-in');
    this.version(1).stores({
      clubs: 'id, name, createdAt',
      events: 'id, clubId, startsAt, createdAt',
      scans: 'id, eventId, clubId, normalizedName, checkedInAt, syncStatus, [eventId+normalizedName]',
      settings: 'key',
    });
  }
}

export const db = new ScarletCheckInDatabase();

export const DEFAULT_CLUB_ID = 'rel';
export const DEFAULT_EVENT_ID = 'rel-general';

function newId() {
  return crypto.randomUUID();
}

export function normalizeName(value: string) {
  return value.trim().replace(/\s+/g, ' ').toLocaleLowerCase();
}

export async function initializeDatabase() {
  const now = new Date().toISOString();
  if (!(await db.clubs.get(DEFAULT_CLUB_ID))) {
    await db.clubs.add({ id: DEFAULT_CLUB_ID, name: 'Rutgers Economics Labs', createdAt: now });
  }
  if (!(await db.events.get(DEFAULT_EVENT_ID))) {
    await db.events.add({
      id: DEFAULT_EVENT_ID,
      clubId: DEFAULT_CLUB_ID,
      name: 'General Check-In',
      startsAt: now,
      createdAt: now,
    });
  }
  if (!(await db.settings.get('deviceLabel'))) {
    await db.settings.add({ key: 'deviceLabel', value: `Check-in device ${newId().slice(0, 4).toUpperCase()}` });
  }
  if (!(await db.settings.get('selectedEventId'))) {
    await db.settings.add({ key: 'selectedEventId', value: DEFAULT_EVENT_ID });
  }
}

export async function addScan(input: {
  eventId: string;
  clubId: string;
  name: string;
  confidence: number;
  source: Scan['source'];
}): Promise<{ scan?: Scan; duplicate?: Scan }> {
  const normalizedName = normalizeName(input.name);
  if (!normalizedName) throw new Error('Enter a name before checking in.');

  const duplicate = await db.scans
    .where('[eventId+normalizedName]')
    .equals([input.eventId, normalizedName])
    .first();
  if (duplicate) return { duplicate };

  const deviceLabel = (await db.settings.get('deviceLabel'))?.value || 'Check-in device';
  const scan: Scan = {
    id: newId(),
    eventId: input.eventId,
    clubId: input.clubId,
    name: input.name.trim().replace(/\s+/g, ' '),
    normalizedName,
    confidence: Math.round(input.confidence),
    source: input.source,
    checkedInAt: new Date().toISOString(),
    deviceLabel,
    syncStatus: 'pending',
  };
  await db.scans.add(scan);
  return { scan };
}
