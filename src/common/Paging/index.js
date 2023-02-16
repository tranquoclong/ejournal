import React from "react";
function Pagination({ page, setPage, totalPages }) {
  let pattern = null;
  switch (true) {
    case totalPages < 7:
      pattern = [...new Array(totalPages)].map((_, i) => i + 1);
      break;
    case page < 4:
      pattern = [1, 2, 3, 4, 5, "...", totalPages];
      break;
    case page > totalPages - 4:
      pattern = [
        1,
        "...",
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
      break;
    default:
      pattern = [1, "...", page - 1, page, page + 1, "...", totalPages];
  }

  function changeNumber(n) {
    if (typeof n === "number" && n > 0 && n <= totalPages) {
      setPage(n);
    }
  }
  return (
    <div className="pagination__wrapper">
      <ul className="pagination">
        <li>
          <span disabled={page <= 1} onClick={() => changeNumber(page - 1)}>
            Prev
          </span>
        </li>
        {pattern.map((label, index) => (
          <li className={page === label ? "active" : "numb"} key={index}>
            <span onClick={() => changeNumber(label)}>{label}</span>
          </li>
        ))}
        <li>
          <span
            disabled={page >= totalPages}
            onClick={() => changeNumber(page + 1)}
          >
            Next
          </span>
        </li>
      </ul>
    </div>
  );
}

export default Pagination;
