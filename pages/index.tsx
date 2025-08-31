import { GetStaticProps } from 'next';
import Layout from '@/components/Layout';
import ArticleCard from '@/components/ArticleCard';
import { getArticles, Article } from '@/lib/api';

interface HomeProps {
  articles: Article[];
}

export default function Home({ articles }: HomeProps) {
  return (
    <Layout title="Home - Divergence Blog">
      <div className="container">
        <div className="hero">
          <h1>Welcome to Divergence Blog</h1>
          <p>Discover amazing articles and insights</p>
        </div>

        <section className="articles-section">
          <h2>Latest Articles</h2>
          {articles && articles.length > 0 ? (
            <div className="articles-grid">
              {articles
                .filter((article) => article.title) // Filter out articles without title
                .map((article) => (
                  <ArticleCard key={article.id} article={article} />
                ))}
            </div>
          ) : (
            <div className="no-articles">
              <p>
                No articles found. Make sure your Strapi server is running and
                has some article content.
              </p>
              <p>
                Strapi should be running at: <code>http://localhost:1337</code>
              </p>
              <p>
                If Strapi is running, make sure you have created some articles
                in the admin panel.
              </p>
            </div>
          )}
        </section>
      </div>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const articlesData = await getArticles();
    const articles = articlesData?.data || [];

    return {
      props: {
        articles,
      },
      revalidate: 60, // Revalidate every 60 seconds
    };
  } catch (error) {
    console.error('Error fetching articles:', error);

    return {
      props: {
        articles: [],
      },
      revalidate: 60,
    };
  }
};
