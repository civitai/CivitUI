import { useAppStore } from "@/store";
import React, { useCallback, useEffect, useState } from "react";
import { useShallow } from "zustand/react/shallow";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface SelectUploadInputProps {
  value: string;
  input: any[][];
  onChange: (val: any) => void;
  name: string;
}

const SelectUploadInput: React.FC<SelectUploadInputProps> = ({
  value,
  input,
  onChange,
  name,
}) => {
  const [options, setOptions] = useState<any[]>([]);
  const { onRefresh, widgets } = useAppStore(
    useShallow((state) => ({
      onRefresh: state.onRefresh,
      widgets: state.widgets,
    }))
  );

  useEffect(() => {
    const { LoadImage } = widgets;
    const data: any =
      name === "image" ? LoadImage?.input?.required?.image?.[0] : input?.[0];
    const flatData =
      data
        ?.filter((o: string) => !o.includes("\\"))
        .map((o: string) => ({ value: o, label: o })) ?? [];
    const groupedData =
      data
        ?.filter((o: string) => o.includes("\\"))
        .reduce((acc: any, o: string) => {
          const [group, label] = o.split("\\");
          if (!acc[group]) acc[group] = [];
          acc[group].push({ value: o, label });
          return acc;
        }, {}) ?? {};
    const newOptions = [
      ...flatData,
      ...Object.entries(groupedData).map(([key, value]) => ({
        label: key,
        options: value,
      })),
    ];
    setOptions(newOptions);
  }, [input, name, widgets]);

  const handleUploadChange = useCallback(
    (info: any) => {
      if (info.file.status === "done") onRefresh();
      const name = info.file.response?.name;
      if (name) onChange(name);
    },
    [onChange, onRefresh]
  );

  return (
    <>
      {name === "image" && <Button>Upload</Button>}
      <Select>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select" />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value}
              onSelect={() => onChange(option.value)}
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  );
};

export default React.memo(SelectUploadInput);
