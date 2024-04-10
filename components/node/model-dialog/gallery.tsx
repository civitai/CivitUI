"use client";

import { ModelItem } from "./model-item";
import { Search } from "@/components/search";

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
      thumbsUpCount: number;
    };
  }[];
}

export default function Gallery() {
  return <Search />;
}
