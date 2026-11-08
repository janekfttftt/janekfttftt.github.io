# Janek's website

A small personal website built with plain HTML, CSS, and JavaScript and hosted on GitHub Pages.

## Files

| File | Purpose |
|---|---|
| `index.html` | Start page with the Warsaw clock, language selector, and photo. |
| `timer.html` | Timer page with a queue, presets, sound controls, history, and fullscreen mode. |
| `style.css` | Shared page and timer styling. |
| `i18n.js` | Polish and English text and the language selector. |
| `script.js` | Shared Warsaw clock and footer year. |
| `timer.js` | Timer queue, 1–10 second validation, presets, sounds, and history. |
| `fullscreen.js` | Fullscreen behavior used by the timer. |
| `assets/kensington.jpg` | Photo shown on the start page. |

## Run locally

Open `index.html` in a browser, or use Live Server in Visual Studio Code.

## Publish with GitHub Pages

Copy the complete folder contents to the published site repository and push them to the configured Pages branch. Keep the `assets` folder and all JavaScript files alongside the HTML files.

Timer durations can be set from 1 to 10 seconds. Presets also stay within that limit.