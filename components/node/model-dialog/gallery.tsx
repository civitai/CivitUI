"use client";

import Image from "next/image";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

import { ModelItem } from "./model-item";
import { data } from "./data/data";
import { useEffect, useState } from "react";
import {
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

interface Model {
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
    };
  }[];
}

export default function Gallery() {
  const [models, setModels] = useState<Model[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchModels = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          "/api/models?type=Checkpoint&limit=5&sort=Most%20Downloaded&period=AllTime"
        );
        const data = await response.json();
        console.log("Response data:", data);
        setModels(data.items);
      } catch (error) {
        console.error("Error fetching models:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchModels();
  }, []);

  return (
    <div>
      <DrawerHeader className="px-0">
        <DrawerTitle>Featured Models</DrawerTitle>
        <DrawerDescription>
          Top picks for you. Updated weekly.
        </DrawerDescription>
      </DrawerHeader>
      <Separator className="my-4" />
      <div className="grid grid-cols-4 gap-4 pb-4">
        {models?.map((model) => (
          <ModelItem key={model.id} model={model} />
        ))}

        {isLoading && (
          <div className="col-span-4 flex justify-center items-center">
            <p>Loading...</p>
          </div>
        )}
      </div>
      {/* <div className="mt-6 space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">
            Made for You
          </h2>
          <p className="text-sm text-muted-foreground">
            Your personal favourites.
          </p>
        </div>
        <Separator className="my-4" />
        <div className="relative">
          <ScrollArea>
            <div className="grid grid-cols-5 gap-4 pb-4">
              {data.map((model) => (
                <ModelItem key={model.id} model={model} />
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div> */}
    </div>
  );
}
