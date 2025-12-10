import * as firestoreService from '../firestore.service';
import { getClassifications } from '../classify.service';

jest.mock('../firestore.service');

describe('classify.service', () => {
	it('returns correctly formatted classifications', async () => {
		(firestoreService.firestore as any) = {
			collection: () => ({
				doc: () => ({
					get: async () => ({
						exists: true,
						data: () => ({
							categories: [65, 66],
						}),
					}),
				}),
			}),
		};

		const result = await getClassifications('https://site.com/x-123');

		expect(result).toEqual([
			{ type: 'categories', value: '65', taxonomy: 'iab_3_1' },
			{ type: 'categories', value: '66', taxonomy: 'iab_3_1' },
		]);
	});

	it('returns empty array if Firestore doc does not exist', async () => {
		(firestoreService.firestore as any) = {
			collection: () => ({
				doc: () => ({
					get: async () => ({ exists: false }),
				}),
			}),
		};

		const result = await getClassifications('https://site.com/x-123');

		expect(result).toEqual([]);
	});
});
