import parseTSV from '../parseTSV';

describe('parseTSV', () => {
	it('parses valid TSV correctly', () => {
		const tsv = 'id\tname\n1\tAutomotive\n2\tSports';
		const result = parseTSV(tsv);

		expect(result).toEqual([
			{ id: '1', name: 'Automotive' },
			{ id: '2', name: 'Sports' },
		]);
	});

	it('ignores empty lines', () => {
		const tsv = 'id\tname\n1\tAutomotive\n\n2\tSports\n';
		const result = parseTSV(tsv);

		expect(result.length).toBe(2);
	});
});
