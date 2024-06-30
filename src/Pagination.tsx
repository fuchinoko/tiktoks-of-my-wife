import React, { useState } from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (pageNumber: number) => void;
  handlePreviousClick: () => void;
  handleNextClick: () => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  onPageChange,
  totalPages,
  handlePreviousClick,
  handleNextClick,
}) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleJumpToPage = () => {
    const pageNumber = Number(inputValue);
    if (!isNaN(pageNumber) && pageNumber >= 1 && pageNumber <= totalPages) {
      onPageChange(pageNumber);
      setInputValue("");
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleJumpToPage();
    }
  };

  const getDisplayedPages = () => {
    const delta = 2;
    let range: (number | string)[] = [];

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      range.unshift("...");
    }
    if (currentPage + delta < totalPages - 1) {
      range.push("...");
    }

    range.unshift(1);
    if (totalPages !== 1) {
      range.push(totalPages);
    }

    return range;
  };

  return (
    <div className="pagination">
      <button onClick={handlePreviousClick} disabled={currentPage === 1}>
        &lt;
      </button>
      {getDisplayedPages().map((page, index) =>
        typeof page === "number" ? (
          <button
            key={index}
            onClick={() => onPageChange(page)}
            className={currentPage === page ? "active" : ""}
          >
            {page}
          </button>
        ) : (
          <span key={index}>...</span>
        )
      )}
      <button onClick={handleNextClick} disabled={currentPage === totalPages}>
        &gt;
      </button>
      <input
        type="number"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Jump to page"
      />
      <button onClick={handleJumpToPage}>Go</button>
    </div>
  );
};

export default Pagination;
