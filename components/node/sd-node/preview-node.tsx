import { type Widget } from "@/types";
import { checkInput } from "@/utils";
import { startCase } from "lodash-es";
import React, { useCallback, useMemo } from "react";
import styled from "styled-components";
import { NodeCard } from "../style";

/******************************************************
 *********************** Style *************************
 ******************************************************/

const Slot = styled.div<{ isRequired: 1 | 0 }>`
  margin-top: 6px;
  background: ${({ isRequired, theme }) =>
    isRequired ? theme.colorPrimary : theme.colorBorder};
`;

/******************************************************
 ************************* Dom *************************
 ******************************************************/

/**
 * @title Preview Node Parameters
 */
interface PreviewNodeProps {
  /**
   * @title Widget Data
   */
  data: Widget;
}
const PreviewNode: React.FC<PreviewNodeProps> = ({ data }) => {
  const outputs = useMemo(
    () => data.output.map((o) => ({ name: o, type: o })),
    [data.output]
  );
  const [params, inputs] = useMemo(() => {
    const params: any[] = [];
    const inputs: any[] = [];

    Object.entries(data.input.required).forEach(([property, input]) => {
      if (checkInput.isParameterOrList(input)) {
        params.push({ name: property, type: input[0], input });
      } else {
        inputs.push({ name: property, type: input[0] });
      }
    });

    return [params, inputs];
  }, [data.input.required]);

  const RenderInput = useCallback(
    ({
      item,
      position,
      isRequired,
    }: {
      item: any;
      position: "left" | "right";
      isRequired: 1 | 0;
    }) => (
      <h5>
        <Slot
          className="react-flow__handle"
          style={{ [position]: -3 }}
          isRequired={isRequired}
        />
        {startCase(item.name)}
      </h5>
    ),
    []
  );

  return (
    <NodeCard title={data.name} active={0} style={{ minWidth: 240 }}>
      <div className="flex w-full items-stretch justify-stretch space-x-6">
        <div className="flex-1">
          {inputs.map((item, index) => (
            <RenderInput
              key={index}
              item={item}
              position="left"
              isRequired={1}
            />
          ))}
        </div>
        <div className="flex-1 text-right">
          {outputs.map((item, index) => (
            <RenderInput
              key={index}
              item={item}
              position="right"
              isRequired={1}
            />
          ))}
        </div>
      </div>
      <div className="flex-1">
        {params.map((item, index) => (
          <RenderInput key={index} item={item} position="left" isRequired={0} />
        ))}
      </div>
    </NodeCard>
  );
};

export default React.memo(PreviewNode);
