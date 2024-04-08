"use client";

import Image from "next/image";
import { cn, formatCount } from "@/lib/utils";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { useState } from "react";
import { Download, ThumbsUp } from "lucide-react";

export interface ModelItemProps {
  model: {
    id: number;
    name: string;
    description: string;
    modelVersions: {
      id: number;
      name: string;
      images: {
        url: string;
      }[];
      stats: {
        downloadCount: number;
        thumbsUpCount: number;
      };
    }[];
  };
}

export function ModelItem({ hit }: { hit: any }) {
  const [isLoading, setIsLoading] = useState(true);

  const imageUrl = hit.modelVersions[0].images[0].url;
  const downloadCount = hit.modelVersions[0].stats.downloadCount;
  const thumbsUpCount = hit.modelVersions[0].stats.thumbsUpCount;

  return (
    <div className="space-y-3">
      <ContextMenu>
        <ContextMenuTrigger asChild>
          <div className="relative overflow-hidden rounded-md aspect-portrait">
            <Image
              fill={true}
              src={imageUrl}
              alt={hit.name}
              className={cn(
                "object-cover object-top duration-200 ease-in-out hover:scale-105 cursor-pointer",
                isLoading
                  ? "scale-120 blur-3xl grayscale"
                  : "scale-100 blur-0 grayscale-0"
              )}
              onLoad={() => setIsLoading(false)}
            />
          </div>
        </ContextMenuTrigger>
        <ContextMenuContent className="w-40">
          <ContextMenuItem>View model</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
      <div className="space-y-2 text-sm">
        <h3 className="font-medium leading-none">{hit.name}</h3>
        <div className="flex gap-4 items-center">
          <p className="flex gap-1 text-xs text-muted-foreground items-center">
            <Download className="h-3 w-3" /> {formatCount(downloadCount)}
          </p>
          <p className="flex gap-1 text-xs text-muted-foreground items-center">
            <ThumbsUp className="h-3 w-3" /> {formatCount(thumbsUpCount)}
          </p>
        </div>
      </div>
    </div>
  );
}
