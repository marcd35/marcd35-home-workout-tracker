# Local-first persistence for version 1

Version 1 stores training records in IndexedDB on the iPhone and uses GitHub Pages only to serve the application. This keeps user data durable without embedding credentials in a static client, while deferring automatic cross-device synchronization until an authenticated backend is introduced.
