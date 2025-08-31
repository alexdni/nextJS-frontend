import Link from 'next/link';
import Image from 'next/image';
import { Article } from '@/lib/api';

interface ArticleCardProps {
  article: Article;
}

const ArticleCard = ({ article }: ArticleCardProps) => {
  // Handle cases where article might be incomplete
  if (!article || !article.title) {
    return (
      <article className="article-card">
        <div className="article-content">
          <h2 className="article-title">Article data unavailable</h2>
          <p className="article-description">
            This article's data could not be loaded.
          </p>
        </div>
      </article>
    );
  }

  const imageUrl = article.cover?.url
    ? `http://localhost:1337${article.cover.url}`
    : '/default-image.png';

  return (
    <article className="article-card">
      <Link href={`/articles/${article.slug || 'unknown'}`}>
        <div className="article-image">
          <Image
            src={imageUrl}
            alt={
              article.cover?.alternativeText || article.title || 'Article image'
            }
            width={400}
            height={250}
            style={{ objectFit: 'cover' }}
          />
        </div>
        <div className="article-content">
          <h2 className="article-title">
            {article.title || 'Untitled Article'}
          </h2>
          <p className="article-description">
            {article.description || 'No description available'}
          </p>
          <div className="article-meta">
            {article.author && (
              <span className="article-author">By {article.author.name}</span>
            )}
            {article.category && (
              <span className="article-category">
                in {article.category.name}
              </span>
            )}
            <span className="article-date">
              {article.publishedAt
                ? new Date(article.publishedAt).toLocaleDateString('en-US')
                : 'No date'}
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
};

export default ArticleCard;
