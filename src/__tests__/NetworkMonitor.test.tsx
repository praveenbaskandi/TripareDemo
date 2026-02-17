import NetInfo from '@react-native-community/netinfo';
import { render } from '@testing-library/react-native';
import React from 'react';
import { NetworkMonitor } from '../components/NetworkMonitor';
import { LaunchRepository } from '../data/repository';
import { useSyncStore } from '../store';

jest.mock('@react-native-community/netinfo', () => ({
    addEventListener: jest.fn(),
    fetch: jest.fn(),
}));
jest.mock('@react-native-async-storage/async-storage', () =>
    require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);
jest.mock('expo-secure-store', () => ({
    setItemAsync: jest.fn(),
    getItemAsync: jest.fn(),
    deleteItemAsync: jest.fn(),
}));
jest.mock('expo-sqlite', () => ({
    openDatabaseAsync: jest.fn(),
}));
jest.mock('../data/repository');
jest.mock('../store');

describe('NetworkMonitor', () => {
    let mockSetIsOffline: jest.Mock;
    let mockSetLastSyncTime: jest.Mock;

    beforeEach(() => {
        mockSetIsOffline = jest.fn();
        mockSetLastSyncTime = jest.fn();

        (useSyncStore as unknown as jest.Mock).mockReturnValue({
            setIsOffline: mockSetIsOffline,
            setLastSyncTime: mockSetLastSyncTime,
        });

        (LaunchRepository.syncLaunches as jest.Mock).mockResolvedValue(undefined);
        (LaunchRepository.syncLaunchpads as jest.Mock).mockResolvedValue(undefined);
    });

    it('should handle offline state', () => {
        render(<NetworkMonitor />);

        // Simulate offline
        const callback = (NetInfo.addEventListener as jest.Mock).mock.calls[0][0];
        callback({ isConnected: false });

        expect(mockSetIsOffline).toHaveBeenCalledWith(true);
        expect(LaunchRepository.syncLaunches).not.toHaveBeenCalled();
    });

    it('should trigger sync when coming online', async () => {
        render(<NetworkMonitor />);

        // Simulate online
        const callback = (NetInfo.addEventListener as jest.Mock).mock.calls[0][0];
        await callback({ isConnected: true });

        expect(mockSetIsOffline).toHaveBeenCalledWith(false);
        expect(LaunchRepository.syncLaunches).toHaveBeenCalled();
        expect(LaunchRepository.syncLaunchpads).toHaveBeenCalled();
        // We can't easily await the internal promise chain inside useEffect, 
        // but we can verify the sync call was initiated.
    });
});
