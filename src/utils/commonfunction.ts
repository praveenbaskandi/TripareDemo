import { format } from "date-fns";

export const formatLaunchDate = (dateUnix: number) => {
    return format(dateUnix * 1000, "EEEE, d MMMM yyyy, h:mm a");
};

export const formatLaunchItemDate = (dateUnix: number) => {
    return format(dateUnix * 1000, "MMM d, yyyy • h:mm a");
};

export const formatLaunchHeaderDate = (date: Date) => {
    return format(date, "MMMM yyyy");
};
