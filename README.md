# One Dollar Certificate

A small static browser tool for an Etsy seller to create personalized printable children's certificates. It has no login, backend, database, tracking, paid services, or Etsy integration.

## Features

- Live A4 landscape certificate preview.
- Required personalization: child's name, achievement/reason, certificate style.
- Optional personalization: age, short message, date.
- Editable presented-by/signature line.
- Exactly three certificate styles: Brave Explorer, Magical Hero, and Colorful Celebration.
- Download a high-resolution PNG generated in the browser.
- Open an A4 landscape print dialog for saving/printing a PDF.
- Responsive editor layout for desktop and mobile-sized screens.

## Run locally

This is a static site. Open `index.html` directly in a modern browser, or serve the folder with any static file server:

```bash
python3 -m http.server 4173
```

Then visit <http://localhost:4173>.

## Deploy

Upload these files to any static host:

- `index.html`
- `styles.css`
- `app.js`
- `samples/` (optional examples)

No build step is required.

## Creating delivery files

1. Enter the order personalization details.
2. Choose one of the three styles.
3. Use **Download PNG** for a 3508×2480 px A4 landscape image.
4. Use **Download PDF** to open the browser print dialog, then choose **Save to PDF** with A4 landscape paper and no margins.
