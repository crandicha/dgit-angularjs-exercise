import { VALIDATIONS } from "./index";

describe("VALIDATIONS", () => {
  describe("minLength", () => {
    it("should return false when value is shorter than minimum length", () => {
      const validation = VALIDATIONS.minLength({
        parameters: { minLength: 5 },
      });
      expect(validation.validator("abc")).toBe(false);
    });

    it("should return true when value is equal to minimum length", () => {
      const validation = VALIDATIONS.minLength({
        parameters: { minLength: 5 },
      });
      expect(validation.validator("abcde")).toBe(true);
    });

    it("should return true when value is longer than minimum length", () => {
      const validation = VALIDATIONS.minLength({
        parameters: { minLength: 5 },
      });
      expect(validation.validator("abcdef")).toBe(true);
    });

    it("should ignore spaces when checking length", () => {
      const validation = VALIDATIONS.minLength({
        parameters: { minLength: 9 },
      });
      expect(validation.validator("123 456 789")).toBe(true);
      expect(validation.validator("123 45")).toBe(false);
    });

    it("should use default minLength of 1 when no parameter is provided", () => {
      const validation = VALIDATIONS.minLength();
      expect(validation.validator("")).toBe(false);
      expect(validation.validator("a")).toBe(true);
    });

    it("should have correct error message", () => {
      const validation = VALIDATIONS.minLength({
        parameters: { minLength: 5 },
      });
      expect(validation.message).toBe(
        "Value must be at least 5 characters long"
      );
    });

    it("should use custom message when provided", () => {
      const validation = VALIDATIONS.minLength({
        parameters: { minLength: 5 },
        customMessage: "Custom minimum length error",
      });
      expect(validation.message).toBe("Custom minimum length error");
    });

    it("should still validate correctly with custom message", () => {
      const validation = VALIDATIONS.minLength({
        parameters: { minLength: 5 },
        customMessage: "Too short!",
      });
      expect(validation.validator("abc")).toBe(false);
      expect(validation.validator("abcde")).toBe(true);
    });
  });

  describe("maxLength", () => {
    it("should return true when value is shorter than maximum length", () => {
      const validation = VALIDATIONS.maxLength({
        parameters: { maxLength: 10 },
      });
      expect(validation.validator("abc")).toBe(true);
    });

    it("should return true when value is equal to maximum length", () => {
      const validation = VALIDATIONS.maxLength({
        parameters: { maxLength: 10 },
      });
      expect(validation.validator("abcdefghij")).toBe(true);
    });

    it("should return false when value is longer than maximum length", () => {
      const validation = VALIDATIONS.maxLength({
        parameters: { maxLength: 10 },
      });
      expect(validation.validator("abcdefghijk")).toBe(false);
    });

    it("should ignore spaces when checking length", () => {
      const validation = VALIDATIONS.maxLength({
        parameters: { maxLength: 9 },
      });
      expect(validation.validator("123 456 789")).toBe(true);
      expect(validation.validator("123 456 7890")).toBe(false);
    });

    it("should use default maxLength of 100 when no parameter is provided", () => {
      const validation = VALIDATIONS.maxLength();
      expect(validation.validator("a".repeat(100))).toBe(true);
      expect(validation.validator("a".repeat(101))).toBe(false);
    });

    it("should have correct error message", () => {
      const validation = VALIDATIONS.maxLength({
        parameters: { maxLength: 10 },
      });
      expect(validation.message).toBe(
        "Value must be at most 10 characters long"
      );
    });

    it("should use custom message when provided", () => {
      const validation = VALIDATIONS.maxLength({
        parameters: { maxLength: 10 },
        customMessage: "Custom maximum length error",
      });
      expect(validation.message).toBe("Custom maximum length error");
    });

    it("should still validate correctly with custom message", () => {
      const validation = VALIDATIONS.maxLength({
        parameters: { maxLength: 10 },
        customMessage: "Too long!",
      });
      expect(validation.validator("abcdefghijk")).toBe(false);
      expect(validation.validator("abcdefghij")).toBe(true);
    });
  });

  describe("whitespaceEveryNthCharacter", () => {
    it("should return true when there is no whitespace (any length)", () => {
      const validation = VALIDATIONS.whitespaceEveryNthCharacter({
        parameters: { nthCharacter: 3 },
      });
      expect(validation.validator("123456789")).toBe(true);
      expect(validation.validator("123")).toBe(true);
      expect(validation.validator("12345")).toBe(true);
      expect(validation.validator("1")).toBe(true);
      expect(validation.validator("12345678901234567890")).toBe(true);
    });

    it("should return true when whitespace is correctly placed every 3rd character", () => {
      const validation = VALIDATIONS.whitespaceEveryNthCharacter({
        parameters: { nthCharacter: 3 },
      });
      expect(validation.validator("123 456")).toBe(true);
      expect(validation.validator("123 456 789")).toBe(true);
      expect(validation.validator("123 456 789 012")).toBe(true);
    });

    it("should return false when whitespace is incorrectly placed at wrong positions", () => {
      const validation = VALIDATIONS.whitespaceEveryNthCharacter({
        parameters: { nthCharacter: 3 },
      });
      expect(validation.validator("12 345 6789")).toBe(false);
      expect(validation.validator("1234 567 890")).toBe(false);
    });

    it("should return false when segments have inconsistent lengths", () => {
      const validation = VALIDATIONS.whitespaceEveryNthCharacter({
        parameters: { nthCharacter: 3 },
      });
      expect(validation.validator("12 456 789")).toBe(false);
      expect(validation.validator("123 45 789")).toBe(false);
      expect(validation.validator("123 456 78")).toBe(false);
    });

    it("should return false when there are multiple consecutive spaces", () => {
      const validation = VALIDATIONS.whitespaceEveryNthCharacter({
        parameters: { nthCharacter: 3 },
      });
      expect(validation.validator("123  456")).toBe(false);
      expect(validation.validator("123   456")).toBe(false);
    });

    it("should return false when spaces are at the beginning or end", () => {
      const validation = VALIDATIONS.whitespaceEveryNthCharacter({
        parameters: { nthCharacter: 3 },
      });
      expect(validation.validator(" 123 456")).toBe(false);
      expect(validation.validator("123 456 ")).toBe(false);
    });

    it("should work with different nthCharacter values", () => {
      const validation = VALIDATIONS.whitespaceEveryNthCharacter({
        parameters: { nthCharacter: 4 },
      });
      expect(validation.validator("1234")).toBe(true); // no space, valid
      expect(validation.validator("1234 5678")).toBe(true);
      expect(validation.validator("1234 5678 9012")).toBe(true);
      expect(validation.validator("123 456 789")).toBe(false); // wrong length segments
      expect(validation.validator("123 4567 8901")).toBe(false); // inconsistent segments
      expect(validation.validator("1234 567 890")).toBe(false); // second segment too short
    });

    it("should use default nthCharacter of 3 when no parameter is provided", () => {
      const validation = VALIDATIONS.whitespaceEveryNthCharacter();
      expect(validation.validator("123 456 789")).toBe(true);
    });

    it("should have correct error message", () => {
      const validation = VALIDATIONS.whitespaceEveryNthCharacter({
        parameters: { nthCharacter: 3 },
      });
      expect(validation.message).toBe(
        "Value must contain whitespace every 3 character"
      );
    });

    it("should use custom message when provided", () => {
      const validation = VALIDATIONS.whitespaceEveryNthCharacter({
        parameters: { nthCharacter: 3 },
        customMessage: "Invalid whitespace format",
      });
      expect(validation.message).toBe("Invalid whitespace format");
    });

    it("should still validate correctly with custom message", () => {
      const validation = VALIDATIONS.whitespaceEveryNthCharacter({
        parameters: { nthCharacter: 3 },
        customMessage: "Bad format!",
      });
      expect(validation.validator("123 456 789")).toBe(true);
      expect(validation.validator("12 345 6789")).toBe(false);
    });
  });

  describe("numberOnly", () => {
    it("should return true for numeric strings", () => {
      const validation = VALIDATIONS.numberOnly();
      expect(validation.validator("123456789")).toBe(true);
    });

    it("should return true for numeric strings with spaces", () => {
      const validation = VALIDATIONS.numberOnly();
      expect(validation.validator("123 456 789")).toBe(true);
    });

    it("should return false for strings with letters", () => {
      const validation = VALIDATIONS.numberOnly();
      expect(validation.validator("123456789a")).toBe(false);
    });

    it("should return false for strings with special characters", () => {
      const validation = VALIDATIONS.numberOnly();
      expect(validation.validator("123-456-789")).toBe(false);
    });

    it("should return true for decimal numbers", () => {
      const validation = VALIDATIONS.numberOnly();
      expect(validation.validator("123.456")).toBe(true);
    });

    it("should return true for empty string (edge case)", () => {
      const validation = VALIDATIONS.numberOnly();
      expect(validation.validator("")).toBe(true);
    });

    it("should have correct error message", () => {
      const validation = VALIDATIONS.numberOnly();
      expect(validation.message).toBe("Value must be a number");
    });

    it("should use custom message when provided", () => {
      const validation = VALIDATIONS.numberOnly({
        customMessage: "Please enter numbers only",
      });
      expect(validation.message).toBe("Please enter numbers only");
    });

    it("should still validate correctly with custom message", () => {
      const validation = VALIDATIONS.numberOnly({
        customMessage: "Not a number!",
      });
      expect(validation.validator("123456789")).toBe(true);
      expect(validation.validator("123456789a")).toBe(false);
    });
  });

  describe("isValidACNNumber", () => {
    it("should return true for valid ACN number without spaces", () => {
      const validation = VALIDATIONS.isValidACNNumber();
      expect(validation.validator("000000019")).toBe(true);
    });

    it("should return true for valid ACN number with spaces", () => {
      const validation = VALIDATIONS.isValidACNNumber();
      expect(validation.validator("000 000 019")).toBe(true);
    });

    it("should return false for invalid ACN number", () => {
      const validation = VALIDATIONS.isValidACNNumber();
      expect(validation.validator("123456789")).toBe(false);
    });

    it("should return false for invalid ACN number with spaces", () => {
      const validation = VALIDATIONS.isValidACNNumber();
      expect(validation.validator("123 456 789")).toBe(false);
    });

    it("should correctly validate checksum calculation", () => {
      const validation = VALIDATIONS.isValidACNNumber();
      expect(validation.validator("000000000")).toBe(true);
    });

    it("should validate multiple valid ACN numbers", () => {
      const validation = VALIDATIONS.isValidACNNumber();
      const validACNs = [
        "000000019",
        "000 000 019",
        "005 749 986",
        "010 499 966",
      ];

      validACNs.forEach((acn) => {
        expect(validation.validator(acn)).toBe(true);
      });
    });

    it("should reject invalid ACN numbers", () => {
      const validation = VALIDATIONS.isValidACNNumber();
      const invalidACNs = ["000000011", "123456789", "999999999"];

      invalidACNs.forEach((acn) => {
        expect(validation.validator(acn)).toBe(false);
      });
    });

    it("should have correct error message", () => {
      const validation = VALIDATIONS.isValidACNNumber();
      expect(validation.message).toBe("Value is not a valid ACN number");
    });

    it("should use custom message when provided", () => {
      const validation = VALIDATIONS.isValidACNNumber({
        customMessage: "Invalid company number",
      });
      expect(validation.message).toBe("Invalid company number");
    });

    it("should still validate correctly with custom message", () => {
      const validation = VALIDATIONS.isValidACNNumber({
        customMessage: "ACN checksum failed",
      });
      expect(validation.validator("000 000 019")).toBe(true);
      expect(validation.validator("123 456 789")).toBe(false);
    });
  });

  describe("error message functionality", () => {
    it("should provide both validator and message properties", () => {
      const validation = VALIDATIONS.minLength({
        parameters: { minLength: 5 },
      });
      expect(validation.validator).toBeDefined();
      expect(validation.message).toBeDefined();
      expect(typeof validation.validator).toBe("function");
      expect(typeof validation.message).toBe("string");
    });

    it("should have different default messages for different validations", () => {
      const minLengthMsg = VALIDATIONS.minLength({
        parameters: { minLength: 5 },
      }).message;
      const maxLengthMsg = VALIDATIONS.maxLength({
        parameters: { maxLength: 10 },
      }).message;
      const numberOnlyMsg = VALIDATIONS.numberOnly().message;

      expect(minLengthMsg).not.toBe(maxLengthMsg);
      expect(minLengthMsg).not.toBe(numberOnlyMsg);
      expect(maxLengthMsg).not.toBe(numberOnlyMsg);
    });

    it("should include parameter values in default messages", () => {
      const validation1 = VALIDATIONS.minLength({
        parameters: { minLength: 3 },
      });
      const validation2 = VALIDATIONS.minLength({
        parameters: { minLength: 10 },
      });

      expect(validation1.message).toContain("3");
      expect(validation2.message).toContain("10");
    });
  });

  describe("custom message support", () => {
    it("should override default message with custom message for all validators", () => {
      const customMsg = "My custom error message";

      const validations = [
        VALIDATIONS.minLength({
          parameters: { minLength: 5 },
          customMessage: customMsg,
        }),
        VALIDATIONS.maxLength({
          parameters: { maxLength: 10 },
          customMessage: customMsg,
        }),
        VALIDATIONS.whitespaceEveryNthCharacter({
          parameters: { nthCharacter: 3 },
          customMessage: customMsg,
        }),
        VALIDATIONS.numberOnly({ customMessage: customMsg }),
        VALIDATIONS.isValidACNNumber({ customMessage: customMsg }),
      ];

      validations.forEach((validation) => {
        expect(validation.message).toBe(customMsg);
      });
    });

    it("should use default message when custom message is not provided", () => {
      const validation = VALIDATIONS.minLength({
        parameters: { minLength: 5 },
      });
      expect(validation.message).toBe(
        "Value must be at least 5 characters long"
      );
    });

    it("should use default message when custom message is undefined", () => {
      const validation = VALIDATIONS.minLength({
        parameters: { minLength: 5 },
        customMessage: undefined,
      });
      expect(validation.message).toBe(
        "Value must be at least 5 characters long"
      );
    });

    it("should use default message when custom message is null", () => {
      const validation = VALIDATIONS.minLength({
        parameters: { minLength: 5 },
        customMessage: null,
      });
      expect(validation.message).toBe(
        "Value must be at least 5 characters long"
      );
    });

    it("should use default message when custom message is empty string", () => {
      const validation = VALIDATIONS.minLength({
        parameters: { minLength: 5 },
        customMessage: "",
      });
      expect(validation.message).toBe(
        "Value must be at least 5 characters long"
      );
    });

    it("should accept any string as custom message", () => {
      const messages = [
        "Short!",
        "This is a very long custom error message that explains the problem in detail",
        "Error: 123",
        "⚠️ Warning!",
      ];

      messages.forEach((msg) => {
        const validation = VALIDATIONS.minLength({
          parameters: { minLength: 5 },
          customMessage: msg,
        });
        expect(validation.message).toBe(msg);
      });
    });
  });
});
