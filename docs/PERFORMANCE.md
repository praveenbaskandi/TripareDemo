# Performance Strategy

## Goals
-   **Time to Interactive**: < 3s (Cold start)
-   **Scroll FPS**: 60fps sustained on lists
-   **Memory**: < 150MB avg

## Implementations
1.  **Virtualized Lists**:
    -   Fixed height items where possible.
    -   `estimatedItemSize` in FlashList strictly defined.
    -   Memoized render items (`React.memo`) to prevent re-renders on scroll.
2.  **Image Optimization**:
    -   Use `expo-image` for aggressive caching and memory management.
    -   Downsample large images from API before rendering if possible (or use concise thumbnails).
3.  **Database Indexing**:
    -   Ensure SQLite columns used in WHERE clauses (launch_date, success, rocket_id) are indexed.
4.  **Bundle Splitting**:
    -   Lazy load the Map component since it's heavy.
    -   Ensure expensive utility libraries are tree-shakeable.
