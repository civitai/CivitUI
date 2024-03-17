"use client";

import { File, Loader2, Trash2, UploadCloud } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import useDragDrop from "@/hooks/use-drag-drop";
import { cn, formatBytes } from "@/lib/utils";
import { useWorkflowForm } from "@/hooks/use-form";

interface DropzoneProps {
  onUpload: (file: File) => void;
}

export default function Dropzone({ onUpload }: DropzoneProps) {
  const form = useWorkflowForm();

  const [file, setFile] = useState<File | null>(null);
  const [loadingState, setLoadingState] = useState<boolean>(false);
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

    if (selectedFile.size > 102400) {
      // 100KB in bytes
      return setFileDropError("File size exceeds the maximum limit of 100KB.");
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

    if (selectedFile.size > 102400) {
      // 100KB in bytes
      return setFileDropError("File size exceeds the maximum limit of 100KB.");
    }

    setFile(selectedFile);
    setFileDropError("");
    onUpload(selectedFile);
  };

  const simulateLoading = () => {
    if (!file) return;

    setLoadingState(true);

    const duration = Math.max(1000, Math.min(file.size / 750, 4000));

    setTimeout(() => {
      setLoadingState(false);
    }, duration);
  };

  const handleDelete = () => {
    setFile(null);
  };

  useEffect(() => {
    if (file && !loadingState) {
      simulateLoading();
    }
  }, [file]);

  return (
    <>
      <div className="mb-4">
        <div className="border-b">
          <div className="flex flex-row justify-start items-center px-4 py-2.5 gap-2">
            <div className="rounded-full border p-2 flex flex-row justify-center items-center dark:border-neutral-700">
              <UploadCloud className="h-5 w-5 text-neutral-600" />
            </div>
            <div className="space-y-0.5">
              <p className="font-semibold mb-0">Upload ComfyUI Workflow</p>
              <p className="text-sm text-neutral-500 -mt-1">
                Drop your ComfyUI JSON API file.
              </p>
            </div>
          </div>
        </div>
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
            <UploadCloud
              className={cn(
                "h-5 w-5 text-neutral-600 my-4",
                dragOver && "text-blue-500"
              )}
            />
            <p className="font-semibold">
              Choose a file or drag & drop it here
            </p>
            <p className="text-neutral-500 text-sm">
              Only JSON files. Up to 100 KB.
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
                {loadingState ? (
                  <Loader2 className="h-4 w-4 animate-spin text-neutral-500" />
                ) : (
                  <div className="flex flex-row justify-start items-center text-xs rounded-full px-2 py-[0.5px] gap-1">
                    <div className="h-2 w-2 bg-green-400 rounded-full" />
                    <p className="text-neutral-500">Uploaded</p>
                  </div>
                )}
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
      </div>
    </>
  );
}
