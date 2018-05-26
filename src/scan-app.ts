import * as fs from 'fs';
import { Entry, scanDirSync } from './scan-fs';

const cache: { [key: string]: Entry[] } = {};

export function findAppFilesByExt(ext: string) {
  if (!cache[ext]) {
    cache[ext] = scanDirSync({
      testFile: x => x.endsWith(ext),
      testDir: x => !x.includes('node_modules') || x.includes('@travetto')
    }, process.cwd())
      .filter(x => !x.stats.isDirectory());
  }
  return cache[ext].slice(0);
}

export function findAppFiles(ext: string, pattern: RegExp) {
  return findAppFilesByExt(ext).filter(x => pattern.test(x.file));
}

export function requireAppFiles(ext: string, pattern: RegExp) {
  return findAppFiles(ext, pattern).map(x => require(x.file));
}