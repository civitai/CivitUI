"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { useState } from "react";

interface ModelItemProps extends React.HTMLAttributes<HTMLDivElement> {
  model: {
    id: number;
    name: string;
    images: {
      url: string;
    }[];
    stats: {
      downloadCount: number;
    };
    model: {
      name: string;
    };
  };
}

export function ModelItem({ model, className, ...props }: ModelItemProps) {
  const [isLoading, setIsLoading] = useState(true);

  const imageUrl = model.images[0]?.url;
  const downloadCount = model.stats.downloadCount;

  return (
    <div className={cn("space-y-3", className)} {...props}>
      <ContextMenu>
        <ContextMenuTrigger asChild>
          <div className="relative overflow-hidden rounded-md aspect-portrait">
            <Image
              fill={true}
              src={imageUrl}
              alt={model.name}
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
      <div className="space-y-1 text-sm">
        <h3 className="font-medium leading-none">{model.model.name}</h3>
        <p className="flex gap-2 text-xs text-muted-foreground">
          {downloadCount} downloads
        </p>
      </div>
    </div>
  );
}
