# Janlyn Portfolio

This is the sorted frontend/backend version of the portfolio.

## Structure

- `frontend/` - portfolio UI (`index.html`, `styles.css`, `app.js`)
- `backend/` - local API server and JSON data store
- `backend/data/portfolio.json` - editable portfolio content
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
