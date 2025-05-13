import React from "react";
import DrawerContent from "@/app/Models/useDrawer";
import CommentForm from "@/app/components/features/CommentSection";

const CommentsDrawer = ({ article, open, setOpen }) => {

  return (
    <DrawerContent open={open} onClose={() => setOpen(false)} title="Add Comment">
      <CommentForm article={article} />
    </DrawerContent>
  );
};

export default CommentsDrawer;
