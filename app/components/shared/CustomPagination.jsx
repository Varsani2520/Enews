"use client";
import React from "react";
import { Pagination } from "@mui/material";
import { useThemeContext } from "@/app/context/ThemeContext";

const CustomPagination = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
}) => {
  const { themeData } = useThemeContext();
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  if (totalPages <= 1) return null; // Hide pagination if only one page

  return (
    <div className="flex justify-center mt-4">
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={(_, page) => onPageChange(page)}
        variant="outlined"
        shape="rounded"
        sx={{
          "& .MuiPaginationItem-root": {
            color: themeData?.navText, // Text color
            borderColor: themeData?.buttonBg, // Border color
          },
          "& .MuiPaginationItem-page.Mui-selected": {
            backgroundColor: themeData?.buttonBg, // Selected page color
            color: themeData?.buttonText, // Selected text color
          },
        }}      />
    </div>
  );
};

export default CustomPagination;
