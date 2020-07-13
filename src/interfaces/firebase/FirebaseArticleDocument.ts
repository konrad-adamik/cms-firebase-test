export interface Article {
	articleHeader: ArticleHeader;
	articleContent: ArticleContent;
}

export interface ArticleHeader {
	author: string;
	date: string;
	description: string;
	imageUrl: string;
	serie: number;
	title: string;
	turtles: number;
}

export interface ArticleContent {
	authorNote: string;
	contentBody: string;
	relatedArticles: Array<RelatedArticle>;
	relatedNote: string;
}

export interface RelatedArticle {
	id: string;
	title: string;
}
