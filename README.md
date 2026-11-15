# ABC Tap

A first letters and numbers game for three-year-olds. One big **Next** button steps through the cards; each card is spoken aloud.

- **ABC**: A to Z, upper and lower case, a picture and a word ("A is for Apple")
- **123**: 1 to 20, with that many things to count ("Three fish"). Past 10, the things sit as a row of ten plus the rest
- **In order** to teach, **Mix up** to revise
- Tap the card to hear it again, ◀ to go back, or any tile in the strip at the bottom to jump there. The strip shows what has been seen
- Laptop: `Space`, `Enter` or `→` for next, `←` for back
- The voice is the device's own text-to-speech (🔊 turns it off). The place is saved on the device, so a refresh does not lose it
- Installable as a home-screen app (PWA) and works offline after the first load

## Run it

No build step. It is `index.html`, a manifest, a service worker, two icons and the fonts (Andika and Baloo 2, SIL Open Font License) in `fonts/`. Nothing is loaded from another site.

```sh
npx serve .          # or: python3 -m http.server 8080
```

Open the printed URL. (Opening `index.html` directly from Finder works for play, but the service worker needs http.)

## Play it on your phone

Host it on GitHub Pages, then "Add to Home Screen".

1. Create a repo on GitHub and push this folder:
   ```sh
   git init -b main
   git add .
   git commit -m "ABC Tap: alphabet and numbers game"
   git remote add origin git@github.com:<you>/abc-tap.git
   git push -u origin main
   ```
2. On GitHub: Settings → Pages → Source: "Deploy from a branch", Branch: `main` / `/ (root)`. Wait a minute.
3. Open `https://<you>.github.io/abc-tap/` on the phone.
4. iPhone: Share → Add to Home Screen. Android: menu → Install app / Add to Home screen.

After that it opens full-screen like an app and keeps working with no signal.

## Changing it

- The cards are two lists near the top of the script in `index.html`: `ABC` (letter, picture, word) and `NUM` (digit, thing to count, number word, spoken name).
- After any change, bump `CACHE` in `sw.js` (`abc-tap-v1` → `abc-tap-v2`) so installed copies update.
