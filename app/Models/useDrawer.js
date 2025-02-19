// components/Reuse/DrawerContent.jsx
import React from "react";
import { Drawer } from "@mui/material";

const DrawerContent = ({ open, onClose, children }) => {
  return (
    <Drawer anchor="bottom" open={open} onClose={onClose} sx={{
      '& .MuiDrawer-paper': {
        height: '50%',
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
      },
    }}>
      {children}
    </Drawer>
  );
};

export default DrawerContent;
