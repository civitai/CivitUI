import { Input } from "@/components/ui/input";
import { useAppStore } from "@/store";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import React, {
  CSSProperties,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useShallow } from "zustand/react/shallow";

interface SliderInputProps {
  name: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  style?: CSSProperties;
  onChange: (val: any) => void;
}

const SliderInput: React.FC<SliderInputProps> = ({
  name,
  value,
  min,
  max,
  step,
  style,
  onChange,
}) => {
  const { counter } = useAppStore(useShallow((st) => st));
  const [inputValue, setInputValue] = useState<number>(value);
  const [isRandom, setIsRandom] = useState<boolean>(false);
  const isSeed = name === "seed";

  const { iMax, iMin, iStep } = useMemo(() => {
    let computedMax = max;
    let computedMin = min;
    let computedStep = step ?? 1;
    switch (name) {
      case "steps":
        computedMax = 200;
        break;
      case "cfg":
        computedMax = 32;
        computedStep = 0.5;
        break;
      case "width":
      case "height":
        computedMax = 4096;
        computedMin = 512;
        computedStep = 4;
        break;
      default:
        break;
    }
    return { iMax: computedMax, iMin: computedMin, iStep: computedStep };
  }, [name, max, min, step]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement> | any) => {
      e.stopPropagation();

      const newValue = e.target.value;
      const val = Number(newValue);
      if (!isNaN(val)) {
        setInputValue(val);
        onChange(val);
      }
    },
    [onChange]
  );

  const handleCheckboxChange = useCallback((e: any) => {
    setIsRandom(e.target.checked);
    console.log(e.target.checked);
  }, []);

  useEffect(() => {
    if (!isSeed || !isRandom) return;
    handleChange(Math.floor(Math.random() * iMax));
  }, [counter, iMax]);

  return (
    <div style={style} className="flex gap-3">
      <div
        className={`flex items-center justify-start mr-3 ${
          isSeed ? "flex-[12]" : "flex-[4]"
        } w-full`}
      >
        <Input
          type="number"
          min={iMin}
          max={iMax}
          step={iStep}
          value={Number(inputValue)}
          onChange={(e) => handleChange(e)}
          onBlur={(e) => handleChange(e)}
          className="nodrag min-w-[100px]"
        />
      </div>
      <div
        className={`flex items-center justify-start ${
          isSeed ? "mr-3 flex-[4]" : "flex-[12]"
        } w-full`}
        style={{ marginRight: "12px" }}
      >
        {isSeed ? (
          <div className="flex space-x-2">
            <Checkbox checked={isRandom} onChange={handleCheckboxChange} />
            <label
              htmlFor="random"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Random
            </label>
          </div>
        ) : (
          <Slider
            min={iMin}
            max={iMax}
            onChange={handleChange}
            value={[Number(inputValue)]}
            step={iStep}
            className="nodrag"
          />
        )}
      </div>
    </div>
  );
};

export default React.memo(SliderInput);
