export default function extractArticleId(url: string): string {
	const match = url.match(/(\d+)\/?$/);
	if (!match) throw new Error('Invalid URL format');
	return match[1];
}
