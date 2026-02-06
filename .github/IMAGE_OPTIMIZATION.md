# Bildoptimierung & Performance

Dieses Dokument ergänzt die Copilot-Anweisungen und beschreibt die festgelegten Schritte zur konsistenten Bildbehandlung.

## Ziel

Sicherstellen, dass alle Bilder optimiert, modern formatiert (webp/avif), und durch automatisierte Schritte geprüft werden, um LCP/Performance zu verbessern.

## Lokal: Bilder konvertieren

- Lokales Skript: `npm run images:optimize` konvertiert `.jpg/.jpeg/.png` in `.webp` (quality 80).
- Speichere die generierten `.webp` Dateien in `public/images`.

## Komponenten

- Verwende `OptimizedImage` (Wrapper) oder `next/image` für alle sichtbaren Bilder.
- Kennzeichne genau 1 LCP-Bild mit `priority` (z. B. Hero-Logo), alle anderen lazy-loaden.
- Für responsive/cover-Bilder nutze `fill` + `object-fit` / `object-position`.

## Embeds

- Lade iframes nur on-demand (erst nachdem Nutzer Dialog öffnet) und nutze ein Vorschaubild als Platzhalter.

## CI

- Empfohlen: GitHub Action prüft `public/images` und führt `npm run images:optimize` aus bei Änderungen.
- Optional: committe die erzeugten `.webp` Dateien oder speichere sie als Artefakt.

## PR-Checklist

- [ ] WebP-Dateien erzeugt?
- [ ] `OptimizedImage`/`next/image` verwendet?
- [ ] LCP-Bild als `priority` gesetzt (nur 1)?
- [ ] Lighthouse-Check in PR-Description angehängt?

Bei Fragen oder Abweichungen zuerst Rücksprache halten.
