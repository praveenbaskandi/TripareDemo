# Architecture Overview

## System Design
The Tripare SpaceX Mission Control app is designed as an **offline-first** mobile application. It leverages a local SQLite database to persist data, ensuring functionality even without network connectivity.

### Core Components
1.  **UI Layer**: Built with React Native and Expo. Uses `FlashList` for high-performance rendering of large lists.
2.  **State Management**:
    *   **Global UI State**: Managed by `Zustand` (e.g., theme, user preferences, active filters).
    *   **Server State**: Managed by `TanStack Query` (React Query). Handles data fetching, caching, and synchronization.
3.  **Data Layer**:
    *   **Local DB**: `expo-sqlite`. Stores launches, launchpads, and related entities.
    *   **API Service**: Fetches data from SpaceX API (v4/v5).
    *   **Repository Pattern**: Abstracts data access. The UI requests data from the Repository, which decides whether to serve from the local DB or fetch from the API (and update DB).
4.  **Navigation**: `expo-router` for file-based routing.

## Data Flow
1.  **Read**: UI -> React Query Hook -> Repository -> Local SQLite DB (Result)
    *   *Background*: React Query triggers a background fetch to the API -> Repository updates SQLite DB -> UI updates automatically (via query invalidation or subscription).
2.  **Write/Action** (e.g., Bookmark): UI -> Action Handler -> Repository -> Update SQLite DB -> Optimistic UI Update.

## Offline Strategy
-   **Initial Load**: App checks for local data. If empty, performs an initial sync.
-   **Subsequent Loads**: Always displays local data first. Background sync updates data if network is available.
-   **Sync Indicator**: UI shows "Last synced at X" or "Offline mode".

## Tech Stack
-   **Framework**: React Native (Expo)
-   **Language**: TypeScript
-   **Navigation**: Expo Router
-   **State**: Zustand + TanStack Query
-   **Database**: Expo SQLite
-   **Maps**: React Native Maps
-   **Styling**: StyleSheet / Standard React Native
