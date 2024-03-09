import { InputData, Parameter } from "@/types";
import { isArray } from "lodash-es";

// Function for checking input parameters
class CheckInputClass {
  /**
   * Determines if the input parameter is of boolean type
   * @param i - Input parameter
   * @returns True if the input parameter is of boolean type, otherwise false
   */
  isBool(i: InputData): i is Parameter<"BOOL"> {
    if (!isArray(i)) return false;
    return i[0] === "BOOL";
  }

  /**
   * Determines if the input parameter is of integer type
   * @param i - Input parameter
   * @returns True if the input parameter is of integer type, otherwise false
   */
  isInt(i: InputData): i is Parameter<"INT"> {
    if (!isArray(i)) return false;
    return i[0] === "INT";
  }

  /**
   * Determines if the input parameter is of floating-point number type
   * @param i - Input parameter
   * @returns True if the input parameter is of floating-point number type, otherwise false
   */
  isFloat(i: InputData): i is Parameter<"FLOAT"> {
    if (!isArray(i)) return false;
    return i[0] === "FLOAT";
  }

  /**
   * Determines if the input parameter is of string type
   * @param i - Input parameter
   * @returns True if the input parameter is of string type, otherwise false
   */
  isString(i: InputData): i is Parameter<"STRING"> {
    if (!isArray(i)) return false;
    return i[0] === "STRING";
  }

  /**
   * Determines if the input parameter is of list type
   * @param i - Input parameter
   * @returns True if the input parameter is of list type, otherwise false
   */
  isList(i: InputData): i is [string[]] {
    if (!isArray(i)) return false;
    return Array.isArray(i[0]);
  }

  /**
   * Determines if the input parameter is of parameter or list type
   * @param i - Input parameter
   * @returns True if the input parameter is of parameter or list type, otherwise false
   */
  isParameterOrList(i: InputData): boolean {
    if (!isArray(i)) return false;
    return (
      this.isBool(i) ||
      this.isInt(i) ||
      this.isFloat(i) ||
      this.isString(i) ||
      this.isList(i)
    );
  }
}

/**
 * Instance for checking input parameters
 */
export const checkInput = new CheckInputClass();
