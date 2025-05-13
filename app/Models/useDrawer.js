import React from "react";
import { Box, Drawer, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useThemeContext } from "../context/ThemeContext";

const DrawerContent = ({ open, onClose, children,title }) => {
  const {themeData}=useThemeContext()
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      sx={{
        "& .MuiDrawer-paper": {
          padding: "16px",
          display: "flex",
          width: "300px",
          flexDirection: "column",
        },
        backgroundColor: themeData?.background,
        color: themeData?.cardText,
      }}
    >
      {/* Title and Close Button */}
      <Box
        display="flex"
        justifyContent="space-between"c
        alignItems="center"
        mb={2}
        sx={{
          backgroundColor: themeData?.headerBg, 
          padding: "8px",
          borderRadius: "4px",
        }}
      >
        <Typography variant="h6" sx={{ color: themeData?.navText }}>
          {title}
        </Typography>
        <IconButton onClick={onClose} sx={{ color: themeData?.navText }}>
          <CloseIcon />
        </IconButton>
      </Box>
      {children}
    </Drawer>
  );
};

export default DrawerContent;
