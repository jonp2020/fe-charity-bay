import React from 'react';

export default function Pagination({
  page,
  atStart,
  atEnd,
  pages,
  changePage,
}) {
  return (
    <div>
      <button
        disabled={atStart}
        onClick={() => {
          changePage(page - 1);
        }}
      >
        {'<'}
      </button>
      {pages.map((singlePage) => (
        <button
          key={singlePage}
          onClick={() => {
            changePage(singlePage);
          }}
          className={page === singlePage ? 'button-background' : null}
        >
          {singlePage}
        </button>
      ))}
      <button
        disabled={atEnd}
        onClick={() => {
          changePage(page + 1);
        }}
      >
        {'>'}
      </button>
    </div>
  );
}
