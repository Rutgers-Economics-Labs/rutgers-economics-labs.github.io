export type SyncStatus = 'pending' | 'syncing' | 'synced' | 'error';

export interface Club {
  id: string;
  name: string;
  createdAt: string;
}

export interface CheckInEvent {
  id: string;
  clubId: string;
  name: string;
  startsAt: string;
  createdAt: string;
}

export interface Scan {
  id: string;
  eventId: string;
  clubId: string;
  name: string;
  normalizedName: string;
  confidence: number;
  source: 'ocr' | 'manual';
  checkedInAt: string;
  deviceLabel: string;
  syncStatus: SyncStatus;
  syncError?: string;
}

export interface AppSetting {
  key: string;
  value: string;
}

export interface OcrResult {
  name: string;
  confidence: number;
  rawText: string;
}
