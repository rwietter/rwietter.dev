import React, { FC } from 'react';
import CATEGORY_ARTICLES_QUERY from 'queries/category/articles';
import apolloClient from 'utils/apollo-client';
import { GetStaticPaths, GetStaticProps } from 'next';
import { Articles } from 'components/articles';
import CATEGORIES_QUERY from 'queries/category/categories';

const Category: FC<any> = ({ categories }) => {
  if (!categories) return <div />;

  const [attributes] = categories.map((category: any) => category.attributes);

  return (
    <div>
      <div>
        <div>
          <Articles articles={attributes.articles.data} />
        </div>
      </div>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await apolloClient.query({ query: CATEGORIES_QUERY });
  if (!data) return { paths: [], fallback: true };

  const paths = data.categories.data.map((article: any) => ({
    params: { slug: article.attributes.slug },
  }));

  if (!paths) return { paths: [], fallback: true };

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!params) return { props: {} };

  const { data } = await apolloClient.query(
    { query: CATEGORY_ARTICLES_QUERY, variables: { slug: params.slug } },
  );

  if (!data) return { props: {} };

  return {
    props: {
      slug: params.slug,
      categories: data.categories.data,
    },
    revalidate: 21600,
  };
};

export default Category;
