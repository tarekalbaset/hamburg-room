# Tarek Saleh — Housing Portfolio

A static, single-page site built to help find a long-term room/WG in Hamburg.
Pure HTML5 / CSS3 / vanilla JavaScript — no build step, ready for GitHub Pages.

## Structure

```
/
├── index.html
├── style.css
├── script.js
├── README.md
└── assets/
    ├── images/       → your photos (hero portrait, gallery, about)
    ├── icons/         → favicon.svg
    └── documents/     → downloadable PDFs (placeholders included)
```

## Replace before publishing

- `assets/images/` — swap in higher-res versions of your own photos if you like.
  Filenames referenced in `index.html`: `headshot-02.png` (hero), `photo-01.jpg`
  through `photo-06.jpg` (gallery), `photo-04.jpg` (about section).
- `assets/documents/` — the six PDFs here are **placeholders**. Replace
  `admission-letter.pdf`, `enrollment-proof.pdf`, `blocked-account.pdf`,
  `portfolio.pdf` with your real files. **Do not upload real copies of your
  passport or visa to a public repo** — the passport/visa cards are left as
  placeholders on purpose; share those privately instead.
- Contact details, budget, and move-in date live directly in `index.html`
  (search for the `<section id="contact">` and `<section id="hero">` blocks).
- `og:url` and `og:image` in the `<head>` of `index.html` should be updated
  once you know your GitHub Pages URL.

## Publish to GitHub Pages

1. Push this folder to a new GitHub repository.
2. In the repo settings, go to **Pages** → set the source branch to `main`
   (root folder).
3. Your site will be live at `https://YOUR-USERNAME.github.io/YOUR-REPO/`.

## Notes

- All animations respect `prefers-reduced-motion`.
- The gallery lightbox and FAQ accordion are keyboard accessible (Tab, Enter,
  Escape, Arrow keys).
- No external JS libraries — only Google Fonts (Fraunces + Inter) are loaded
  from a CDN.
