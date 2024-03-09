"use client";

import NodePickerComponent from "./node-picker";
import WorkflowPageComponent from "./workflow-page";
import GalleryComponent from "./gallery";
import React, { useMemo } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

enum TABS {
  NODES = "Nodes",
  WORKFLOW = "Workflow",
  GALLERY = "Gallery",
}

const ControlPanel: React.FC = () => {
  const tabs = useMemo(
    () => [
      {
        label: TABS.NODES,
        key: TABS.NODES,
        children: <NodePickerComponent />,
      },
      {
        label: TABS.WORKFLOW,
        key: TABS.WORKFLOW,
        children: <WorkflowPageComponent />,
      },
      // {
      //   label: TABS.GALLERY,
      //   key: TABS.GALLERY,
      //   children: <GalleryComponent />,
      // },
    ],
    []
  );

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open</Button>
      </SheetTrigger>
      <SheetContent>
        <Tabs defaultValue={TABS.NODES}>
          <TabsList>
            {tabs.map((tab) => (
              <TabsTrigger key={tab.key} value={tab.key}>
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
          {tabs.map((tab) => (
            <TabsContent key={tab.key} value={tab.key}>
              {tab.children}
            </TabsContent>
          ))}
        </Tabs>
      </SheetContent>
    </Sheet>
  );
};

export default React.memo(ControlPanel);
