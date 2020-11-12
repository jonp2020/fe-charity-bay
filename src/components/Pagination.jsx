import { red } from "@material-ui/core/colors";
import React from "react";

export default function Pagination({
  page,
  atStart,
  atEnd,
  pages,
  changePage,
}) {
  return (
    <div className="paggination">
      <button
        className="p-button"
        disabled={atStart}
        onClick={() => {
          changePage(page - 1);
        }}
      >
        {"<"}
      </button>
      {pages.map((singlePage) => (
        <button
          style={{
            background: "rgb(250,237,205)",
            padding:'6px 12px',
            margin: "2px"
          }}
          className="p-button"
          key={singlePage}
          onClick={() => {
            changePage(singlePage);
          }}
          className={page === singlePage ? "button-background" : null}
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
        {">"}
      </button>
    </div>
  );
}
