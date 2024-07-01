"use client";

import { useEffect, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { UploadIcon } from "@radix-ui/react-icons";
import { File, Loader2, Trash2 } from "lucide-react";

import useDragDrop from "@/hooks/use-drag-drop";
import { cn, formatBytes } from "@/lib/utils";

interface DropzoneProps {
  onUpload: (file: File) => void;
}

export const Dropzone = ({ onUpload }: DropzoneProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [fileDropError, setFileDropError] = useState<string>("");

  const { dragOver, setDragOver, onDragOver, onDragLeave } = useDragDrop();

  const onDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setDragOver(false);

    const selectedFile = e.dataTransfer.files[0];

    if (!selectedFile) {
      return setFileDropError("No file selected.");
    }

    if (selectedFile.type !== "application/json") {
      return setFileDropError(
        "Invalid file type! Only JSON files are accepted."
      );
    }

    setFile(selectedFile);
    setFileDropError("");
    onUpload(selectedFile);
  };

  const fileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files ? e.target.files[0] : null;

    if (!selectedFile) {
      return setFileDropError("No file selected.");
    }

    if (selectedFile.type !== "application/json") {
      return setFileDropError(
        "Invalid file type! Only JSON files are accepted."
      );
    }

    setFile(selectedFile);
    setFileDropError("");
    onUpload(selectedFile);
  };

  const handleDelete = () => {
    setFile(null);
  };

  return (
    <>
      <div className="border-b">
        <label
          htmlFor="file"
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          className={cn(
            "px-4 py-2 border-[1.5px] border-dashed dark:border-neutral-700 m-4 rounded-lg flex flex-col justify-start items-center hover:cursor-pointer",
            dragOver && "border-blue-600 bg-blue-50"
          )}
        >
          <div className="flex flex-col p-4 justify-start items-center text-center">
            <UploadIcon
              className={cn(
                "h-5 w-5 text-neutral-600 my-4",
                dragOver && "text-blue-500"
              )}
            />
            <p className="font-semibold">
              Load a workspace or drag & drop it here
            </p>
            <p className="text-neutral-500 text-sm">
              Only JSON files.
            </p>
          </div>
        </label>
        <input
          type="file"
          name="file"
          id="file"
          className="hidden"
          onChange={fileSelect}
          accept="application/json"
        />
        </div>

        {file && (
          <div className="w-full px-4 py-2 gap-2 flex flex-col justify-start items-center border-t dark:border-neutral-700 overflow-auto">
            <div className="flex flex-row justify-between items-center border dark:border-neutral-700 rounded-lg px-2 py-1 w-full group">
              <div className="flex flex-row justify-start items-center gap-2">
                <File className="h-5 w-5 text-neutral-500" />
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <p className="truncate hover:cursor-help">{file.name}</p>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{file.name}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <p className="text-xs text-neutral-500">
                  {formatBytes(file.size)}
                </p>
              </div>
              <div className="flex flex-row justify-end items-center gap-2">
                <button
                  className="text-neutral-400 p-1 rounded-lg hover:text-black transition-all hover:cursor-pointer"
                  onClick={handleDelete}
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        )}
        {fileDropError && (
          <div className="bg-orange-50 py-1 mx-2 rounded-lg text-center my-2 border border-orange-200 flex flex-row justify-center items-center gap-2">
            <File className="h-4 w-4 text-orange-400" />
            <p className="text-orange-400 text-sm font-medium">
              {fileDropError}
            </p>
          </div>
        )}
    </>
  );
}
