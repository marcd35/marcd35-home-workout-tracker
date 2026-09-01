# Browser smoke checklist

1. Load the app over localhost, start a workout, and confirm IndexedDB creates the six version-1 stores.
2. Finish a set; verify it is immediately present in `exerciseSets`, then reload and verify it appears in the workout/history.
3. Start a set and a rest timer, reload, and verify their elapsed/remaining times derive from their saved timestamps.
4. Begin a workout, reload, choose Resume, then repeat and choose Cancel; confirm the latter is retained as incomplete.
5. Export JSON; restore it into an empty browser profile. Confirm history, set detail, and template data reappear.
6. Attempt a malformed JSON restore and confirm no existing data changes.
7. Export CSV and confirm its headers and a quoted exercise value parse in a spreadsheet.
8. Serve the project below `/marcd35-home-workout-tracker/` and verify all styles, modules, manifest, and service worker load without console errors.
