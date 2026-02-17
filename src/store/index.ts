import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface FilterState {
    year: string | null;
    success: boolean | null;
    upcoming: boolean | null;
    search: string;
    setYear: (year: string | null) => void;
    setSuccess: (success: boolean | null) => void;
    setUpcoming: (upcoming: boolean | null) => void;
    setSearch: (search: string) => void;
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
    setYear: (year) => set({ year }),
    setSuccess: (success) => set({ success }),
    setUpcoming: (upcoming) => set({ upcoming }),
    setSearch: (search) => set({ search }),
    resetFilters: () => set({ year: null, success: null, upcoming: null, search: '' }),
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
