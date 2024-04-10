import Image from "next/image";
import { cn } from "@/lib/utils";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { useState } from "react";

export interface ModelItemProps {
  hit: any;
}

export function Hit({ hit }: ModelItemProps) {
  console.log("hit", hit);
  const [isLoading, setIsLoading] = useState(true);

  // todo: limit to jpg (some mp4 files are being returned); filter to only checkpoints and onsite generators
  const imageUrl = `https://image.civitai.com/xG1nkqKTMzGDvpLrqFT7WA/${hit.images[0].url}/${hit.images[0].name}.jpeg`;
  const downloadCount = hit.metrics.downloadCount;

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
      <div className="space-y-1 text-sm">
        <h3 className="font-medium leading-none">{hit.name}</h3>
        <p className="flex gap-2 text-xs text-muted-foreground">
          {downloadCount} downloads
        </p>
      </div>
    </div>
  );
}
