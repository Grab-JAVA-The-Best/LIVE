import React, { useEffect, useState } from "react";
import classes from "./Pagination.module.scss";

const Pagination = ({ itemsPerPage, totalItems, paginate }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  useEffect(() => {
    paginate(currentPage);
  }, [currentPage]);

  return (
    <nav>
      <ul className={classes.pagination}>
        <p
          className={classes.moveBtn}
          onClick={
            currentPage !== 1
              ? () => {
                  setCurrentPage(currentPage - 1);
                }
              : undefined
          }
        >
          &lt;
        </p>
        {pageNumbers.length !== 0
          ? pageNumbers
              .slice(
                currentPage - 3 <= 0 ? 0 : currentPage - 3,
                pageNumbers.length < currentPage + 2
                  ? pageNumbers.length
                  : currentPage + 2
              )
              .map((number) => (
                <li
                  key={number}
                  className={
                    currentPage === number ? classes.active : undefined
                  }
                  onClick={() => {
                    setCurrentPage(number);
                  }}
                >
                  <p>{number}</p>
                </li>
              ))
          : [1].map((number) => (
              <li
                key={number}
                className={currentPage === number ? classes.active : undefined}
                onClick={() => {
                  setCurrentPage(number);
                }}
              >
                <p>{number}</p>
              </li>
            ))}
        <p
          className={classes.moveBtn}
          onClick={
            currentPage !== Math.ceil(totalItems / itemsPerPage)
              ? () => {
                  setCurrentPage(currentPage + 1);
                }
              : undefined
          }
        >
          &gt;
        </p>
      </ul>
    </nav>
  );
};

export default Pagination;
