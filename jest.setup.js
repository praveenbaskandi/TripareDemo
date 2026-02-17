/* eslint-disable no-undef */
import 'react-native-gesture-handler/jestSetup';

// Mock expo package to avoid runtime reference errors
jest.mock('expo', () => ({
    registerRootComponent: jest.fn(),
    requireNativeModule: jest.fn(),
}));

jest.mock('expo-sqlite', () => ({
    openDatabaseAsync: jest.fn(() => Promise.resolve({
        execAsync: jest.fn(),
        runAsync: jest.fn(),
        getAllAsync: jest.fn(),
        getFirstAsync: jest.fn(),
        withTransactionAsync: jest.fn((cb) => cb()),
    })),
}));

jest.mock('expo-secure-store', () => ({
    setItemAsync: jest.fn(),
    getItemAsync: jest.fn(),
    deleteItemAsync: jest.fn(),
}));

jest.mock('@react-native-async-storage/async-storage', () =>
    require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

jest.mock('@react-native-community/netinfo', () => ({
    addEventListener: jest.fn(() => jest.fn()),
    fetch: jest.fn(),
}));
