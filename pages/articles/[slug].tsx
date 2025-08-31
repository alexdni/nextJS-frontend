import { GetServerSideProps } from 'next';
import Image from 'next/image';
import Layout from '@/components/Layout';
import { getArticles, getArticle, Article } from '@/lib/api';

interface ArticlePageProps {
  article: Article | null;
}

// Helper function to render article content from blocks
function renderBlocks(
  blocks?: Array<{
    __component: string;
    id: number;
    body?: string;
    title?: string;
  }>
) {
  if (!blocks || blocks.length === 0) {
    return '<p>No content available</p>';
  }

  return blocks
    .map((block) => {
      switch (block.__component) {
        case 'shared.rich-text':
          return block.body || '';
        case 'shared.quote':
          return `<blockquote><h4>${block.title || ''}</h4><p>${
            block.body || ''
          }</p></blockquote>`;
        default:
          return '';
      }
    })
    .join('\n\n');
}

export default function ArticlePage({ article }: ArticlePageProps) {
  if (!article || !article.title) {
    return (
      <Layout title="Article Not Found">
        <div className="container">
          <h1>Article Not Found</h1>
          <p>
            Sorry, the article you're looking for doesn't exist or couldn't be
            loaded.
          </p>
          <p>
            Make sure your Strapi server is running at:{' '}
            <code>http://localhost:1337</code>
          </p>
        </div>
      </Layout>
    );
  }

  const imageUrl = article.cover?.url
    ? `http://localhost:1337${article.cover.url}`
    : '/default-image.png';

  const content = renderBlocks(article.blocks);

  return (
    <Layout
      title={`${article.title || 'Article'} - Divergence Blog`}
      description={article.description || 'Article from Divergence Blog'}
    >
      <article className="article-page">
        <div className="container">
          <header className="article-header">
            <h1 className="article-title">
              {article.title || 'Untitled Article'}
            </h1>

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

            {article.description && (
              <p className="article-description">{article.description}</p>
            )}
          </header>

          {article.cover && (
            <div className="article-image">
              <Image
                src={imageUrl}
                alt={
                  article.cover.alternativeText ||
                  article.title ||
                  'Article image'
                }
                width={800}
                height={450}
                style={{ objectFit: 'cover' }}
              />
            </div>
          )}

          <div className="article-content">
            <div dangerouslySetInnerHTML={{ __html: content }} />
          </div>
        </div>
      </article>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  try {
    // Get all articles and find the one with matching slug
    const articlesData = await getArticles();
    const articles = articlesData?.data || [];

    // Find article by slug since filtering might not work as expected
    const article = articles.find((art: Article) => art.slug === params?.slug);

    if (!article) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        article,
      },
    };
  } catch (error) {
    console.error('Error fetching article:', error);
    return {
      notFound: true,
    };
  }
};
