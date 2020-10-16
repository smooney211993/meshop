import React from 'react';
import { Pagination } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
const Paginate = ({ pages, page, isAdmin = false, keyword = '' }) => {
  // make sure pages is greater than 1
  // take the number of pages and map through it as an array - uses the array constructor and pass in the pages
  // The link in the linkcontainer depends on if their is a keyword or not
  // app js has 2 routes for homescreen one with search and if not just the pagenumber
  // active prop in pagination.Item checks if the current page(x+1) is equal to the current page
  return (
    pages > 1 && (
      <Pagination>
        {[...Array(pages).keys()].map((x) => (
          <LinkContainer
            key={x + 1}
            to={
              keyword ? `/search/${keyword}/page/${x + 1}` : `/page/${x + 1}`
            }>
            <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
          </LinkContainer>
        ))}
      </Pagination>
    )
  );
};

export default Paginate;
