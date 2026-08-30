'use client';

import Image from 'next/image';
import {
  AlertTriangle,
  Camera,
  Check,
  CheckCircle2,
  ChevronDown,
  CircleOff,
  Cloud,
  CloudOff,
  Download,
  FileSpreadsheet,
  LoaderCircle,
  Plus,
  RefreshCw,
  ScanLine,
  Search,
  Settings2,
  ShieldCheck,
  Trash2,
  UserRound,
  Users,
  Wifi,
  WifiOff,
  X,
} from 'lucide-react';
import { useLiveQuery } from 'dexie-react-hooks';
import { FormEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { addScan, db, DEFAULT_EVENT_ID, initializeDatabase } from './db';
import { detectAndFlattenCard, recognizeName } from './scanner';
import { ATTENDANCE_SHEET_URL, exportScansCsv, getSyncUrl, saveSyncUrl, syncPendingScans } from './sync';
import type { OcrResult, Scan } from './types';

type TabName = 'scan' | 'people' | 'clubs' | 'sync';
type Notice = { tone: 'success' | 'warning' | 'error'; title: string; detail?: string };

const tabs: { id: TabName; label: string; icon: typeof ScanLine }[] = [
  { id: 'scan', label: 'Scan', icon: ScanLine },
  { id: 'people', label: 'People', icon: Users },
  { id: 'clubs', label: 'Clubs', icon: Settings2 },
  { id: 'sync', label: 'Sync', icon: Cloud },
];

function formatTime(value: string) {
  return new Intl.DateTimeFormat(undefined, { hour: 'numeric', minute: '2-digit' }).format(new Date(value));
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat(undefined, { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(value));
}

function statusLabel(status: Scan['syncStatus']) {
  if (status === 'synced') return 'Synced';
  if (status === 'syncing') return 'Syncing';
  if (status === 'error') return 'Retry needed';
  return 'Waiting to sync';
}

export default function ScarletCheckIn() {
  const [ready, setReady] = useState(false);
  const [activeTab, setActiveTab] = useState<TabName>('scan');
  const [selectedEventId, setSelectedEventId] = useState(DEFAULT_EVENT_ID);
  const [online, setOnline] = useState(true);
  const [cameraOn, setCameraOn] = useState(false);
  const [cameraError, setCameraError] = useState('');
  const [scanning, setScanning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [manualName, setManualName] = useState('');
  const [review, setReview] = useState<OcrResult | null>(null);
  const [notice, setNotice] = useState<Notice | null>(null);
  const [search, setSearch] = useState('');
  const [syncing, setSyncing] = useState(false);
  const [syncUrl, setSyncUrl] = useState('');
  const [showEndpoint, setShowEndpoint] = useState(false);
  const [newClubName, setNewClubName] = useState('');
  const [newEventName, setNewEventName] = useState('');
  const [newEventClubId, setNewEventClubId] = useState('rel');
  const videoRef = useRef<HTMLVideoElement>(null);
  const sourceCanvasRef = useRef<HTMLCanvasElement>(null);
  const cardCanvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const clubs = useLiveQuery(() => db.clubs.orderBy('name').toArray(), [], []);
  const events = useLiveQuery(() => db.events.orderBy('startsAt').reverse().toArray(), [], []);
  const scans = useLiveQuery(() => db.scans.orderBy('checkedInAt').reverse().toArray(), [], []);
  const pendingCount = scans.filter((scan) => scan.syncStatus !== 'synced').length;
  const selectedEvent = events.find((event) => event.id === selectedEventId) || events[0];
  const selectedClub = clubs.find((club) => club.id === selectedEvent?.clubId);
  const eventScans = scans.filter((scan) => scan.eventId === selectedEvent?.id);
  const filteredScans = eventScans.filter((scan) => scan.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()));

  useEffect(() => {
    initializeDatabase().then(async () => {
      const [eventSetting, storedUrl] = await Promise.all([db.settings.get('selectedEventId'), getSyncUrl()]);
      if (eventSetting?.value) setSelectedEventId(eventSetting.value);
      setSyncUrl(storedUrl);
      setReady(true);
    });
    setOnline(navigator.onLine);
    const handleOnline = () => setOnline(true);
    const handleOffline = () => setOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    if ('serviceWorker' in navigator) navigator.serviceWorker.register('/check-in-sw.js').catch(() => undefined);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      streamRef.current?.getTracks().forEach((track) => track.stop());
    };
  }, []);

  useEffect(() => {
    if (ready && events.length && !events.some((event) => event.id === selectedEventId)) {
      setSelectedEventId(events[0].id);
    }
  }, [events, ready, selectedEventId]);

  const chooseEvent = useCallback(async (eventId: string) => {
    setSelectedEventId(eventId);
    await db.settings.put({ key: 'selectedEventId', value: eventId });
    setNotice(null);
    setReview(null);
  }, []);

  async function startCamera() {
    setCameraError('');
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: 'environment' }, width: { ideal: 1920 }, height: { ideal: 1080 } },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      setCameraOn(true);
    } catch (error) {
      console.error('Camera could not start:', error);
      setCameraError('Camera access is unavailable. You can still check people in by name below.');
      setCameraOn(false);
    }
  }

  function stopCamera() {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
    if (videoRef.current) videoRef.current.srcObject = null;
    setCameraOn(false);
  }

  async function saveCheckIn(name: string, confidence: number, source: Scan['source']) {
    if (!selectedEvent) return;
    const result = await addScan({ eventId: selectedEvent.id, clubId: selectedEvent.clubId, name, confidence, source });
    if (result.duplicate) {
      setNotice({
        tone: 'warning',
        title: `${result.duplicate.name} is already checked in`,
        detail: `Recorded at ${formatTime(result.duplicate.checkedInAt)}. No duplicate was added.`,
      });
      return;
    }
    setNotice({ tone: 'success', title: `Welcome, ${result.scan?.name}`, detail: online ? 'Saved on this device and queued for Google Sheets.' : 'Saved safely on this device. It will sync when you are online.' });
    setReview(null);
    setManualName('');
    if (online && syncUrl) syncPendingScans().catch(() => undefined);
  }

  async function scanCard() {
    const video = videoRef.current;
    const sourceCanvas = sourceCanvasRef.current;
    const cardCanvas = cardCanvasRef.current;
    if (!video || !sourceCanvas || !cardCanvas || !video.videoWidth) return;
    setScanning(true);
    setProgress(0.05);
    setNotice(null);
    setReview(null);
    try {
      sourceCanvas.width = video.videoWidth;
      sourceCanvas.height = video.videoHeight;
      sourceCanvas.getContext('2d', { willReadFrequently: true })?.drawImage(video, 0, 0);
      const found = await detectAndFlattenCard(sourceCanvas, cardCanvas);
      if (!found) {
        setNotice({ tone: 'warning', title: 'Card not found', detail: 'Center the ID inside the guide, reduce glare, and try again.' });
        return;
      }
      setProgress(0.2);
      const result = await recognizeName(cardCanvas, (value) => setProgress(0.2 + value * 0.8));
      if (!result.name) {
        setNotice({ tone: 'warning', title: 'Name could not be read', detail: 'Try again in brighter light, or use manual check-in.' });
      } else if (result.confidence >= 82) {
        await saveCheckIn(result.name, result.confidence, 'ocr');
      } else {
        setReview(result);
      }
    } catch (error) {
      console.error('Local scan failed:', error);
      setNotice({ tone: 'error', title: 'Scanner needs another try', detail: 'No card image was saved. You can retake it or use manual check-in.' });
    } finally {
      setScanning(false);
      setProgress(0);
      const context = sourceCanvas.getContext('2d');
      context?.clearRect(0, 0, sourceCanvas.width, sourceCanvas.height);
    }
  }

  async function handleManualSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await saveCheckIn(manualName, 100, 'manual');
  }

  async function handleSync() {
    setSyncing(true);
    setNotice(null);
    try {
      const result = await syncPendingScans();
      setNotice({ tone: 'success', title: 'Google Sheets is up to date', detail: `${result.accepted} new record${result.accepted === 1 ? '' : 's'} synced.` });
    } catch (error) {
      setNotice({ tone: 'error', title: 'Sync could not finish', detail: error instanceof Error ? error.message : 'Try again when you are online.' });
    } finally {
      setSyncing(false);
    }
  }

  async function handleEndpointSave(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await saveSyncUrl(syncUrl);
    setShowEndpoint(false);
    setNotice({ tone: 'success', title: 'Sync endpoint saved', detail: 'Pending records can now be sent to Google Sheets.' });
  }

  async function createClub(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const name = newClubName.trim();
    if (!name) return;
    const id = crypto.randomUUID();
    await db.clubs.add({ id, name, createdAt: new Date().toISOString() });
    setNewClubName('');
    setNewEventClubId(id);
  }

  async function createEvent(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const name = newEventName.trim();
    if (!name || !newEventClubId) return;
    const id = crypto.randomUUID();
    const now = new Date().toISOString();
    await db.events.add({ id, clubId: newEventClubId, name, startsAt: now, createdAt: now });
    setNewEventName('');
    await chooseEvent(id);
    setActiveTab('scan');
  }

  async function deleteScan(scan: Scan) {
    if (!window.confirm(`Remove ${scan.name}'s check-in from this device?`)) return;
    await db.scans.delete(scan.id);
  }

  const activityText = useMemo(() => {
    if (!eventScans.length) return 'No one checked in yet';
    return `${eventScans.length} ${eventScans.length === 1 ? 'person' : 'people'} checked in`;
  }, [eventScans.length]);

  if (!ready) {
    return (
      <div className="fixed inset-0 z-[100] grid place-items-center bg-[#f7f7f4] text-[#171717]">
        <LoaderCircle className="h-8 w-8 animate-spin text-[#cc0033]" aria-label="Opening Scarlet Check-In" />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden bg-[#f7f7f4] text-[#171717] [color-scheme:light]">
      <header className="absolute inset-x-0 top-0 z-30 flex h-16 items-center border-b border-black/8 bg-white/95 px-4 backdrop-blur sm:px-6 lg:h-[72px] lg:px-8">
        <div className="flex min-w-0 items-center gap-3">
          <Image src="/images/REL Logo.JPEG" alt="Rutgers Economics Labs" width={42} height={42} priority className="h-10 w-10 rounded-xl object-cover ring-1 ring-black/8" />
          <div className="min-w-0">
            <p className="truncate text-[15px] font-bold tracking-tight">Scarlet Check-In</p>
            <p className="truncate text-xs text-black/55">Rutgers Economics Labs</p>
          </div>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <span className={`hidden items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold sm:flex ${online ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-800'}`}>
            {online ? <Wifi className="h-3.5 w-3.5" /> : <WifiOff className="h-3.5 w-3.5" />}
            {online ? 'Online' : 'Offline'}
          </span>
          <button onClick={() => setActiveTab('sync')} className="relative rounded-xl border border-black/10 bg-white p-2.5 text-black/65 transition hover:border-black/20 hover:text-black" aria-label="Open sync settings">
            {pendingCount ? <CloudOff className="h-5 w-5" /> : <Cloud className="h-5 w-5" />}
            {pendingCount > 0 && <span className="absolute -right-1 -top-1 min-w-4 rounded-full bg-[#cc0033] px-1 text-center text-[10px] font-bold leading-4 text-white">{pendingCount}</span>}
          </button>
        </div>
      </header>

      <aside className="absolute bottom-0 left-0 top-16 z-20 hidden w-60 flex-col border-r border-black/8 bg-white p-4 lg:top-[72px] lg:flex">
        <nav className="space-y-1" aria-label="Check-in sections">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition ${activeTab === tab.id ? 'bg-[#cc0033] text-white shadow-sm' : 'text-black/60 hover:bg-black/[0.04] hover:text-black'}`}>
                <Icon className="h-4.5 w-4.5" />{tab.label}
                {tab.id === 'sync' && pendingCount > 0 && <span className={`ml-auto rounded-full px-2 py-0.5 text-[11px] ${activeTab === tab.id ? 'bg-white/20' : 'bg-[#cc0033]/10 text-[#a3002a]'}`}>{pendingCount}</span>}
              </button>
            );
          })}
        </nav>
        <div className="mt-auto rounded-2xl bg-[#f7f7f4] p-4">
          <ShieldCheck className="mb-3 h-5 w-5 text-[#cc0033]" />
          <p className="text-xs font-bold">Privacy by design</p>
          <p className="mt-1.5 text-xs leading-5 text-black/55">ID images never leave this device and are discarded immediately after reading the name.</p>
        </div>
      </aside>

      <main className="absolute bottom-[72px] left-0 right-0 top-16 overflow-y-auto lg:bottom-0 lg:left-60 lg:top-[72px]">
        <div className="mx-auto max-w-6xl px-4 py-5 sm:px-6 lg:px-8 lg:py-8">
          <section className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-1 text-xs font-bold uppercase tracking-[0.18em] text-[#cc0033]">Live event</p>
              <div className="relative inline-block max-w-full">
                <select value={selectedEvent?.id || ''} onChange={(event) => chooseEvent(event.target.value)} className="max-w-full appearance-none bg-transparent py-1 pr-8 text-2xl font-bold tracking-tight outline-none sm:text-3xl" aria-label="Current event">
                  {events.map((event) => <option key={event.id} value={event.id}>{event.name}</option>)}
                </select>
                <ChevronDown className="pointer-events-none absolute right-0 top-2 h-5 w-5 text-black/45" />
              </div>
              <p className="mt-1 text-sm text-black/50">{selectedClub?.name} · {activityText}</p>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-black/50">
              <span className="rounded-full bg-white px-3 py-2 ring-1 ring-black/8">{formatDate(selectedEvent?.startsAt || new Date().toISOString())}</span>
              <span className={`rounded-full px-3 py-2 ${pendingCount ? 'bg-amber-50 text-amber-800 ring-1 ring-amber-200' : 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200'}`}>{pendingCount ? `${pendingCount} pending` : 'All synced'}</span>
            </div>
          </section>

          {notice && (
            <div role="status" className={`mb-5 flex items-start gap-3 rounded-2xl border p-4 ${notice.tone === 'success' ? 'border-emerald-200 bg-emerald-50 text-emerald-950' : notice.tone === 'warning' ? 'border-amber-200 bg-amber-50 text-amber-950' : 'border-red-200 bg-red-50 text-red-950'}`}>
              {notice.tone === 'success' ? <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" /> : notice.tone === 'warning' ? <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" /> : <CircleOff className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />}
              <div className="min-w-0"><p className="font-bold">{notice.title}</p>{notice.detail && <p className="mt-0.5 text-sm opacity-70">{notice.detail}</p>}</div>
              <button onClick={() => setNotice(null)} className="ml-auto rounded-lg p-1 opacity-50 hover:bg-black/5 hover:opacity-100" aria-label="Dismiss"><X className="h-4 w-4" /></button>
            </div>
          )}

          {activeTab === 'scan' && (
            <div className="grid gap-5 xl:grid-cols-[minmax(0,1.55fr)_minmax(320px,.75fr)]">
              <section className="overflow-hidden rounded-[28px] bg-[#171717] shadow-xl shadow-black/10">
                <div className="relative aspect-[4/3] min-h-[390px] bg-[radial-gradient(circle_at_50%_30%,#444,#161616_65%)] sm:aspect-video">
                  <video ref={videoRef} playsInline muted className={`h-full w-full object-cover ${cameraOn ? 'block' : 'hidden'}`} />
                  {!cameraOn && (
                    <div className="absolute inset-0 grid place-items-center p-8 text-center text-white">
                      <div>
                        <div className="mx-auto mb-5 grid h-16 w-16 place-items-center rounded-2xl bg-white/10 ring-1 ring-white/15"><Camera className="h-7 w-7" /></div>
                        <h2 className="text-2xl font-bold">Ready to check in</h2>
                        <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-white/60">The camera reads only the printed name. Photos and ID numbers are never saved.</p>
                        <button onClick={startCamera} className="mt-6 rounded-xl bg-[#cc0033] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#b0002c]">Turn on camera</button>
                      </div>
                    </div>
                  )}
                  {cameraOn && (
                    <>
                      <div className="pointer-events-none absolute inset-[12%] rounded-[26px] border-2 border-white/80 shadow-[0_0_0_999px_rgba(0,0,0,.35)]">
                        <span className="absolute left-1/2 top-3 -translate-x-1/2 whitespace-nowrap rounded-full bg-black/55 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur">Align Rutgers ID inside frame</span>
                      </div>
                      <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-2">
                        <button onClick={scanCard} disabled={scanning} className="flex min-w-40 items-center justify-center gap-2 rounded-2xl bg-[#cc0033] px-6 py-3.5 text-sm font-bold text-white shadow-lg transition hover:bg-[#b0002c] disabled:opacity-70">
                          {scanning ? <LoaderCircle className="h-5 w-5 animate-spin" /> : <ScanLine className="h-5 w-5" />}{scanning ? 'Reading locally…' : 'Scan ID'}
                        </button>
                        <button onClick={stopCamera} className="rounded-2xl bg-black/60 p-3.5 text-white backdrop-blur hover:bg-black/75" aria-label="Turn camera off"><X className="h-5 w-5" /></button>
                      </div>
                    </>
                  )}
                  {scanning && <div className="absolute inset-x-0 bottom-0 h-1 bg-white/20"><div className="h-full bg-[#ff5a7f] transition-[width]" style={{ width: `${Math.max(8, progress * 100)}%` }} /></div>}
                </div>
                <canvas ref={sourceCanvasRef} className="hidden" aria-hidden="true" />
                <canvas ref={cardCanvasRef} className="hidden" aria-hidden="true" />
                <div className="flex flex-wrap items-center justify-between gap-2 px-5 py-3 text-xs text-white/55">
                  <span className="flex items-center gap-1.5"><ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />Processed privately on this device</span>
                  <span>OpenCV + local OCR</span>
                </div>
              </section>

              <div className="space-y-5">
                {review && (
                  <section className="rounded-3xl border border-amber-200 bg-amber-50 p-5 shadow-sm">
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-amber-700">Review name · {review.confidence}%</p>
                    <input value={review.name} onChange={(event) => setReview({ ...review, name: event.target.value })} autoFocus className="mt-3 w-full rounded-xl border border-amber-200 bg-white px-4 py-3 text-lg font-bold outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10" aria-label="Review detected name" />
                    <div className="mt-3 flex gap-2"><button onClick={() => saveCheckIn(review.name, review.confidence, 'ocr')} className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#171717] px-4 py-3 text-sm font-bold text-white"><Check className="h-4 w-4" />Confirm</button><button onClick={() => setReview(null)} className="rounded-xl border border-amber-200 bg-white px-4 py-3 text-sm font-bold">Retake</button></div>
                  </section>
                )}
                <section className="rounded-3xl border border-black/8 bg-white p-5 shadow-sm">
                  <div className="mb-4 flex items-center gap-3"><div className="grid h-10 w-10 place-items-center rounded-xl bg-[#cc0033]/8 text-[#cc0033]"><UserRound className="h-5 w-5" /></div><div><h2 className="font-bold">Manual check-in</h2><p className="text-xs text-black/50">Fast fallback—no ID needed</p></div></div>
                  <form onSubmit={handleManualSubmit} className="space-y-3">
                    <label className="sr-only" htmlFor="manual-name">Full name</label>
                    <input id="manual-name" value={manualName} onChange={(event) => setManualName(event.target.value)} placeholder="Student full name" autoComplete="off" className="w-full rounded-xl border border-black/10 bg-[#f7f7f4] px-4 py-3 text-sm outline-none transition focus:border-[#cc0033]/50 focus:ring-4 focus:ring-[#cc0033]/8" />
                    <button disabled={!manualName.trim()} className="w-full rounded-xl bg-[#171717] px-4 py-3 text-sm font-bold text-white transition hover:bg-black disabled:cursor-not-allowed disabled:opacity-35">Check in</button>
                  </form>
                </section>
                <section className="rounded-3xl border border-black/8 bg-white p-5 shadow-sm">
                  <div className="flex items-center justify-between"><div><p className="text-sm font-bold">Recent</p><p className="text-xs text-black/45">This event</p></div><button onClick={() => setActiveTab('people')} className="text-xs font-bold text-[#cc0033]">View all</button></div>
                  <div className="mt-3 divide-y divide-black/6">
                    {eventScans.slice(0, 4).map((scan) => <div key={scan.id} className="flex items-center gap-3 py-3"><div className="grid h-8 w-8 place-items-center rounded-full bg-emerald-50 text-emerald-700"><Check className="h-4 w-4" /></div><div className="min-w-0"><p className="truncate text-sm font-semibold">{scan.name}</p><p className="text-xs text-black/40">{formatTime(scan.checkedInAt)}</p></div><span className="ml-auto text-[11px] text-black/40">{statusLabel(scan.syncStatus)}</span></div>)}
                    {!eventScans.length && <p className="py-5 text-center text-sm text-black/40">Check-ins will appear here.</p>}
                  </div>
                </section>
              </div>
            </div>
          )}

          {activeTab === 'people' && (
            <section className="overflow-hidden rounded-3xl border border-black/8 bg-white shadow-sm">
              <div className="flex flex-col gap-3 border-b border-black/7 p-5 sm:flex-row sm:items-center sm:justify-between">
                <div><h2 className="text-xl font-bold">People</h2><p className="text-sm text-black/50">{activityText}</p></div>
                <div className="flex gap-2"><label className="relative flex-1"><Search className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-black/35" /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search names" className="w-full rounded-xl border border-black/10 bg-[#f7f7f4] py-2 pl-9 pr-3 text-sm outline-none focus:border-[#cc0033]/40" /></label><button onClick={exportScansCsv} className="rounded-xl border border-black/10 p-2.5 text-black/60 hover:bg-black/[0.03]" aria-label="Download CSV"><Download className="h-4 w-4" /></button></div>
              </div>
              <div className="divide-y divide-black/6">
                {filteredScans.map((scan) => <div key={scan.id} className="flex items-center gap-3 px-5 py-4"><div className="grid h-10 w-10 place-items-center rounded-full bg-[#cc0033]/8 text-sm font-bold text-[#a3002a]">{scan.name.split(' ').slice(0, 2).map((part) => part[0]).join('')}</div><div className="min-w-0"><p className="truncate font-semibold">{scan.name}</p><p className="text-xs text-black/45">{formatTime(scan.checkedInAt)} · {scan.source === 'ocr' ? `${scan.confidence}% local OCR` : 'Manual'}</p></div><span className={`ml-auto hidden rounded-full px-2.5 py-1 text-[11px] font-semibold sm:inline ${scan.syncStatus === 'synced' ? 'bg-emerald-50 text-emerald-700' : scan.syncStatus === 'error' ? 'bg-red-50 text-red-700' : 'bg-amber-50 text-amber-800'}`}>{statusLabel(scan.syncStatus)}</span><button onClick={() => deleteScan(scan)} className="rounded-lg p-2 text-black/30 hover:bg-red-50 hover:text-red-600" aria-label={`Remove ${scan.name}`}><Trash2 className="h-4 w-4" /></button></div>)}
                {!filteredScans.length && <div className="px-5 py-16 text-center"><Users className="mx-auto h-7 w-7 text-black/20" /><p className="mt-3 text-sm font-semibold">No matching check-ins</p></div>}
              </div>
            </section>
          )}

          {activeTab === 'clubs' && (
            <div className="grid gap-5 lg:grid-cols-2">
              <section className="rounded-3xl border border-black/8 bg-white p-6 shadow-sm"><p className="text-xs font-bold uppercase tracking-[0.16em] text-[#cc0033]">Organizations</p><h2 className="mt-1 text-xl font-bold">Clubs</h2><div className="mt-5 space-y-2">{clubs.map((club) => <div key={club.id} className="flex items-center gap-3 rounded-2xl bg-[#f7f7f4] p-3"><Image src={club.id === 'rel' ? '/images/REL Logo.JPEG' : '/favicon.ico'} alt="" width={40} height={40} className="h-10 w-10 rounded-xl object-cover" /><div><p className="text-sm font-bold">{club.name}</p><p className="text-xs text-black/45">{events.filter((event) => event.clubId === club.id).length} events</p></div></div>)}</div><form onSubmit={createClub} className="mt-5 flex gap-2"><input value={newClubName} onChange={(event) => setNewClubName(event.target.value)} placeholder="New club name" className="min-w-0 flex-1 rounded-xl border border-black/10 bg-[#f7f7f4] px-4 py-3 text-sm outline-none focus:border-[#cc0033]/40" /><button className="rounded-xl bg-[#171717] px-4 text-white" aria-label="Add club"><Plus className="h-4 w-4" /></button></form></section>
              <section className="rounded-3xl border border-black/8 bg-white p-6 shadow-sm"><p className="text-xs font-bold uppercase tracking-[0.16em] text-[#cc0033]">Sessions</p><h2 className="mt-1 text-xl font-bold">Events</h2><div className="mt-5 space-y-2">{events.map((event) => <button key={event.id} onClick={() => { chooseEvent(event.id); setActiveTab('scan'); }} className={`w-full rounded-2xl p-4 text-left transition ${event.id === selectedEvent?.id ? 'bg-[#cc0033] text-white' : 'bg-[#f7f7f4] hover:bg-black/[0.06]'}`}><p className="text-sm font-bold">{event.name}</p><p className={`mt-1 text-xs ${event.id === selectedEvent?.id ? 'text-white/65' : 'text-black/45'}`}>{clubs.find((club) => club.id === event.clubId)?.name} · {formatDate(event.startsAt)}</p></button>)}</div><form onSubmit={createEvent} className="mt-5 space-y-2"><input value={newEventName} onChange={(event) => setNewEventName(event.target.value)} placeholder="New event name" className="w-full rounded-xl border border-black/10 bg-[#f7f7f4] px-4 py-3 text-sm outline-none focus:border-[#cc0033]/40" /><select value={newEventClubId} onChange={(event) => setNewEventClubId(event.target.value)} className="w-full rounded-xl border border-black/10 bg-[#f7f7f4] px-4 py-3 text-sm outline-none">{clubs.map((club) => <option key={club.id} value={club.id}>{club.name}</option>)}</select><button className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#171717] px-4 py-3 text-sm font-bold text-white"><Plus className="h-4 w-4" />Create event</button></form></section>
            </div>
          )}

          {activeTab === 'sync' && (
            <div className="grid gap-5 lg:grid-cols-[1.2fr_.8fr]">
              <section className="rounded-3xl border border-black/8 bg-white p-6 shadow-sm">
                <div className="flex items-start gap-4"><div className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl ${syncUrl ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>{syncUrl ? <FileSpreadsheet className="h-6 w-6" /> : <CloudOff className="h-6 w-6" />}</div><div><p className="text-xs font-bold uppercase tracking-[0.16em] text-[#cc0033]">Google Sheets</p><h2 className="mt-1 text-xl font-bold">Attendance sync</h2><p className="mt-2 text-sm leading-6 text-black/55">Every check-in is saved locally first. When connected, only the name and event record are appended to the attendance sheet.</p></div></div>
                <div className="mt-6 grid grid-cols-3 gap-2"><div className="rounded-2xl bg-[#f7f7f4] p-4"><p className="text-2xl font-bold">{scans.length}</p><p className="mt-1 text-xs text-black/45">On device</p></div><div className="rounded-2xl bg-[#f7f7f4] p-4"><p className="text-2xl font-bold text-emerald-700">{scans.filter((scan) => scan.syncStatus === 'synced').length}</p><p className="mt-1 text-xs text-black/45">Synced</p></div><div className="rounded-2xl bg-[#f7f7f4] p-4"><p className="text-2xl font-bold text-amber-700">{pendingCount}</p><p className="mt-1 text-xs text-black/45">Pending</p></div></div>
                <div className="mt-5 flex flex-col gap-2 sm:flex-row"><button onClick={handleSync} disabled={syncing || !online || !pendingCount || !syncUrl} className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#cc0033] px-5 py-3 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-40">{syncing ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}Sync now</button><a href={ATTENDANCE_SHEET_URL} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 rounded-xl border border-black/10 px-5 py-3 text-sm font-bold hover:bg-black/[0.03]"><FileSpreadsheet className="h-4 w-4" />Open sheet</a><button onClick={exportScansCsv} className="flex items-center justify-center gap-2 rounded-xl border border-black/10 px-5 py-3 text-sm font-bold hover:bg-black/[0.03]"><Download className="h-4 w-4" />CSV</button></div>
                {!syncUrl && <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-950"><p className="font-bold">Endpoint connection pending</p><p className="mt-1 leading-6 opacity-70">Check-ins remain safely stored on this device until the Google Apps Script web endpoint is connected.</p></div>}
              </section>
              <div className="space-y-5">
                <section className="rounded-3xl border border-black/8 bg-white p-6 shadow-sm"><h2 className="font-bold">What is stored</h2><div className="mt-4 space-y-3 text-sm text-black/55"><p className="flex gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />Name, club, event, time, confidence, device label, and unique scan ID</p><p className="flex gap-2"><X className="mt-0.5 h-4 w-4 shrink-0 text-[#cc0033]" />No ID image, student photo, RUID, barcode, or ID number</p><p className="flex gap-2"><ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />Duplicate scan IDs make retries safe</p></div></section>
                <section className="rounded-3xl border border-black/8 bg-white p-6 shadow-sm"><button onClick={() => setShowEndpoint((value) => !value)} className="flex w-full items-center justify-between text-left"><div><h2 className="font-bold">Advanced connection</h2><p className="mt-1 text-xs text-black/45">Google Apps Script web-app URL</p></div><Settings2 className="h-5 w-5 text-black/40" /></button>{showEndpoint && <form onSubmit={handleEndpointSave} className="mt-4 space-y-3"><input type="url" value={syncUrl} onChange={(event) => setSyncUrl(event.target.value)} placeholder="https://script.google.com/macros/s/…/exec" className="w-full rounded-xl border border-black/10 bg-[#f7f7f4] px-4 py-3 text-xs outline-none focus:border-[#cc0033]/40" /><button className="w-full rounded-xl bg-[#171717] px-4 py-3 text-sm font-bold text-white">Save connection</button></form>}</section>
              </div>
            </div>
          )}
        </div>
      </main>

      <nav className="absolute inset-x-0 bottom-0 z-30 grid h-[72px] grid-cols-4 border-t border-black/8 bg-white/95 px-2 pb-[env(safe-area-inset-bottom)] backdrop-blur lg:hidden" aria-label="Check-in sections">
        {tabs.map((tab) => { const Icon = tab.icon; return <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`relative flex flex-col items-center justify-center gap-1 text-[11px] font-semibold ${activeTab === tab.id ? 'text-[#cc0033]' : 'text-black/45'}`}><Icon className="h-5 w-5" />{tab.label}{tab.id === 'sync' && pendingCount > 0 && <span className="absolute right-[27%] top-2.5 h-2 w-2 rounded-full bg-[#cc0033] ring-2 ring-white" />}</button>; })}
      </nav>
      {cameraError && <div className="fixed bottom-20 left-4 right-4 z-50 rounded-2xl bg-[#171717] p-4 text-sm text-white shadow-xl lg:bottom-5 lg:left-auto lg:right-5 lg:max-w-sm">{cameraError}</div>}
    </div>
  );
}
