import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface FilterState {
    year: string | null;
    success: boolean | null;
    upcoming: boolean | null;
    search: string;
    rocket: string | null;
    launchpad: string | null;
    dateRange: 'last30' | 'lastYear' | 'all' | null;
    sort: 'dateDesc' | 'dateAsc' | 'nameAsc';
    setYear: (year: string | null) => void;
    setSuccess: (success: boolean | null) => void;
    setUpcoming: (upcoming: boolean | null) => void;
    setSearch: (search: string) => void;
    setRocket: (rocket: string | null) => void;
    setLaunchpad: (launchpad: string | null) => void;
    setDateRange: (dateRange: 'last30' | 'lastYear' | 'all' | null) => void;
    setSort: (sort: 'dateDesc' | 'dateAsc' | 'nameAsc') => void;
    resetFilters: () => void;
}

interface BookmarkState {
    bookmarkedLaunchIds: string[];
    toggleBookmark: (id: string) => void;
    isBookmarked: (id: string) => boolean;
}

export const useFilterStore = create<FilterState>((set) => ({
    year: null,
    success: null,
    upcoming: null,
    search: '',
    rocket: null,
    launchpad: null,
    dateRange: null,
    sort: 'dateDesc',
    setYear: (year) => set({ year }),
    setSuccess: (success) => set({ success }),
    setUpcoming: (upcoming) => set({ upcoming }),
    setSearch: (search) => set({ search }),
    setRocket: (rocket) => set({ rocket }),
    setLaunchpad: (launchpad) => set({ launchpad }),
    setDateRange: (dateRange) => set({ dateRange }),
    setSort: (sort) => set({ sort }),
    resetFilters: () => set({
        year: null,
        success: null,
        upcoming: null,
        search: '',
        rocket: null,
        launchpad: null,
        dateRange: null,
        sort: 'dateDesc'
    }),
}));

interface SyncState {
    lastSyncTime: number | null;
    isOffline: boolean;
    setLastSyncTime: (time: number) => void;
    setIsOffline: (status: boolean) => void;
}

export const useSyncStore = create<SyncState>((set) => ({
    lastSyncTime: null,
    isOffline: false,
    setLastSyncTime: (time) => set({ lastSyncTime: time }),
    setIsOffline: (status) => set({ isOffline: status }),
}));

export const useBookmarkStore = create<BookmarkState>()(
    persist(
        (set, get) => ({
            bookmarkedLaunchIds: [],
            toggleBookmark: (id) => {
                const { bookmarkedLaunchIds } = get();
                if (bookmarkedLaunchIds.includes(id)) {
                    set({ bookmarkedLaunchIds: bookmarkedLaunchIds.filter((bid) => bid !== id) });
                } else {
                    set({ bookmarkedLaunchIds: [...bookmarkedLaunchIds, id] });
                }
            },
            isBookmarked: (id) => get().bookmarkedLaunchIds.includes(id),
        }),
        {
            name: 'tripare-bookmarks',
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);
