import { Request, Response } from 'express';
import { getTaxonomy } from '../services/taxonomy.service';
import { getClassifications } from '../services/classify.service';

export async function handleWebhook(req: Request, res: Response) {
	const { type, url } = req.body;

	try {
		if (type === 'taxonomies') return res.json(getTaxonomy());
		if (type === 'classify')
			return res.json({ classifications: await getClassifications(url) });

		res.status(400).json({ error: 'Unknown request type' });
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: 'Internal server error' });
	}
}
