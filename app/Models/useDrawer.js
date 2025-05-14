import React from "react";
import { Box, Drawer, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useThemeContext } from "../context/ThemeContext";

const DrawerContent = ({ open, onClose, children,title }) => {
  const {themeData,config}=useThemeContext()
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
        backgroundColor:  themeData?.background?.body,
        color: themeData?.text?.card ,
      }}
    >
      {/* Title and Close Button */}
      <Box
        display="flex"
        justifyContent="space-between"c
        alignItems="center"
        mb={2}
        sx={{
          backgroundColor: themeData?.background?.header, 
          padding: "8px",
          borderRadius: config?.borderRadius,
        }}
      >
        <Typography variant="h6" sx={{ color: themeData?.text?.primary }}>
          {title}
        </Typography>
        <IconButton onClick={onClose} sx={{ color: themeData?.text?.primary }}>
          <CloseIcon />
        </IconButton>
      </Box>
      {children}
    </Drawer>
  );
};

export default DrawerContent;
