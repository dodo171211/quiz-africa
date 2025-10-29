# Railway Configuration

## Build Settings
- Builder: NIXPACKS (automático)
- Node.js Version: 18+
- Start Command: node server.js

## Environment Variables
- NODE_ENV: production
- PORT: 3000 (automático)

## Health Check
- Path: /
- Timeout: 100ms

## Restart Policy
- Type: ON_FAILURE
- Max Retries: 10

## Deploy Settings
- Auto Deploy: Enabled
- Branch: main/master
- Build Command: npm install
- Start Command: node server.js
