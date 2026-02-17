import { z } from "zod";

export const LaunchSchema = z.object({
    id: z.string(),
    name: z.string(),
    date_utc: z.string(),
    date_unix: z.number(),
    success: z.boolean().nullable(),
    rocket: z.string(),
    launchpad: z.string(),
    details: z.string().nullable(),
    upcoming: z.boolean(),
    links: z.object({
        patch: z.object({
            small: z.string().nullable(),
            large: z.string().nullable(),
        }),
        webcast: z.string().nullable(),
        article: z.string().nullable().optional(), // API might omit this
        wikipedia: z.string().nullable().optional(), // API might omit this
    }),
    flight_number: z.number(),
});

export const LaunchpadSchema = z.object({
    id: z.string(),
    name: z.string(),
    full_name: z.string(),
    locality: z.string().nullable().optional(), // Observed nullable in some responses
    region: z.string(),
    latitude: z.number(),
    longitude: z.number(),
    status: z.string(),
    launch_attempts: z.number(),
    launch_successes: z.number(),
    details: z.string().nullable(),
});

export const LaunchListSchema = z.array(LaunchSchema);
export const LaunchpadListSchema = z.array(LaunchpadSchema);
