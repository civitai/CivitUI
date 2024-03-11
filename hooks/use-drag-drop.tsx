"use client";

import { useState } from "react";

export default function useDragDrop() {
  const [dragOver, setDragOver] = useState<boolean>(false);
  const [fileDropError, setFileDropError] = useState<string>("");

  const onDragOver = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const onDragLeave = () => setDragOver(false);

  return {
    // Drag
    dragOver,
    setDragOver,
    onDragOver,
    onDragLeave,
    // Errors
    fileDropError,
    setFileDropError,
  };
}
