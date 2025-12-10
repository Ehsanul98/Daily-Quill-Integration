export default function extractArticleId(url: string): string {
	const segments = url.split('/').filter(Boolean);
	const lastSegment = segments[segments.length - 1];

	const parts = lastSegment.split('-');
	const lastPart = parts[parts.length - 1];

	if (!/^\d+$/.test(lastPart)) {
		throw new Error(
			`Invalid URL: expected numeric article ID at end of "${url}"`
		);
	}

	return lastPart;
}
