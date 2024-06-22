import { useAppStore } from "@/store";
import { Connection } from "reactflow";
import { isArray, startCase } from "lodash-es";
import React, { useCallback } from "react";
import { Handle, HandleType, Position } from "reactflow";
import { useShallow } from "zustand/react/shallow";
import { Slot } from "../style";

interface NodeHandleProps {
  label: string;
  type: HandleType;
  position: Position;
  slotType?: string;
  isRequired?: boolean;
}

const NodeHandle = ({
  label,
  type,
  position,
  slotType,
  isRequired,
}: NodeHandleProps) => {
  const nodes = useAppStore(useShallow((state) => state.nodes));

  const handleValidCheck = useCallback(
    (connection: Connection) => {
      if (connection.targetHandle === "*" || connection.sourceHandle === "*")
        return true;
      try {
        let targetType = nodes.find((n) => n.id === connection.target)?.data
          .input.required[String(connection.targetHandle)][0];
        if (isArray(targetType)) targetType = "STRING";
        const sourceType = connection.sourceHandle;
        return targetType === sourceType;
      } catch {
        return true;
      }
    },
    [nodes]
  );

  const positionStyles = {
    left: position === Position.Left ? "-6.5px" : "auto",
    right: position === Position.Right ? "-6.5px" : "auto",
    transform: "translate(0, -30%)",
  };

  return (
    <>
      <Slot position={position} isRequired={isRequired ? 1 : 0}>
        {isRequired ? (
          <Handle
            id={label}
            type={type}
            position={position}
            isValidConnection={handleValidCheck}
            style={{
              width: "12px",
              height: "12px",
              boxShadow: "0px 0px 12px rgba(72, 66, 66, 0.4)",
              ...positionStyles,
            }}
          />
        ) : null}
        <h5
          className="mb-1"
          title={Array.isArray(slotType) ? "STRING" : slotType}
        >
          {startCase(label.toLowerCase?.())}
        </h5>
      </Slot>
    </>
  );
};

export default NodeHandle;
