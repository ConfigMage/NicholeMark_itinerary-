# Nichole & Mark's East Coast Honeymoon

A mobile first web app for the October 22 to 31, 2026 trip to Philadelphia and Washington, D.C.

- **Home**: countdown before the trip, "today" card during it, plus the trip at a glance
- **Day by Day**: one day at a time; swipe or tap the date strip. Opens on today during the trip
- **Full Trip**: every day, start to finish
- **Travel**: flights, train, seats and hotel

Every place has a **Map** link that opens Google Maps. The site also works offline once it has been opened, and can be added to a phone's home screen (Share, then Add to Home Screen on iPhone).

## Editing the plan

Everything lives in [`js/data.js`](js/data.js). Change a restaurant, add an item, or fix a seat there and redeploy. After an edit, bump `VERSION` in [`sw.js`](sw.js) so phones that already saved the app pick up the change.

To preview the site as if it were a certain date, add `?today=2026-10-25` to the URL.

## Run locally

No build step. Serve the folder with any static server:

```sh
npx serve .
```

## Deploy to Vercel

1. In Vercel, choose **Add New → Project** and import this GitHub repo.
2. Framework preset: **Other**. Leave build command and output directory empty.
3. Deploy. Every push to the main branch redeploys automatically.
