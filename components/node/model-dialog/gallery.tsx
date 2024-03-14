"use client";

import Image from "next/image";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

import { ModelItem } from "./model-item";
import { data } from "./data/data";
import { useEffect, useState } from "react";

export default function Gallery() {
  const [models, setModels] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchModels = async () => {
      try {
        const response = await fetch(
          "/api/models?type=Checkpoint&limit=5&sort=Most%20Downloaded&period=AllTime"
        );
        const data = await response.json();
        console.log("Response data:", data);
        setModels(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching models:", error);
        setIsLoading(false);
      }
    };

    fetchModels();
  }, []);

  return (
    <div className="grid max-w-6xl py-12 px-4 overflow-auto">
      <div className="h-full lg:px-8">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight">
              Featured Models
            </h2>
            <p className="text-sm text-muted-foreground">
              Top picks for you. Updated weekly.
            </p>
          </div>
        </div>
        <Separator className="my-4" />
        <div className="grid grid-cols-4 gap-4 pb-4">
          {data.map((model) => (
            <ModelItem key={model.id} model={model} />
          ))}
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
    </div>
  );
}
