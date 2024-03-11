import { Flow } from "./output";

/**
 * Number type parameter properties
 * @property default - Default value
 * @property min - Minimum value
 * @property max - Maximum value
 * @property randomizable - Whether it can be randomized
 */
export interface NumberProps<A> {
  default?: A;
  min?: A;
  max?: A;
  randomizable?: boolean;
}

/**
 * String type parameter properties
 * @property multiline - Whether multiline input is supported
 * @property dynamic_prompt - Whether dynamic prompts are supported
 */
export interface StringProps {
  multiline?: boolean;
  dynamic_prompt?: boolean;
}

/**
 * Boolean type parameter properties
 * @property default - Default value
 */
export interface BoolProps {
  default?: boolean;
}

/**
 * Parameter type
 * @typeparam K - Parameter type key
 */
export type Parameter<K extends keyof InputType> = [K, InputType[K][1]];

/**
 * Input type
 */
export interface InputType {
  BOOL: [boolean, BoolProps];
  INT: [number, NumberProps<number>];
  FLOAT: [number, NumberProps<number>];
  STRING: [string, StringProps];
}

/**
 * Input data type: Parameter, array of strings, or Flow object
 * @typeparam K - Parameter type key
 */
export type InputData = Parameter<keyof InputType> | [string[]] | [Flow];
