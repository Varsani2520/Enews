"use client";
import React from "react";
import { Pagination } from "@mui/material";

const CustomPagination = ({ totalItems, itemsPerPage, currentPage, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  if (totalPages <= 1) return null; // Hide pagination if only one page

  return (
    <div className="flex justify-center mt-4">
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={(_, page) => onPageChange(page)}
        color="primary"
      />
    </div>
  );
};

export default CustomPagination;
