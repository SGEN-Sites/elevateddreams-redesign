// pw.mjs: tiny shared loader for headless Chromium (capture and verification tooling only, never shipped).
// Set PW_CORE to a playwright-core install, or have playwright-core resolvable from this folder.
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
export const { chromium } = require(process.env.PW_CORE || 'playwright-core');
export const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
