// components/Reuse/DrawerContent.jsx
import React from "react";
import { Box, Drawer, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const DrawerContent = ({ open, onClose, children,title }) => {
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
      }}
    >
      {/* Title and Close Button */}
      <Box
        display="flex"
        justifyContent="space-between"c
        alignItems="center"
        mb={2}
      >
        <Typography variant="h6">{title}</Typography>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>
      {children}
    </Drawer>
  );
};

export default DrawerContent;
