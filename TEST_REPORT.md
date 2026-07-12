# Test Report

Date: 2026-07-12

## What was actually checked in this cloud environment

- Static serving: `index.html`, `styles.css`, `app.js`, and a sample SVG were served successfully with `python3 -m http.server` and fetched over HTTP.
- JavaScript syntax: `node --check app.js` completed successfully.
- Three style sample outputs were generated and stored in `samples/`.
- A4 print layout was reviewed in code: print CSS sets `@page` to A4 landscape and the certificate to `297mm × 210mm`.
- PNG export implementation was reviewed in code: it serializes the certificate and CSS to SVG, draws it to a `3508 × 2480` canvas, and downloads a PNG.
- PDF export implementation was reviewed in code: it opens a print-focused A4 landscape document and invokes browser printing so the seller can save as PDF.
- Responsive/mobile behavior was reviewed in CSS: the layout switches to one column below `850px`.

## Test cases covered by implementation review and sample data

- Very short child name: `Jo` is supported by the live text renderer.
- Very long child name: names over 34 characters receive the smallest name class and can wrap with `overflow-wrap:anywhere`.
- Missing optional fields: age and message are omitted when blank; date falls back to a date label on the certificate.
- Long achievement text: achievement text uses wrapping and a constrained width in the certificate body.
- Switching between designs: the style radio buttons re-render the certificate with Brave Explorer, Magical Hero, or Colorful Celebration classes.

## Limitations

A graphical desktop browser was not available in this container, so native browser download behavior, canvas rendering output, print dialog interaction, and mobile screenshots could not be visually exercised here. The relevant browser-side code paths are implemented for a modern desktop browser and should be smoke-tested manually after opening the static site locally.
