import { PropertyKey, SDNode, Widget } from "@/types";
import { checkInput } from "./input";
/**
 * Get default node data
 * @param widget - Widget information
 * @returns Node data
 */
export const getDefaultFields = (widget: Widget): Record<PropertyKey, any> => {
  const fields: Record<PropertyKey, any> = {};
  Object.entries(widget.input.required).forEach(([key, input]) => {
    if (checkInput.isBool(input)) {
      fields[key] = input[1].default ?? false;
    } else if (checkInput.isFloat(input)) {
      fields[key] = input[1].default ?? 0.0;
    } else if (checkInput.isInt(input)) {
      fields[key] = input[1].default ?? 0;
    } else if (checkInput.isString(input)) {
      fields[key] = "";
    } else if (checkInput.isList(input)) {
      fields[key] = input[0][0];
    }
  });
  return fields;
};

/**
 * Generate node data based on widget information
 * @param widget - Widget information
 * @returns Node data
 */
export const fromWidget = (widget: Widget): SDNode => ({
  widget: widget.name,
  fields: getDefaultFields(widget),
});
