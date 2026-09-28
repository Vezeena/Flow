# Flow

A flood-preparedness mobile app.

The project is a monorepo with two workspaces:

- `app/`: React Native (Expo) mobile app.
- `server/`: Node.js backend which polls the UK government's environment agency flooding API,
  matches alerts to registered devices, and sends alert push notifications.

## Prerequisites

- Node.js (v22 or later)
- npm
- Android SDK
- Java 17 JDK
- Android device or emulator (Android 13 or later)

## Setup

All commands should Install all dependencies:

```sh
npm install
```

### Running the server

1. (Optional) Create a `.env` file in `server/` (a template can be found in
   [`server/.env.example`](server/.env.example)) to configure the server.

   For testing purposes, the server is able to use mock data from a file
   ([`server/mock-data.json`](server/mock-data.json) by default). To use mock data, set
   `MOCK_DATA=true` in `server/.env`.

2. Start the server with:

   ```sh
   npm run start:server
   ```

3. Other available commands for interacting with the server are:

   ```sh
   npm run restart:server # Restarts the server
   npm run stop:server # Stops the server
   npm run logs:server # Follows server logs
   ```

### Running the app

1. Create a `.env` file in `app/` (a template can be found in
   [`app/.env.example`](app/.env.example)) to configure the app. The server URL is mandatory:

   ```properties
   EXPO_PUBLIC_SERVER_URL=http://your-server-address/
   ```

   For local development on the same network, use your machine's local address (e.g.
   `http://192.168.x.x:3000/`). For a production build, use a publicly reachable address.

2. Start the development build on a connected Android device or emulator:

   ```sh
   npm run android:app
   ```
