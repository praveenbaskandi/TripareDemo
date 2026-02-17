export interface Launch {
    id: string;
    name: string;
    date_utc: string;
    date_unix: number;
    success: boolean | null;
    rocket: string;
    launchpad: string;
    details: string | null;
    upcoming: boolean;
    links: {
        patch: {
            small: string | null;
            large: string | null;
        };
        webcast: string | null;
        article: string | null;
        wikipedia: string | null;
    };
    flight_number: number;
}

export interface Launchpad {
    id: string;
    name: string;
    full_name: string;
    locality: string;
    region: string;
    latitude: number;
    longitude: number;
    status: string;
    launch_attempts: number;
    launch_successes: number;
    details: string | null;
}

export interface SyncStatus {
    lastSyncedAt: number | null;
    status: 'idle' | 'syncing' | 'error' | 'success';
}
