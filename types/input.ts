import { Flow } from "./output";

export interface NumberProps<A> {
  default?: A;
  min?: A;
  max?: A;
  randomizable?: boolean;
}

export interface StringProps {
  multiline?: boolean;
  dynamic_prompt?: boolean;
}

export interface BoolProps {
  default?: boolean;
}

export type Parameter<K extends keyof InputType> = [K, InputType[K][1]];

export interface InputType {
  BOOL: [boolean, BoolProps];
  INT: [number, NumberProps<number>];
  FLOAT: [number, NumberProps<number>];
  STRING: [string, StringProps];
}

export type InputData = Parameter<keyof InputType> | [string[]] | [Flow];
