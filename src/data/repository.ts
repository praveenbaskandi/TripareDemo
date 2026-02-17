import { api } from '../services/api';
import { Launch, Launchpad } from '../types';
import { openDatabase } from './database';

export class LaunchRepository {
    static async syncLaunches() {
        const db = await openDatabase();
        try {
            const launches = await api.getLaunches();

            await db.withTransactionAsync(async () => {
                for (const launch of launches) {
                    await db.runAsync(
                        `INSERT OR REPLACE INTO launches (
              id, name, date_utc, date_unix, success, rocket_id, launchpad_id, details, upcoming, 
              links_patch_small, links_patch_large, links_webcast, flight_number
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
                        [
                            launch.id,
                            launch.name,
                            launch.date_utc,
                            launch.date_unix,
                            launch.success ? 1 : 0,
                            launch.rocket,
                            launch.launchpad,
                            launch.details,
                            launch.upcoming ? 1 : 0,
                            launch.links.patch.small,
                            launch.links.patch.large,
                            launch.links.webcast,
                            launch.flight_number
                        ]
                    );
                }
            });
            return { success: true };
        } catch (error) {
            console.error('Sync Launches Error:', error);
            throw error;
        }
    }

    static async syncLaunchpads() {
        const db = await openDatabase();
        try {
            const launchpads = await api.getLaunchpads();

            await db.withTransactionAsync(async () => {
                for (const pad of launchpads) {
                    await db.runAsync(
                        `INSERT OR REPLACE INTO launchpads (
              id, name, full_name, locality, region, latitude, longitude, status, details, launch_attempts, launch_successes
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
                        [
                            pad.id,
                            pad.name,
                            pad.full_name,
                            pad.locality,
                            pad.region,
                            pad.latitude,
                            pad.longitude,
                            pad.status,
                            pad.details,
                            pad.launch_attempts,
                            pad.launch_successes
                        ]
                    );
                }
            });
            return { success: true };
        } catch (error) {
            console.error('Sync Launchpads Error:', error);
            throw error;
        }
    }

    static async getLaunches(
        offset = 0,
        limit = 20,
        filters?: {
            year?: string;
            success?: boolean;
            upcoming?: boolean;
            search?: string;
            rocket?: string;
            launchpad?: string;
            dateRange?: 'last30' | 'lastYear' | 'all';
            sort?: 'dateDesc' | 'dateAsc' | 'nameAsc';
        }
    ): Promise<Launch[]> {
        const db = await openDatabase();

        let query = 'SELECT * FROM launches WHERE 1=1';
        const params: any[] = [];

        if (filters?.year) {
            query += ' AND date_utc LIKE ?';
            params.push(`${filters.year}%`);
        }
        if (filters?.success !== undefined) {
            query += ' AND success = ?';
            params.push(filters.success ? 1 : 0);
        }
        if (filters?.upcoming !== undefined) {
            query += ' AND upcoming = ?';
            params.push(filters.upcoming ? 1 : 0);
        }
        if (filters?.search) {
            query += ' AND name LIKE ?';
            params.push(`%${filters.search}%`);
        }
        if (filters?.rocket) {
            query += ' AND rocket_id = ?';
            params.push(filters.rocket);
        }
        if (filters?.launchpad) {
            query += ' AND launchpad_id = ?';
            params.push(filters.launchpad);
        }
        if (filters?.dateRange) {
            const now = Math.floor(Date.now() / 1000);
            if (filters.dateRange === 'last30') {
                const thirtyDaysAgo = now - 30 * 24 * 60 * 60;
                query += ' AND date_unix >= ?';
                params.push(thirtyDaysAgo);
            } else if (filters.dateRange === 'lastYear') {
                const oneYearAgo = now - 365 * 24 * 60 * 60;
                query += ' AND date_unix >= ?';
                params.push(oneYearAgo);
            }
        }

        let orderBy = 'ORDER BY date_unix DESC';
        if (filters?.sort === 'dateAsc') {
            orderBy = 'ORDER BY date_unix ASC';
        } else if (filters?.sort === 'nameAsc') {
            orderBy = 'ORDER BY name ASC';
        }

        query += ` ${orderBy} LIMIT ? OFFSET ?`;
        params.push(limit, offset);

        const result = await db.getAllAsync(query, params);

        // Map back to Launch interface
        return result.map((row: any) => ({
            id: row.id,
            name: row.name,
            date_utc: row.date_utc,
            date_unix: row.date_unix,
            details: row.details,
            flight_number: row.flight_number,
            success: row.success === 1,
            upcoming: row.upcoming === 1,
            rocket: row.rocket_id,
            launchpad: row.launchpad_id,
            links: {
                patch: {
                    small: row.links_patch_small,
                    large: row.links_patch_large
                },
                webcast: row.links_webcast,
                article: null, // Not persisted in simplified schema
                wikipedia: null
            }
        })) as Launch[];
    }

    static async getAllLaunchpads(): Promise<Launchpad[]> {
        const db = await openDatabase();
        const result = await db.getAllAsync('SELECT * FROM launchpads');
        return result as Launchpad[];
    }

    static async getLaunchpadById(id: string): Promise<Launchpad | null> {
        const db = await openDatabase();
        const result = await db.getFirstAsync('SELECT * FROM launchpads WHERE id = ?', [id]);
        return result as Launchpad | null;
    }
}
