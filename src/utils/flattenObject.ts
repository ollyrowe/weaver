import type { ValueOrNestedObject } from "../misc/types";

/**
 * Converts a nested object containing string values into a flat
 * object with keys that indicate the full path of the associated value.
 *
 * Example:
 *
 * const input = {
 *    prop1: {
 *      prop2: 'value'
 *    }
 * }
 *
 * Would result in the following object:
 *
 * const result = {
 *    "prop1.prop2": "value"
 * }
 *
 * @param object - the potentially recursive object
 * @param delimiter - the value used to separate the elements of the path
 * @returns a flattened object
 */
export const flattenObject = (
  object: ValueOrNestedObject<string>,
  delimiter = "."
) => {
  const flattenedObject: { [key: string]: string } = {};

  // Iterate through the keys in the object
  Object.keys(object).forEach((key) => {
    // The value associated with the key
    const value = object[key];

    // If the value is a string
    if (typeof value === "string") {
      // Add the key value pair to the flattened object
      flattenedObject[key] = value;
    } else {
      // Flatten the nested object
      const flattenedNestedObject = flattenObject(value, delimiter);

      // Iterate through the keys in the flattened nested object
      Object.keys(flattenedNestedObject).forEach((subVarKey) => {
        // Add the full path to the flattened object
        flattenedObject[key + delimiter + subVarKey] =
          flattenedNestedObject[subVarKey];
      });
    }
  });

  return flattenedObject;
};
