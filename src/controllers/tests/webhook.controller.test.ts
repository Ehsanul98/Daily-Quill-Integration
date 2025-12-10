import { handleWebhook } from '../webhook.controller';
import * as taxonomyService from '../../services/taxonomy.service';
import * as classifyService from '../../services/classify.service';

describe('webhook.controller', () => {
	const mockRes = () => {
		const res: any = {};
		res.json = jest.fn().mockReturnValue(res);
		res.status = jest.fn().mockReturnValue(res);
		return res;
	};

	it("returns taxonomy when type is 'taxonomies'", async () => {
		jest
			.spyOn(taxonomyService, 'getTaxonomy')
			.mockReturnValue([{ id: 'x' }] as any);

		const req: any = { body: { type: 'taxonomies' } };
		const res = mockRes();

		await handleWebhook(req, res);

		expect(res.json).toHaveBeenCalledWith([{ id: 'x' }]);
	});

	it("returns classifications when type is 'classify'", async () => {
		jest
			.spyOn(classifyService, 'getClassifications')
			.mockResolvedValue([{ id: 1 }] as any);

		const req: any = { body: { type: 'classify', url: 'https://x-123' } };
		const res = mockRes();

		await handleWebhook(req, res);

		expect(res.json).toHaveBeenCalledWith({ classifications: [{ id: 1 }] });
	});

	it('returns 400 on invalid type', async () => {
		const req: any = { body: { type: 'unknown' } };
		const res = mockRes();

		await handleWebhook(req, res);

		expect(res.status).toHaveBeenCalledWith(400);
	});
});
