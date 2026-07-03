import { getAccessToken } from './auth.js';

async function main() {
  // 1. Authentication
  const token = await getAccessToken();
}

main().catch(err => console.error('Request failed:', err));