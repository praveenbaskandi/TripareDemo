import { openDatabase } from '../data/database';
import { LaunchRepository } from '../data/repository';
import { api } from '../services/api';

// Mock dependencies
jest.mock('../services/api');
jest.mock('../data/database');

describe('LaunchRepository', () => {
    it('should sync launches successfully', async () => {
        // Setup mocks
        const mockLaunches = [{
            id: '1',
            name: 'Falcon 1',
            date_utc: '2006-03-24T22:30:00.000Z',
            date_unix: 1143239400,
            success: false,
            rocket: '5e9d0d95eda69955f709d1eb',
            launchpad: '5e9e4502f5090995de566f86',
            details: 'Engine failure at 33 seconds.',
            upcoming: false,
            links: {
                patch: {
                    small: 'https://images2.imgbox.com/3c/0e/T8iJcSN3_o.png',
                    large: 'https://images2.imgbox.com/40/e3/GypSkayF_o.png'
                },
                webcast: 'https://www.youtube.com/watch?v=0a_00nJ_Y88',
            },
            flight_number: 1
        }];
        (api.getLaunches as jest.Mock).mockResolvedValue(mockLaunches);

        const mockDb = {
            withTransactionAsync: jest.fn((cb) => cb()),
            runAsync: jest.fn(),
        };
        (openDatabase as jest.Mock).mockResolvedValue(mockDb);

        // Execute
        const result = await LaunchRepository.syncLaunches();

        // Create expectations
        expect(result.success).toBe(true);
        expect(api.getLaunches).toHaveBeenCalled();
        expect(mockDb.runAsync).toHaveBeenCalled();
    });
});
