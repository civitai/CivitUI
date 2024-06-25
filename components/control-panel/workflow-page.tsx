"use client";

import defaultWorkflow from "@/app/defaultWorkflow";
import { useAppStore } from "@/store";
import type { LocalPersistedGraphs, PersistedGraph } from "@/types";
import {
  cleanTempWorkflow,
  deleteLocalWorkflowFromId,
  readWorkflowFromFile,
  retrieveLocalWorkflows,
} from "@/utils";

import React, { useCallback, useEffect, useState } from "react";
import { useShallow } from "zustand/react/shallow";
import WorkflowItem from "./workflow-item";
import { toast } from "sonner";
import Dropzone from "../dropzone";
import { Label } from "../ui/label";
import { Button } from "../ui/button";

const WorkflowPageComponent = () => {
  const [title, setTitle] = useState<string>();
  const [localWorkflowList, setLocalWorkflowList] =
    useState<LocalPersistedGraphs[]>();
  const [count, setCount] = useState<number>(0);

  const {
    onLoadWorkflow,
    onDownloadWorkflow,
    onSaveLocalWorkFlow,
    onUpdateLocalWorkFlowGraph,
    onUpdateLocalWorkFlowTitle,
  } = useAppStore(
    useShallow((st) => ({
      onLoadWorkflow: st.onLoadWorkflow,
      onDownloadWorkflow: st.onDownloadWorkflow,
      onSaveLocalWorkFlow: st.onSaveLocalWorkFlow,
      onUpdateLocalWorkFlowGraph: st.onUpdateLocalWorkFlowGraph,
      onUpdateLocalWorkFlowTitle: st.onUpdateLocalWorkFlowTitle,
    }))
  );

  // Save local workflow
  const handleSave = useCallback(() => {
    onSaveLocalWorkFlow(title);
    setCount(count + 1);
    toast.success(`Success! ${title ?? "Your workflow"} has been saved.`);
  }, [count, onSaveLocalWorkFlow, title]);

  // Delete local workflow
  const handleDelete = useCallback(
    (id: string, name: string) => {
      deleteLocalWorkflowFromId(id);
      setCount(count + 1);
      toast.info(`${name} has been deleted.`);
    },
    [count]
  );

  // Load workflow
  const handleLoad = useCallback(
    (graph: PersistedGraph, name: string) => {
      if (graph) {
        onLoadWorkflow(graph);
        setCount(count + 1);
        toast.success(`${name} successfully loaded.`);
      } else {
        toast.error(`${name} is invalid.`);
      }
    },
    [count, onLoadWorkflow]
  );

  // Update local workflow graph data
  const handleUpdate = useCallback(
    (id: string, name: string) => {
      onUpdateLocalWorkFlowGraph(id);
      setCount(count + 1);
      toast.success(`${name} successfully updated.`);
    },
    [count, onUpdateLocalWorkFlowGraph]
  );

  // Rename local workflow
  const handleRename = useCallback(
    (id: string, name: string) => {
      onUpdateLocalWorkFlowTitle(id, name);
      setCount(count + 1);
      toast.success(`Workflow successfully renamed to ${name}.`);
    },
    [count, onUpdateLocalWorkFlowTitle]
  );

  // Load default workflow
  const handleNew = useCallback(() => {
    cleanTempWorkflow();
    onLoadWorkflow(defaultWorkflow);
    setCount(count + 1);
  }, [count, onLoadWorkflow]);

  // Upload workflow file
  const handleUpload = useCallback(
    (file: File) => {
      readWorkflowFromFile(file, (workflow) => {
        if (workflow) {
          onLoadWorkflow(workflow);
          // setCount(count + 1);
          // EXDYSA: needs a toast, but what is for?? WHO WAS PHONE!?!?
        } else {
          toast.error(`Invalid workflow file.`);
        }
      });
    },
    [count, onLoadWorkflow]
  );

  useEffect(() => {
    try {
      const workflows = retrieveLocalWorkflows();
      if (Array.isArray(workflows)) {
        setLocalWorkflowList(workflows.sort((a, b) => b.time - a.time));
      } else {
        console.error("Invalid local workflow data.");
      }
    } catch (error) {
      console.error("Error retrieving local workflows:", error);
    }
  }, [count]);

  const renderList = useCallback(
    (item: LocalPersistedGraphs, index: number) => (
      <WorkflowItem
        item={item}
        index={index}
        handleLoad={handleLoad}
        handleUpdate={handleUpdate}
        handleDelete={handleDelete}
        handleRename={handleRename}
      />
    ),
    [handleDelete, handleLoad, handleRename, handleUpdate]
  );

  return (
    <div className="flex flex-col gap-4 overflow-auto">
      <Button className="bg-border hover:bg-accent-foreground text-accent-foreground hover:text-background mt-3 mx-5" onClick={handleSave}>Save</Button>
      <Dropzone onUpload={handleUpload} />
      <div>
        <Label className="text-neutral-500">Local Workflows</Label>
        {localWorkflowList?.map((item, index) => (
          <li
            key={item.id}
            className="list-none"
          >
            <WorkflowItem
              item={item}
              index={index}
              handleLoad={handleLoad}
              handleUpdate={handleUpdate}
              handleDelete={handleDelete}
              handleRename={handleRename}
            />
          </li>
        ))}
      </div>
    </div>
  );
};

const WorkflowPage = React.memo(WorkflowPageComponent);

export { WorkflowPage };
