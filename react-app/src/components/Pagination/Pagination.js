import React from 'react';

export default function Pagination(props) {
  const {
    onPageChange,
    totalRecords,
    currentPage,
    itemsPerPage
  } = props;
  const lastPage = Math.ceil(totalRecords / itemsPerPage);

  const onNext = () => {
    onPageChange(Math.min(currentPage + 1, lastPage));
  };

  const onPrevious = () => {
    onPageChange(Math.max(1, currentPage - 1));
  };

  if (lastPage <= 1) return null;

  return (
    <ul className="pagination">
      {/* Previous Page Link */}
      <li
        role="presentation"
        className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}
        onClick={onPrevious}
      >
        <a className="page-link" href="#">Prev</a>
      </li>
      {/*  Next Page Link */}
      <li
        role="presentation"
        className={`page-item ${currentPage === lastPage ? 'disabled' : ''}`}
        onClick={onNext}
      >
        <a className="page-link" href="#">Next</a>
      </li>
    </ul>
  );
}
