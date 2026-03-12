import { zipSync, strToU8 } from 'fflate';

export interface ZipEntry {
  filename: string;
  svgContent: string;
}

export function createAndDownloadZip(zipName: string, entries: ZipEntry[]): void {
  const files: Record<string, Uint8Array> = {};
  for (const entry of entries) {
    files[entry.filename] = strToU8(entry.svgContent);
  }
  const zipped = zipSync(files, { level: 6 });
  const blob = new Blob([zipped.buffer as ArrayBuffer], { type: 'application/zip' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = zipName;
  anchor.click();
  URL.revokeObjectURL(url);
}
