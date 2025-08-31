import { GetStaticProps } from 'next';
import Layout from '@/components/Layout';
import { getCategories, Category } from '@/lib/api';

interface CategoriesProps {
  categories: Category[];
}

export default function Categories({ categories }: CategoriesProps) {
  return (
    <Layout title="Categories - Divergence Blog">
      <div className="container">
        <h1>Categories</h1>

        {categories && categories.length > 0 ? (
          <div className="categories-grid">
            {categories.map((category) => (
              <div key={category.id} className="category-card">
                <h3>{category.name || 'Unknown Category'}</h3>
                <p className="category-created">
                  Created:{' '}
                  {category.createdAt
                    ? new Date(category.createdAt).toLocaleDateString('en-US')
                    : 'Unknown'}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-content">
            <p>
              No categories found. Make sure your Strapi server is running and
              has category content.
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
    const categoriesData = await getCategories();
    const categories = categoriesData?.data || [];

    return {
      props: {
        categories,
      },
      revalidate: 60,
    };
  } catch (error) {
    console.error('Error fetching categories:', error);

    return {
      props: {
        categories: [],
      },
      revalidate: 60,
    };
  }
};
