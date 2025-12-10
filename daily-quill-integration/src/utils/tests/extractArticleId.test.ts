import extractArticleId from '../extractArticleId';

describe('extractArticleId', () => {
	it('extracts the article ID from a valid URL', () => {
		const url = 'https://site.com/article/something-12345/';
		expect(extractArticleId(url)).toBe('12345');
	});

	it('extracts even without trailing slash', () => {
		const url = 'https://site.com/article/page-999';
		expect(extractArticleId(url)).toBe('999');
	});

	it('throws on invalid URLs', () => {
		expect(() => extractArticleId('https://site.com/no-id-here')).toThrow(
			'Invalid URL format'
		);
	});
});
