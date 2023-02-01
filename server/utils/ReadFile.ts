import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';

export function readFn (path: string) : string {
	return readFileSync(resolve(__dirname, path), 'utf-8')
}