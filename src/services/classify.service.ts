import { firestore } from './firestore.service';
import extractArticleId from '../utils/extractArticleId';
import { Classification } from '../types/webhook';

export async function getClassifications(
	url: string
): Promise<Classification[]> {
	const articleId = extractArticleId(url);

	const doc = await firestore
		.collection('tdc_article_categories')
		.doc(articleId)
		.get();

	if (!doc.exists) return [];

	const data = doc.data()!;
	return data.categories.map((id: string) => ({
		type: 'categories',
		value: String(id),
		taxonomy: 'iab_3_1',
	}));
}
