/**
 * A potentially recursive object with a fixed value.
 */
export type ValueOrNestedObject<T> = {
  [key: string]: T | ValueOrNestedObject<T>;
};
