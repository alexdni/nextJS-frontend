import { GetStaticProps } from 'next';
import Layout from '@/components/Layout';
import { getAuthors, Author } from '@/lib/api';

interface AuthorsProps {
  authors: Author[];
}

export default function Authors({ authors }: AuthorsProps) {
  return (
    <Layout title="Authors - Divergence Blog">
      <div className="container">
        <h1>Authors</h1>

        {authors && authors.length > 0 ? (
          <div className="authors-grid">
            {authors.map((author) => (
              <div key={author.id} className="author-card">
                <h3>{author.name || 'Unknown Author'}</h3>
                <p>{author.email || 'No email available'}</p>
                <p className="author-joined">
                  Joined:{' '}
                  {author.createdAt
                    ? new Date(author.createdAt).toLocaleDateString('en-US')
                    : 'Unknown'}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-content">
            <p>
              No authors found. Make sure your Strapi server is running and has
              author content.
            </p>
            <p>
              Strapi should be running at: <code>http://localhost:1337</code>
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const authorsData = await getAuthors();
    const authors = authorsData?.data || [];

    return {
      props: {
        authors,
      },
      revalidate: 60,
    };
  } catch (error) {
    console.error('Error fetching authors:', error);

    return {
      props: {
        authors: [],
      },
      revalidate: 60,
    };
  }
};
