import type { LocalPersistedGraphs, PersistedGraph } from "@/types";
import { writeWorkflowToFile } from "@/utils";
import React, { useCallback, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { CommitIcon, Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";
import { Calculator, Clock, DownloadIcon, SaveIcon } from "lucide-react";
import { Badge } from "../ui/badge";
import { Avatar } from "../ui/avatar";

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
    setShowRename(true);
  }, []);

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
      return <Input defaultValue={item.title} onBlur={handleRenameDone} />;
    } else {
      return (
        <a title="Load" onClick={handleLoadClick}>
          {item.title}
          {index === 0 && (
            <Badge color="blue" style={{ marginLeft: 4 }}>
              Recent
            </Badge>
          )}
        </a>
      );
    }
  }, [showRename, item.title, index, handleRenameDone, handleLoadClick]);

  return (
    <ul className="list-none p-0 m-0">
      <li key={item.id} className="border-b border-gray-200 last:border-b-0">
        <div className="flex justify-between">
          <div>
            <a
              title="Load"
              onClick={handleLoadClick}
              className="flex items-center space-x-2"
            >
              <Avatar className="inline-block">
                {item.title[0].toUpperCase()}
              </Avatar>
              <span>{renderTitle()}</span>
            </a>
            <div className="text-sm text-gray-600">
              <div className="flex space-x-4">
                <div className="flex items-center space-x-2">
                  <Calculator />
                  <span>{Object.keys(item.graph.data).length}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CommitIcon />
                  <span>{item.graph.connections.length}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock />
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
          <div className="flex space-x-2">
            <Button onClick={handleEditClick}>
              <Pencil1Icon />
            </Button>
            <Button onClick={handleUpdateClick}>
              <SaveIcon />
            </Button>
            <Button onClick={handleDownloadClick}>
              <DownloadIcon />
            </Button>
            <Button onClick={handleDeleteClick}>
              <TrashIcon />
            </Button>
          </div>
        </div>
      </li>
    </ul>
  );
};

export default React.memo(WorkflowItem);
