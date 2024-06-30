import React, { useState, useEffect, useCallback } from "react";
import Pagination from "./Pagination";
import TikTokEmbed from "./TikTokEmbed";
import { db } from "./firebase";
import { doc, getDoc, setDoc } from "firebase/firestore/lite";

interface PaginatedListProps {
  items: string[];
  itemsPerPage: number;
}

const PaginatedList: React.FC<PaginatedListProps> = ({
  items,
  itemsPerPage,
}) => {
  const [currentPage, _setCurrentPage] = useState(1);

  const DOCUMENT_ID = "single-user-page-number";

  useEffect(() => {
    const fetchPageNumber = async () => {
      try {
        const docRef = doc(db, "appData", DOCUMENT_ID);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          _setCurrentPage(docSnap.data().pageNumber);
        } else {
          console.error("No such document.");
        }
      } catch (error) {
        console.error("Error fetching page number:", error);
      }
    };

    fetchPageNumber();
  }, []);

  const savePageNumber = async (newPageNumber: number) => {
    try {
      const docRef = doc(db, "appData", DOCUMENT_ID);
      await setDoc(docRef, { pageNumber: newPageNumber });
    } catch (error) {
      console.error("Error saving page number:", error);
    }
  };

  const setCurrentPage = useCallback(
    (newPage: number) => {
      _setCurrentPage(newPage);
      savePageNumber(newPage);
      if (itemsPerPage !== 1) {
        window.scrollTo(0, 0);
      }
    },
    [itemsPerPage]
  );

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = items.slice(startIndex, endIndex);

  const onPageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        handlePreviousClick();
      } else if (event.key === "ArrowRight") {
        handleNextClick();
      }
    };
    const handlePreviousClick = () => {
      if (currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    };

    const handleNextClick = () => {
      if (currentPage < Math.ceil(items.length / itemsPerPage)) {
        setCurrentPage(currentPage + 1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentPage, items.length, itemsPerPage, setCurrentPage]);

  const handlePreviousClick = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const totalCount = items.length;
  const totalPages = Math.ceil(totalCount / itemsPerPage);

  return (
    <div>
      <div className="list">
        {currentItems.map((item, index) => (
          <TikTokEmbed
            key={index}
            url={item}
            {...{
              handlePreviousClick,
              handleNextClick,
              totalPages,
              currentPage,
            }}
          />
        ))}
      </div>
      <Pagination
        {...{
          currentPage,
          onPageChange,
          handlePreviousClick,
          handleNextClick,
          totalPages,
        }}
      />
    </div>
  );
};

export default PaginatedList;
