export interface TimelapseInput {
  targetClipSeconds: number; // e.g. 10 seconds
  clipFps: number;           // e.g. 24 fps
  eventDurationMinutes: number; // e.g. 120 minutes
  photoSizeMb?: number;      // e.g. 25 MB per RAW
}

export interface TimelapseResult {
  totalFrames: number;
  intervalSeconds: number;
  shootingDurationFormatted: string;
  totalStorageGb: number;
  speedupFactor: number;
}

export function calculateTimelapse(input: TimelapseInput): TimelapseResult {
  const fps = Math.max(1, input.clipFps || 24);
  const clipSec = Math.max(1, input.targetClipSeconds || 10);
  const eventMin = Math.max(1, input.eventDurationMinutes || 60);
  const photoMb = input.photoSizeMb || 25;

  const totalFrames = Math.round(clipSec * fps);
  const eventSeconds = eventMin * 60;
  const intervalSeconds = Math.max(0.1, eventSeconds / totalFrames);

  const hours = Math.floor(eventMin / 60);
  const mins = eventMin % 60;
  const shootingDurationFormatted = hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;

  const totalStorageGb = (totalFrames * photoMb) / 1024;
  const speedupFactor = eventSeconds / clipSec;

  return {
    totalFrames,
    intervalSeconds: Math.round(intervalSeconds * 10) / 10,
    shootingDurationFormatted,
    totalStorageGb: Math.round(totalStorageGb * 10) / 10,
    speedupFactor: Math.round(speedupFactor)
  };
}
