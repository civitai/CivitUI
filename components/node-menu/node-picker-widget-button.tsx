import React, { useCallback } from 'react';
import { startCase } from "lodash-es";

import { NodeItem, Widget } from "@/types";
import { cn } from "@/lib/utils";

type NodePickerWidgetButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    w: Widget;
    onAddNode: (nodeItem: NodeItem) => void;
    setActiveItem: (nodeItem: Widget | null) => void;
};

export const NodePickerWidgetButton: React.FC<NodePickerWidgetButtonProps> = ({ w, onAddNode, setActiveItem, ...props }) => {
    const handleDrag = useCallback(
        (event: React.DragEvent<HTMLButtonElement>, i: Widget) => {
          event.dataTransfer.setData("application/reactflow", JSON.stringify(w));
          event.dataTransfer.effectAllowed = "move";
        }, []
    );

    const handleMouseEnter = () => {
        setActiveItem(w);
    };
    
    const handleMouseLeave = () => {
        setActiveItem(null);
    };

    return (
        <button
            className={cn(
                "cursor-click shadow-sm -mt-px w-full text-left text-accent-foreground hover:text-muted-foreground",
                "relative z-0 hover:z-50 px-1 py-0.7 rounded transition duration-75 border-x border-background hover:border-white bg-background text-xs"
            )}
            onClick={(e) => {
                e.preventDefault();
                onAddNode({ widget: w });
            }}
            draggable
            onDragStart={(event) => handleDrag(event, w)}
            onMouseEnter={() => handleMouseEnter()}
            onMouseLeave={handleMouseLeave}
            {...props}
        >
            {startCase(w.name)}
        </button>
    );
};