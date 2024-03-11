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
import {
  DownloadIcon,
  FileIcon,
  UploadIcon,
  PlusIcon,
} from "@radix-ui/react-icons";
import React, { useCallback, useEffect, useState } from "react";
import { shallow } from "zustand/shallow";
import WorkflowItem from "./workflow-item";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { toast } from "sonner";
import Dropzone from "../dropzone";

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
  } = useAppStore((st) => st, shallow);

  /**
   * @title Save local workflow
   * @param title - Workflow title
   * @returns void
   */
  const handleSave = useCallback(() => {
    onSaveLocalWorkFlow(title);
    setCount(count + 1);
    toast.success(`Success! ${title ?? "Your workflow"} have been saved.`);
  }, [count, onSaveLocalWorkFlow, title]);

  /**
   * @title Delete local workflow
   * @param id - Workflow ID
   * @param name - Workflow name
   * @returns void
   */
  const handleDelete = useCallback(
    (id: string, name: string) => {
      deleteLocalWorkflowFromId(id);
      setCount(count + 1);
      toast.info(`${name} has been deleted.`);
    },
    [count]
  );

  /**
   * @title Load workflow
   * @param graph - Workflow graph data
   * @param name - Workflow name
   * @returns void
   */
  const handleLoad = useCallback(
    (graph: PersistedGraph, name: string) => {
      if (graph) {
        onLoadWorkflow(graph);
        setCount(count + 1);
        toast.success(`Success! ${name} have been loaded.`);
      } else {
        toast.error(`Error! Invalid workflow data.`);
      }
    },
    [count, onLoadWorkflow]
  );

  /**
   * @title Upload workflow file
   * @param file - Workflow file
   * @returns void
   */
  const handleUpload = useCallback(
    (file: File) => {
      readWorkflowFromFile(file, (workflow) => {
        if (workflow) {
          onLoadWorkflow(workflow);
          setCount(count + 1);
          toast.success(`Success! the workflow have been loaded.`);
        } else {
          toast.error(`Error! Invalid workflow file.`);
        }
      });
    },
    [count, onLoadWorkflow]
  );

  /**
   * @title Update local workflow graph data
   * @param id - Workflow ID
   * @param name - Workflow name
   * @returns void
   */
  const handleUpdate = useCallback(
    (id: string, name: string) => {
      onUpdateLocalWorkFlowGraph(id);
      setCount(count + 1);
      toast.success(`Success! ${name} have been update.`);
    },
    [count, onUpdateLocalWorkFlowGraph]
  );

  /**
   * @title Rename local workflow
   * @param id - Workflow ID
   * @param name - New workflow name
   * @returns void
   */
  const handleRename = useCallback(
    (id: string, name: string) => {
      onUpdateLocalWorkFlowTitle(id, name);
      setCount(count + 1);
      toast.success(`Success! the workflow have been renamed to ${name} .`);
    },
    [count, onUpdateLocalWorkFlowTitle]
  );

  /**
   * @title Load default workflow
   * @returns void
   */
  const handleNew = useCallback(() => {
    cleanTempWorkflow();
    onLoadWorkflow(defaultWorkflow);
    setCount(count + 1);
    toast.success(`Success! load default workflow.`);
  }, [count, onLoadWorkflow]);

  useEffect(() => {
    try {
      const workflows = retrieveLocalWorkflows();
      if (Array.isArray(workflows)) {
        setLocalWorkflowList(workflows.sort((a, b) => b.time - a.time));
      } else {
        console.error("Invalid local workflows data");
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
    <div className="flex flex-col gap-4">
      <Dropzone />
      <div>
        <h5>Local Workflows</h5>
        {localWorkflowList?.map((item, index) => (
          <li
            key={item.id}
            className="border-b border-gray-200 last:border-b-0"
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

export default React.memo(WorkflowPageComponent);
