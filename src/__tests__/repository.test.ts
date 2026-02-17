import { openDatabase } from '../data/database';
import { LaunchRepository } from '../data/repository';
import { api } from '../services/api';

// Mock dependencies
jest.mock('../services/api');
jest.mock('../data/database');

describe('LaunchRepository', () => {
    it('should sync launches successfully', async () => {
        // Setup mocks
        const mockLaunches = [{ id: '1', name: 'Falcon 1' }];
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
