// components/Reuse/DrawerContent.jsx
import React from "react";
import { Drawer } from "@mui/material";

const DrawerContent = ({ open, onClose, children }) => {
  return (
    <Drawer anchor="right" open={open} onClose={onClose} sx={{
      '& .MuiDrawer-paper': {
        padding: '16px',
        display: 'flex',
        width:'300px',
        flexDirection: 'column',
      },
    }}>
      {children}
    </Drawer>
  );
};

export default DrawerContent;
