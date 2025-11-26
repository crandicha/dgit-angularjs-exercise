import {
  VALID_ACN_LENGTH,
  VALID_ACN_NUMBER_EXAMPLE,
  VALID_ACN_WHITESPACE_PATTERN,
} from "../../config/ACN";

/**
 * Check if the input is a valid ACN number (9 digits, allow whitespace every 3 digit)
 * @param {string} acn
 * @returns {boolean}
 */
export const isValidACNInput = (acn) => {
  let internalValue = acn;

  if (internalValue.includes(" "))
    return !!internalValue.match(VALID_ACN_WHITESPACE_PATTERN);

  if (internalValue.length !== VALID_ACN_LENGTH) return false;

  if (internalValue.split("").some((digit) => isNaN(digit))) return false;

  return true;
};

/**
 * Check if the input is a valid ACN number, calculated all numbers in front is the same as the last number
 * @param {*} acn
 * @returns
 */
export const isValidACNNumber = (acn) => {
  if (!isValidACNInput(acn)) return false;

  const numbers = acn.replaceAll(" ", "").split("").map(Number);
  const lastNumber = numbers[VALID_ACN_LENGTH - 1];
  const otherNumbers = numbers.slice(0, VALID_ACN_LENGTH - 1);
  const maxWeight = VALID_ACN_LENGTH - 1;

  const numberSum = otherNumbers.reduce((acc, curr, index) => {
    return acc + curr * (maxWeight - index);
  }, 0);
  const remainder = numberSum % 10;
  const calculatedNumber = (10 - remainder) % 10;

  return calculatedNumber === lastNumber;
};
