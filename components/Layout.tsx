import { ReactNode } from 'react';
import Header from './Header';
import Head from 'next/head';

interface LayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
}

const Layout = ({
  children,
  title = 'Divergence Blog',
  description = 'A blog built with Next.js and Strapi',
}: LayoutProps) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="app">
        <Header />
        <main className="main">{children}</main>
        <footer className="footer">
          <p>&copy; 2024 Divergence Blog. Built with Next.js and Strapi.</p>
        </footer>
      </div>
    </>
  );
};

export default Layout;
