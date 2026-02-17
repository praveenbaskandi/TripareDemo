import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { LaunchRepository } from '../data/repository';
import { useFilterStore } from '../store';

export function useLaunches() {
    const { year, success, upcoming, search } = useFilterStore();

    return useQuery({
        queryKey: ['launches', { year, success, upcoming, search }],
        queryFn: () => LaunchRepository.getLaunches(0, 1000, {
            year: year || undefined,
            success: success ?? undefined,
            upcoming: upcoming ?? undefined,
            search: search || undefined
        }),
    });
}

export function useSyncLaunches() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: LaunchRepository.syncLaunches,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['launches'] });
        },
    });
}

export function useLaunchpads() {
    return useQuery({
        queryKey: ['launchpads'],
        queryFn: LaunchRepository.getAllLaunchpads,
    });
}

export function useSyncLaunchpads() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: LaunchRepository.syncLaunchpads,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['launchpads'] });
        },
    });
}
