import React, { useCallback, useState } from "react";
import type { LocalPersistedGraphs, PersistedGraph } from "@/types";
import { MaskOffIcon, ClockIcon, Cross1Icon, DownloadIcon, InputIcon, Link2Icon, Pencil2Icon } from "@radix-ui/react-icons";
import { writeWorkflowToFile } from "@/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

interface WorkflowItemProps {
  item: LocalPersistedGraphs;
  index: number;
  handleRename: (id: string, title: string) => void;
  handleUpdate: (id: string, title: string) => void;
  handleDelete: (id: string, title: string) => void;
  handleLoad: (graph: PersistedGraph, title: string) => void;
}

const WorkflowItem: React.FC<WorkflowItemProps> = ({
  item,
  index,
  handleRename,
  handleUpdate,
  handleDelete,
  handleLoad,
}) => {
  const [showRename, setShowRename] = useState(false);

  const handleRenameDone = useCallback(
    (e: any) => {
      setShowRename(false);
      const newTitle = e.target.value;
      if (newTitle) handleRename(item.id, newTitle);
    },
    [handleRename, item.id]
  );

  const handleLoadClick = useCallback(() => {
    handleLoad(item.graph, item.title);
  }, [handleLoad, item.graph, item.title]);

  const handleEditClick = useCallback(() => {
    setShowRename(!showRename);
  }, [showRename]);

  const handleUpdateClick = useCallback(() => {
    handleUpdate(item.id, item.title);
  }, [handleUpdate, item.id, item.title]);

  const handleDownloadClick = useCallback(() => {
    writeWorkflowToFile(item.graph, item.title);
  }, [item.graph, item.title]);

  const handleDeleteClick = useCallback(() => {
    handleDelete(item.id, item.title);
  }, [handleDelete, item.id, item.title]);

  const renderTitle = useCallback(() => {
    if (showRename) {
      return <Input defaultValue={item.title}
        className="text-accent-foreground"
        autoFocus={true}
        onBlur={handleRenameDone} 
        onKeyDown={e => ["Enter"].includes(e.key) && (e.target as HTMLElement).blur()} 
      />;
    } else {
      return (
        <Tooltip>
            <TooltipTrigger asChild>
        <a className="flex overflow-hidden w-full" title="Load" onClick={handleLoadClick}>
          {item.title}
        </a>
        </TooltipTrigger>
        <TooltipContent>Load</TooltipContent>
       </Tooltip>
      );
    }
  }, [showRename, item.title, index, handleRenameDone, handleLoadClick]);

  return (
    <TooltipProvider delayDuration={0}>
      <ul className="list-none p-0 m-0">
        <li key={item.id} className="last:border-b-0">
          <div className="flex flex-col justify-between overflow-hidden">
            <div className="flex justify-between">
                <div className="text-muted-foreground w-full overflow-hidden hover:text-secondary h-7 m-1 p-1 flex items-center cursor-default [&>span]:line-clamp-1" title="Load Workflow" style={{borderRadius: '5px'}}>
                    <span
                      title="Load"
                      className="flex items-center space-x-3 my-4 p-1 text-sm overflow-hidden w-full hover:bg-foreground whitespace-nowrap"
                      style={{borderRadius: '5px'}}
                    >{renderTitle()}</span>
              </div>
              <div className="flex justify-end items-center">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button className="bg-transparent text-accent-foreground hover:bg-primary hover:text-black p-2 m-0"  size="narrow" onClick={handleEditClick}>
                      <InputIcon />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Rename workflow</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button className="bg-transparent text-accent-foreground hover:bg-primary hover:text-black p-2 m-0"  size="narrow"  onClick={handleUpdateClick}>
                      <Pencil2Icon />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Overwrite with current</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button className="bg-transparent text-accent-foreground hover:bg-primary hover:text-black p-2 m-0" size="narrow"  onClick={handleDownloadClick}>
                      <DownloadIcon />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Download to disk</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button className="bg-transparent text-accent-foreground hover:bg-primary hover:text-black p-2 m-0" size="narrow" onClick={handleDeleteClick}>
                      <Cross1Icon />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Delete workflow</TooltipContent>
                </Tooltip>
              </div>
            </div>
            <div className="text-sm text-gray-600">
                <div className="flex space-x-4">
                  <div className="flex items-center space-x-2">
                    <MaskOffIcon />
                    <span>{Object.keys(item.graph.data).length}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Link2Icon />
                    <span>{item.graph.connections.length}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <ClockIcon />
                    <span>
                      {(() => {
                        const date = new Date(item.time);
                        const formattedDate =
                          date.getFullYear() +
                          "-" +
                          ("0" + (date.getMonth() + 1)).slice(-2) +
                          "-" +
                          ("0" + date.getDate()).slice(-2) +
                          " " +
                          ("0" + date.getHours()).slice(-2) +
                          ":" +
                          ("0" + date.getMinutes()).slice(-2) +
                          ":" +
                          ("0" + date.getSeconds()).slice(-2);
                        return formattedDate;
                      })()}
                    </span>
                  </div>
                </div>
              </div>
          </div>
        </li>
      </ul>
    </TooltipProvider>
  );
};

export default React.memo(WorkflowItem);
