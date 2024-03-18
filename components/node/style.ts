import { Position } from "reactflow";
import styled, { css } from "styled-components";

export const GroupCard = styled.div<{ active: 1 | 0; title?: React.ReactNode }>`
  min-width: 80px;
  height: 100%;
  min-height: 120px;

  ${({ active, theme }) =>
    active
      ? css`
          outline: 2px solid ${theme.colorPrimary};
        `
      : ""};
  .react-flow__resize-control {
    pointer-events: all !important;
  }
`;

export const Slot = styled.div<{ isRequired: 1 | 0; position: Position }>`
  text-align: ${({ position }) => position};
  .react-flow__handle {
    top: unset;
    margin-top: 10px;
  }
`;
