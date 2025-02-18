"use client";
import React from "react";
import { Modal, Box, IconButton, Typography } from "@mui/material";
import { Facebook, Twitter, WhatsApp, LinkedIn, Close } from "@mui/icons-material";

const ShareModal = ({ open, onClose, shareLinks }) => {
  return (
    <Modal open={open} onClose={onClose} aria-labelledby="share-modal-title">
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 300,
          bgcolor: "white",
          boxShadow: 24,
          p: 3,
          borderRadius: 2,
          textAlign: "center",
        }}
      >
        <Typography id="share-modal-title" variant="h6" sx={{ mb: 2 }}>
          Share this article
        </Typography>
        <IconButton onClick={onClose} sx={{ position: "absolute", top: 8, right: 8 }}>
          <Close />
        </IconButton>
        <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
          <IconButton component="a" href={shareLinks.facebook} target="_blank">
            <Facebook color="primary" />
          </IconButton>
          <IconButton component="a" href={shareLinks.twitter} target="_blank">
            <Twitter color="primary" />
          </IconButton>
          <IconButton component="a" href={shareLinks.whatsapp} target="_blank">
            <WhatsApp color="success" />
          </IconButton>
          <IconButton component="a" href={shareLinks.linkedin} target="_blank">
            <LinkedIn color="primary" />
          </IconButton>
        </Box>
      </Box>
    </Modal>
  );
};

export default ShareModal;
