import React from 'react';


export default function Pagination({
  page,
  atStart,
  atEnd,
  pages,
  changePage,
}) {
  return (
    <div className="pagination">
      <button
        className="p-button"
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
          className="p-button"
          onClick={() => {
            changePage(singlePage);
          }}
          id={page === singlePage ? 'button-background' : 'p-Button-background'}
        >
          {singlePage}
        </button>
      ))}
      <button
        className="p-button"
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
