# Home Workout Tracker

A local-first, iPhone-focused strength and cardio tracker built as a dependency-free Progressive Web App. GitHub Pages serves the app; the iPhone browser stores the training data.

## Architecture

- **IndexedDB is V1's source of truth.** It holds exercises, templates, workout sessions, exercise sets, cardio sessions, and body metrics.
- **localStorage holds only recoverable UI state:** the active session ID, current exercise/set, and timestamp-backed rest timer snapshot.
- **Timers calculate from timestamps**, so locking the screen or Safari suspension does not add or lose time.
- **The service worker caches application assets only.** It never caches exports or user records.
- **No credentials or backend are required.** GitHub Pages never receives workout data.

The IndexedDB schema is at version 2. `workoutSessions` is indexed by start time, date, and template; `exerciseSets`, pauses, and pain reports are indexed by session; cardio and metrics are indexed by their date/timestamp. Future schema changes belong in `js/db.js` migrations, never in destructive browser-side resets.

## Data model

`Workout Session` stores an ID, start-date, start/end timestamps, template reference, duration, notes, completion status, warm-up status, and skipped items. A session that crosses midnight retains its start date.

`Exercise` is a stable catalog item with defaults for reps, sets, rest, equipment, notes, muscle groups, and variants. `Exercise Set` records its own ID, session/exercise IDs, set number, start/end times, duration, reps, load/unit, variant, self-set/suggested source, notes, and configured rest duration. Workout records also retain warm-up/cooldown entries, pauses, and pain observations. `Cardio Session` stores start/end timestamps, distance/unit, and notes. `Body Metric` is ready for a later UI.

## Use

Open `index.html` with a local static server for development. Modern browsers restrict service workers and IndexedDB behavior on `file://` URLs.

```sh
npx serve .
```

Start **Re-entry full body**, complete the simple warm-up items, and use Start Set / Finish Set for strength work. A set writes to IndexedDB before its rest countdown begins. Reopening an incomplete workout asks whether to resume it; declining ends it as incomplete while retaining completed sets.

Templates are defined in `data/templates.js`; the shared exercise catalog is in `data/exercises.js`. Add future Monday/Wednesday/Friday templates by composing the same stable exercise IDs.

## Backup and restore

From **Data**, export a versioned full JSON backup before moving browsers/devices. It contains every database store and can reconstruct local history. Restore validates the declared format, version, collections, and essential fields *before* it asks for confirmation. Restore then replaces the local database, so export first—there is no silent overwrite or automatic merge in V1.

Export CSV from the same screen for set analysis in Excel or Python. It includes workout date/name, exercise, set number, reps, load, assistance, set duration, and rest duration.

## PWA and GitHub Pages

`manifest.webmanifest`, iPhone meta tags, icons, and `service-worker.js` make the site installable through Safari’s **Add to Home Screen**. All asset URLs are relative (`./`), so it works at `/marcd35-home-workout-tracker/` rather than assuming the domain root.

The included GitHub Actions workflow deploys the default branch to GitHub Pages. In the repository’s **Settings → Pages**, select **GitHub Actions** as the source once. The workflow’s deployment URL is set from GitHub’s Pages environment, so no repository-specific URL is embedded.

## Development and checks

```sh
npm run check
npm test
```

The automated checks validate JavaScript syntax, timestamp-based timer recovery behavior, backup rejection, and CSV quoting. Before a release, use a local browser to run the smoke checklist in `tests/manual-checklist.md`, including IndexedDB write/retrieval, reload recovery, timer recovery, export/restore, and subpath hosting.

## Known limitations

- Data is durable in the selected browser/profile but **does not automatically sync between devices**.
- Browser storage can still be cleared manually or by device policy; JSON backups are the recovery mechanism.
- The supplied SVG icons are functional placeholders; replace them with PNG artwork if desired for the final Home Screen presentation.
- Body-metrics entry and progression analytics are planned extensions, not V1 UI features.
