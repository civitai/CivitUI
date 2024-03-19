"use client";

import NodePickerComponent from "./node-picker";
import WorkflowPageComponent from "./workflow-page";
import GalleryComponent from "./gallery";
import React, { useMemo } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { FilePlusIcon, PlusIcon } from "@radix-ui/react-icons";
import { QueuePromptButton } from "../queue-prompt-button";

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
    <Sheet modal={false}>
      <div className="fixed top-1/2 right-8 transform -translate-y-1/2 flex flex-col gap-3">
        <SheetTrigger asChild>
          <Button
            className="relative group/btn rounded-2xl shadow-lg hover:bg-background hover:rounded-lg transition-all duration-300"
            variant={"outline"}
            size={"icon"}
          >
            <PlusIcon />
          </Button>
        </SheetTrigger>

        <SheetTrigger asChild>
          <Button
            className="relative group/btn rounded-2xl shadow-lg hover:bg-background hover:rounded-lg transition-all duration-300"
            variant="outline"
            size={"icon"}
          >
            <FilePlusIcon />
          </Button>
        </SheetTrigger>

        <QueuePromptButton />
      </div>

      <SheetContent side={"left"} className="overflow-y-scroll">
        <Tabs defaultValue={TABS.NODES} className="mt-8">
          <div className="px-2">
            <TabsList className="w-full mb-4">
              {tabs.map((tab) => (
                <TabsTrigger className="w-full" key={tab.key} value={tab.key}>
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

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
