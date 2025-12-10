import { TaxonomyValue } from '../types/webhook';

export default function parseTSV(tsv: string): TaxonomyValue[] {
	const lines = tsv.trim().split('\n').slice(1);

	return lines
		.filter((line) => line.trim())
		.map((line) => {
			const parts = line.split('\t');
			if (parts.length < 2) {
				throw new Error(`Invalid TSV line: ${line}`);
			}
			return { id: parts[0], name: parts[1] };
		});
}
