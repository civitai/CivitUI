"use client";

import NodePickerComponent from "./node-picker";
import WorkflowPageComponent from "./workflow-page";
import GalleryComponent from "./gallery";
import React, { useMemo } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { FilePlusIcon, PlusIcon } from "@radix-ui/react-icons";

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
      <div className="fixed top-1/2 left-8 transform -translate-y-1/2 flex flex-col gap-2">
        <SheetTrigger asChild>
          <Button
            className="relative group/btn shadow-lg hover:bg-background"
            variant={"outline"}
            size={"icon"}
          >
            <PlusIcon />
            <BottomGradient />
          </Button>
        </SheetTrigger>

        <SheetTrigger asChild>
          <Button
            className="relative group/btn shadow-lg hover:bg-background"
            variant="outline"
            size={"icon"}
          >
            <FilePlusIcon />
            <BottomGradient />
          </Button>
        </SheetTrigger>
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

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-300 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-300 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

export default React.memo(ControlPanel);
