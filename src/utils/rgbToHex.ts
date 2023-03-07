/**
 * Converts an RGB value to a hex value.
 *
 * Example rgb(225, 225, 225) -> #ffffff
 *
 * This function assumes that the parameter is a valid RGB value.
 *
 * @param rgb - the RGB value
 * @returns the equivalent hex value
 */
export const rgbToHex = (rgb: string) => {
  // Parse the string to a tuple of numbers
  const components = parseRgbValue(rgb);

  // Convert each number into a base-16 value
  const hexValues = components.map((value) => {
    // Convert the RGB value into hex
    const hex = value.toString(16);

    // Pad the start of the value with a 0 if required
    return hex.padStart(2, "0");
  });

  return "#" + hexValues.join("");
};

/**
 * Validates and parses an RGB value.
 *
 * @param value - the RGB value
 */
const parseRgbValue = (value: string): [number, number, number] => {
  // Remove all whitespace and convert to lowercase
  const sanitisedValue = value.replace(/ /g, "").toLowerCase();

  sanitisedValue.startsWith("rgb(") && sanitisedValue.endsWith(")");

  if (!(sanitisedValue.startsWith("rgb(") && sanitisedValue.endsWith(")"))) {
    throw new InvalidValueError();
  }

  const combinedNumbers = sanitisedValue.replace("rgb(", "").replace(")", "");

  const numbers = combinedNumbers.split(",");

  if (numbers.length !== 3) {
    throw new InvalidValueError();
  }

  const parsedNumbers = numbers.map((number) => {
    const parsedNumber = parseInt(number);

    if (isNaN(parsedNumber)) {
      throw new InvalidValueError();
    }

    return parsedNumber;
  });

  parsedNumbers.forEach((number) => {
    if (number > 255 || number < 0) {
      throw new InvalidValueError();
    }
  });

  const [first, second, third] = parsedNumbers;

  return [first, second, third];
};

export class InvalidValueError extends Error {
  constructor() {
    super("The rgb value provided is invalid");
  }
}
