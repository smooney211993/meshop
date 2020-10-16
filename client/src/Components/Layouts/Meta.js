import React from 'react';
import { Helmet } from 'react-helmet';

Meta.defaultProps = {
  title: 'MeShop',
  description: 'An Online Marketplace With The Best Prices',
  keywords: 'Electronics And White Goods',
};

export const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='keywords' content={keyword} />
    </Helmet>
  );
};
