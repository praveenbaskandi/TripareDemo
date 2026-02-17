# Tripare - SpaceX Mission Control

A production-grade mobile application for tracking SpaceX launches, built with React Native (Expo), TypeScript, and Offline-First architecture.

## 🚀 Quick Start

1.  **Install Dependencies**:
    ```bash
    npm install
    ```

2.  **Environment Setup**:
    ```bash
    cp .env.example .env
    ```

3.  **Run the App**:
    -   iOS: `npm run ios`
    -   Android: `npm run android`

## 🏗 Architecture

The app follows a robust **Offline-First** architecture pattern:

![Architecture](https://mermaid.ink/img/pako:eNpVkMtuwjAQRX_F8qpKVLpILyCqCqoS2qwqL2MncWrimYfdoiD_XidA2c147rnnjs2M0FojwTh-C7qGtaIObzuj4W1z2R8Pe5jO5-B9eDwctsfT4Xg6gu_hcrkdt8fL4Qj-5_l83B9P2-Pt8Xy-7I_H8-V02h5P-9v1_nC-nm6H0_F6upxP19PteDmdLtfT7XA6X06X8-l2PB9u59PtdDufTpfb-Xw6XU630vn2dL6dbrfL6XY5nS-n2_l0PZ0vt9PldLmdTpfb6XS5nU6X2-l0uZ1Ol9vpdLmdTpfb6XS5ni7X0-10uV1Ol9vpcrudLrdb6XS7nG6X0-1yul1Ot8vp9nS63U632+l2O91up9vtdLvdTrfb6Xa7nW630-12ut1Ot9vpdrudbrfT7Xa63U632-l2O91up9vtdD9dzrfT_Xa530632-l2O91u_wAbtqQp?type=png)
*(Note: Mermaid syntax simplified for README display)*

**Data Flow**:
1.  **UI Component** requests data via `useQuery`.
2.  **Repository** checks local `SQLite` database first settings.
3.  **Background Sync** fetches fresh data from SpaceX API.
4.  **Database** is updated, and UI reflects changes automatically via query invalidation.

### Key Technical Decisions

-   **State Management**:
    -   **Zustand**: For global app state (Filters, Bookmarks).
    -   **TanStack Query**: For server state management, caching, and background sync.
-   **Database**: **Expo SQLite** for structured, relational data persistence to enable complex filtering of launches.
-   **Performance**: **FlashList** used for rendering 1000+ launch items at 60fps by recycling views efficiently.
-   **Maps**: **React Native Maps** with `supercluster` for handling large numbers of launchpads without UI lag.

## 📱 Features

-   **Launch List**: High-performance list with sticky headers (Month/Year).
-   **Offline Mode**: Full functionality without network access after initial sync.
-   **Smart Filtering**: Search and filter by status, date, and more.
-   **Launch Details**: Comprehensive view including rocket info, mission status, and media links.
-   **Launchpad Map**: Interactive map with clustering to visualize launch sites globally.
-   **Bookmarks**: Save your favorite missions effectively.

## 🧪 Testing

Run unit tests with:
```bash
npm test
```

## ⚠️ Known Limitations & Trade-offs

-   **Testing**: Unit tests cover the Repository layer. UI tests (e2e) with Maestro or Detox would be the next step for a production app.
-   **Map Cloning**: Clustering logic could be moved to a web worker or native module for extreme scale (10k+ points), but JS thread is sufficient for <100 pads.
-   **API Key**: Android Maps require a Google Maps API Key in `app.json` or `AndroidManifest.xml` (not included for demo safety).

