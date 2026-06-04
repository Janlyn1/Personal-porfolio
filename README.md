# Janlyn Portfolio

This is the sorted frontend/backend version of the portfolio.

## Structure

- `frontend/` - portfolio UI source (`index.html`, `css/style.css`, `js/script.js`)
- `backend/` - local API server and JSON data store
- `public/` - Vercel static frontend output
- `api/` - Vercel serverless API functions
- `lib/` - shared Vercel API helpers
- `backend/data/portfolio.json` - editable portfolio content
- `api/data/portfolio.json` - Vercel portfolio content
- `janlyn_portfolio_NAV_ADMIN_PANEL_ADD_FIXED.html` - previous single-file version
- `janlyn_portfolio_NAV_ADMIN_PANEL_ADD_FIXED.backup.html` - original backup

## Run

```powershell
node backend/server.js
```

Open:

```text
http://127.0.0.1:3000
```

## Open on Phone, Tablet, or Laptop

You now have three options:

1. Direct HTML:

```text
frontend/index.html
```

This works even without the backend because `frontend/js/script.js` has built-in fallback portfolio data.

2. Same Wi-Fi local server:

```powershell
node backend/server.js
```

Then open this on another device connected to the same Wi-Fi:

```text
http://YOUR-LAPTOP-IP:3000
```

Example:

```text
http://192.168.1.10:3000
```

3. Vercel:

Deploy the project to Vercel, then open the Vercel URL on any phone, tablet, or laptop.

## API

```text
GET /api/portfolio
GET /api/health
GET /api/appscript
POST /api/appscript/sync-certifications
POST /api/certifications
DELETE /api/certifications/:id
PUT /api/portfolio
```

Admin token defaults to:

```text
admin123
```

Use it as:

```text
x-admin-token: admin123
```

Certificates are sorted newest first by `issueDate`. Projects are sorted with featured projects first, then by `order`.

## Vercel Deploy

This project is Vercel-ready:

- Static frontend is in `public/`
- Serverless API functions are in `api/`
- Vercel config is in `vercel.json`

Deploy the root folder:

```text
C:\Users\janly\Desktop\port
```

Set these Vercel environment variables:

```text
ADMIN_TOKEN=choose-a-private-admin-password
APPS_SCRIPT_ID=1Zq5yESFCb3UuwvvNcC9fGU13Tq-5YkoPUTr2cfJ8xqVepZqkPreO4hKg
```

After deploying your Apps Script as a web app, add one of these:

```text
APPS_SCRIPT_WEBAPP_URL=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
```

or:

```text
APPS_SCRIPT_DEPLOYMENT_ID=YOUR_DEPLOYMENT_ID
```

On Vercel, API routes can read and sync data, but they cannot permanently write changes back to local JSON files. For permanent edits, update `api/data/portfolio.json`, use Apps Script as the content source, or connect a database later.

Frontend source structure:

```text
frontend/
├── index.html
├── css/style.css
└── js/script.js
```

## Apps Script

Configured Apps Script ID:

```text
1Zq5yESFCb3UuwvvNcC9fGU13Tq-5YkoPUTr2cfJ8xqVepZqkPreO4hKg
```

The config is in:

```text
backend/data/portfolio.json
```

If this is only the Apps Script editor/script ID, the app can open the script editor but cannot sync yet. To enable sync, deploy the Apps Script as a web app, then add either `webAppUrl` or `deploymentId` inside `integrations.appsScript`.

For certificate sync, the Apps Script web app should return JSON like either:

```json
[
  {
    "issuer": "CISCO",
    "name": "Network Basics",
    "issueDate": "2025-04",
    "credentialUrl": "https://..."
  }
]
```

or:

```json
{
  "certifications": [
    {
      "issuer": "CISCO",
      "name": "Network Basics",
      "issueDate": "2025-04",
      "credentialUrl": "https://..."
    }
  ]
}
```
