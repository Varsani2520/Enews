import React, { useState } from "react";
import DrawerContent from "@/app/Models/useDrawer";
import CommentForm from "@/app/components/features/CommentSection";

const CommentsDrawer = ({ article }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <DrawerContent open={drawerOpen} onClose={() => setDrawerOpen(false)} title="Add Comment">
      <CommentForm article={article} />
    </DrawerContent>
  );
};

export default CommentsDrawer;
