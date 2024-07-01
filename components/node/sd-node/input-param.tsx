import { useAppStore } from "@/store";
import { InputData, NodeId } from "@/types";
import { checkInput } from "@/utils";
import { Checkbox } from "@/components/ui/checkbox";
import { debounce } from "lodash-es";
import React, { useMemo } from "react";
import { useShallow } from "zustand/react/shallow";
import { SelectUploadInput } from "./select-upload-input";
import { SliderInput } from "./slider-input";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ModelDrawer } from "../model-drawer";

interface InputParamsProps {
  id: NodeId;
  name: string;
  input: InputData;
}

const InputParamsComponent = ({ id, name, input }: InputParamsProps) => {
  const { graph, onPropChange } = useAppStore(
    useShallow((state) => ({
      graph: state.graph,
      onPropChange: state.onPropChange,
    }))
  );

  const value = graph[id]?.fields[name];
  const onChange = useMemo(
    () =>
      debounce((val: any) => {
        const newValue = val?.target?.value ? val.target.value : val;
        onPropChange(id, name, newValue);
      }, 100),
    [id, name, onPropChange]
  );

  if (checkInput.isList(input)) {
    if (name === "ckpt_name" || name === "lora_name") {
      return <ModelDrawer 
        value={value}
        models={input.flat()} 
        type={name} 
        onChange={onChange} 
      />;
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

  if (checkInput.isList(input)) {
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
          onKeyDown={(e) => e.stopPropagation()}
        />
      );
    }
    return (
      <Input
        style={{ width: "100%" }}
        value={value}
        onChange={onChange}
        onKeyDown={(e) => e.stopPropagation()}
      />
    );
  }

  return null;
};

export const InputParams = React.memo(InputParamsComponent);
