import { isValidACNInput, isValidACNNumber } from "./index";
import { VALID_ACN_NUMBER_EXAMPLE } from "../../config/ACN";
describe("isValidACNInput", () => {
  describe("with no whitespace", () => {
    it("should return true if the length of valid input is 9, with no whitespace", () => {
      expect(isValidACNInput("123456789")).toBe(true);
    });

    it("should return false if the length of valid input is not 9, with no whitespace", () => {
      expect(isValidACNInput("1234567890")).toBe(false);
    });

    it("should return true if all input is a number", () => {
      expect(isValidACNInput("123456789")).toBe(true);
    });

    it("should return false if all input is not a number", () => {
      expect(isValidACNInput("123456789a")).toBe(false);
    });
  });

  describe("with whitespace", () => {
    it("should return true if the length of valid input is 9, with whitespace", () => {
      expect(isValidACNInput("123 456 789")).toBe(true);
    });

    it("should return false if the length of valid input is not 9, with whitespace", () => {
      expect(isValidACNInput("123 456 7890")).toBe(false);
    });

    it("should return true if all input is a number", () => {
      expect(isValidACNInput("123 456 789")).toBe(true);
    });

    it("should return false if all input is not a number", () => {
      expect(isValidACNInput("123 456 789a")).toBe(false);
    });
  });

  it("should validate all valid ACN numbers", () => {
    VALID_ACN_NUMBER_EXAMPLE.forEach((acn) => {
      expect(isValidACNInput(acn)).toBe(true);
    });
  });
});

describe("isValidACNNumber", () => {
  it("should return true if the input is a valid ACN number", () => {
    expect(isValidACNNumber("000 000 019")).toBe(true);
  });

  it("should validate all valid ACN numbers", () => {
    VALID_ACN_NUMBER_EXAMPLE.forEach((acn) => {
      expect(isValidACNNumber(acn)).toBe(true);
    });
  });
});
