import fs from 'fs';
import path from 'path';
import parseTSV from '../utils/parseTSV';
import { Taxonomy } from '../types/webhook';

const IAB_TAXONOMY_FILE = path.join('../../assets/iab_content_taxonomy.tsv');

export function getTaxonomy(): Taxonomy[] {
	const filePath = path.join(__dirname, IAB_TAXONOMY_FILE);
	const tsv = fs.readFileSync(filePath, 'utf8');

	const taxonomyValues = [
		{
			id: 'iab_3_1',
			name: 'IAB 3.1 Content Taxonomy',
			values: parseTSV(tsv),
		},
	];

	return taxonomyValues;
}
