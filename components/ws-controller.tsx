"use client";

import config from "@/app/config";
import { useAppStore } from "@/store";
import { useShallow } from "zustand/react/shallow";
import { MessageType } from "@/types";
import React, { useCallback } from "react";
import { useWebSocket } from "react-use-websocket/dist/lib/use-websocket";

const WS_HOST = `ws://${config.host}/ws`;
console.log("WS_HOST", WS_HOST);

const WsControllerComponent = () => {
  const {
    clientId,
    onNewClientId,
    onQueueUpdate,
    onNodeInProgress,
    onImageSave,
  } = useAppStore(
    useShallow((st) => ({
      clientId: st.clientId,
      onNewClientId: st.onNewClientId,
      onQueueUpdate: st.onQueueUpdate,
      onNodeInProgress: st.onNodeInProgress,
      onImageSave: st.onImageSave,
    }))
  );

  const nodeIdInProgress = useAppStore((state) => state.nodeInProgress?.id);

  // Handle WebSocket messages
  const handleWebSocketMessage = useCallback(
    (ev: MessageEvent) => {
      const msg = JSON.parse(ev.data);
      console.log("Received WebSocket message:", msg);

      if (process.env.NODE_ENV === "development") console.log("[webpack]", msg);

      // Handle different types of messages
      const messageHandlers = {
        // Status message
        status: () => {
          if (msg.data.sid !== undefined && msg.data.sid !== clientId) {
            onNewClientId(msg.data.sid);
          }
          void onQueueUpdate();
        },

        // Executing message
        executing: () => {
          if (msg.data.node !== undefined) {
            onNodeInProgress(msg.data.node, 0);
          } else if (nodeIdInProgress !== undefined) {
            onNodeInProgress(nodeIdInProgress, 0);
          }
        },

        // Progress message
        progress: () => {
          if (nodeIdInProgress !== undefined) {
            onNodeInProgress(nodeIdInProgress, msg.data.value / msg.data.max);
          }
        },

        // Executed message
        executed: () => {
          const images = msg.data.output.images;
          if (Array.isArray(images)) {
            onImageSave(msg.data.node, images);
          }
        },
      };

      const messageType = msg.type as keyof MessageType;
      const messageHandler = messageHandlers[messageType];
      if (messageHandler) messageHandler();
    },
    [
      clientId,
      nodeIdInProgress,
      onNewClientId,
      onQueueUpdate,
      onNodeInProgress,
      onImageSave,
    ]
  );

  // Use WebSocket hook to connect to WebSocket server
  useWebSocket(WS_HOST, {
    onOpen: () => {
      console.log("WebSocket connection established");
    },
    onMessage: handleWebSocketMessage,
  });

  return null;
};

export const WsController = React.memo(WsControllerComponent);
