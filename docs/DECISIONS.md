# Technical Decisions

## State Management: Zustand + TanStack Query
-   **Decision**: Split state into "App State" (Zustand) and "Server State" (TanStack Query).
-   **Rationale**:
    -   SpaceX data is essentially a cache of a remote server. React Query is purpose-built for this (caching, deduping, background updates).
    -   Zustand is lightweight and perfect for client-only state like "isDarkMode", "filterSettings".
    -   Redux Toolkit was considered but deemed overkill for the complexity level, given React Query handles the heavy lifting of data sync.

## Database: Expo SQLite
-   **Decision**: Use `expo-sqlite` generally.
-   **Rationale**:
    -   We need structured queries for filtering (e.g., "launches where year = 2023 AND status = success").
    -   Key-value stores (AsyncStorage) are inefficient for complex filtering of 1000+ items.
    -   WatermelonDB is powerful but adds significant boilerplate. SQLite offers a good balance of performance and standard SQL capability.

## List Performance: FlashList
-   **Decision**: Use `@shopify/flash-list`.
-   **Rationale**:
    -   Requirement to scroll 1000+ items at 60fps on mobile.
    -   FlashList recycles views much more efficiently than standard FlatList, reducing memory usage and frame drops.

## Maps: React Native Maps
-   **Decision**: `react-native-maps`.
-   **Rationale**:
    -   Production standard for maps in RN.
    -   Supports custom markers and clustering (vital for the "All Launchpads" view).
