import { SDNodeModify } from "@/types/node";
import { PropertyKey, WidgetKey } from "./base";
import { InputData } from "./input";
import { Flow } from "./output";

/**
 * Widget object
 * @property name - Widget key
 * @property input - Input information
 * @property output - Output information
 * @property output_name - Output name
 * @property category - Category name
 * @property description - Description information
 */
export interface Widget extends SDNodeModify {
  name: WidgetKey;
  input: { 
    required: Record<PropertyKey, InputData>,
    optional?: Record<PropertyKey, InputData>,
  };
  output: Flow[];
  output_name: Flow[];
  category: string;
  description?: string;
}
