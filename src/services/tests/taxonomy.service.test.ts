import fs from 'fs';
import { getTaxonomy } from '../taxonomy.service';

// Mock fs
jest.mock('fs');

describe('taxonomy.service', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('returns parsed taxonomy data', () => {
		const mockTSV = 'id\tname\n1\tAutomotive\n2\tSports';

		(fs.readFileSync as jest.Mock).mockReturnValue(mockTSV);

		const result = getTaxonomy();

		expect(result).toEqual([
			{
				id: 'iab_3_1',
				name: 'IAB 3.1 Content Taxonomy',
				values: [
					{ id: '1', name: 'Automotive' },
					{ id: '2', name: 'Sports' },
				],
			},
		]);
	});

	it('handles empty TSV files gracefully', () => {
		const mockTSV = 'id\tname\n';

		(fs.readFileSync as jest.Mock).mockReturnValue(mockTSV);

		const result = getTaxonomy();

		expect(result[0].values).toEqual([]);
	});

	it('throws an error if file reading fails', () => {
		(fs.readFileSync as jest.Mock).mockImplementation(() => {
			throw new Error('File not found');
		});

		expect(() => getTaxonomy()).toThrow('File not found');
	});

	it('passes the correct file path to fs.readFileSync', () => {
		const mockTSV = 'id\tname\n1\tAutomotive';
		(fs.readFileSync as jest.Mock).mockReturnValue(mockTSV);

		getTaxonomy();

		// We don't know the full absolute path, but we can match filename
		const callArg = (fs.readFileSync as jest.Mock).mock.calls[0][0];
		expect(callArg.endsWith('iab_content_taxonomy.tsv')).toBe(true);
	});
});
