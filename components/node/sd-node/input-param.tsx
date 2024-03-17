import { useAppStore } from "@/store";
import { InputData, NodeId } from "@/types";
import { checkInput } from "@/utils";
import { Checkbox } from "@/components/ui/checkbox";
import { debounce } from "lodash-es";
import React, { useMemo } from "react";
import { useShallow } from "zustand/react/shallow";
import SelectUploadInput from "./select-upload-input";
import SliderInput from "./slider-input";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ModelDialog } from "../model-dialog";

interface InputParamProps {
  id: NodeId;
  name: string;
  input: InputData;
}

const InputParam = ({ id, name, input }: InputParamProps) => {
  const graph = useAppStore(useShallow((state) => state.graph));
  const onPropChange = useAppStore(useShallow((state) => state.onPropChange));

  const node = graph[id].node;
  const fieldName = `field${Object.keys(node?.fields || {}).length}`;
  const value = node?.fields[fieldName];

  const onChange = useMemo(
    () =>
      debounce((val: any) => {
        const newValue = val?.target?.value ? val.target.value : val;
        onPropChange(id, name, newValue);
      }, 100),
    [id, name, onPropChange]
  );

  if (checkInput.isList(input)) {
    if (name === "ckpt_name") {
      return <ModelDialog />;
    }

    return (
      <SelectUploadInput
        value={value}
        name={name}
        input={input}
        onChange={onChange}
      />
    );
  }

  if (checkInput.isBool(input)) {
    return (
      <Checkbox
        value={value}
        defaultChecked={input[1].default}
        onChange={onChange}
        className="nodrag"
      />
    );
  }

  if (checkInput.isInt(input)) {
    return (
      <SliderInput
        name={name.toLowerCase()}
        style={{ width: "100%" }}
        value={Number(value !== null ? value : input[1].default)}
        max={Number(input[1].max)}
        min={Number(input[1].min)}
        onChange={(val) =>
          onChange(Number(val?.target?.value ? val.target.value : val))
        }
      />
    );
  }

  if (checkInput.isFloat(input)) {
    return (
      <SliderInput
        name={name.toLowerCase()}
        style={{ width: "100%" }}
        step={0.01}
        value={Number(value !== null ? value : input[1].default)}
        max={Number(input[1].max)}
        min={Number(input[1].min)}
        onChange={(val) =>
          onChange(Number(val?.target?.value ? val.target.value : val))
        }
      />
    );
  }

  if (checkInput.isString(input)) {
    const args = input[1];
    if (args.multiline === true) {
      return (
        <Textarea
          style={{ height: 128, width: "100%" }}
          defaultValue={value}
          onBlur={onChange}
          className="nodrag"
        />
      );
    }
    return (
      <Input className="nodrag w-full" value={value} onChange={onChange} />
    );
  }

  return null;
};

export default React.memo(InputParam);
