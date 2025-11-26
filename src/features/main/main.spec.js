import angular from "angular";
import { app } from "../../app/app.module";
import { VALID_ACN_NUMBER_EXAMPLE, VALID_ACN_LENGTH } from "../../config/ACN";
import { VALIDATIONS } from "../../utils/validation";

describe("mainComponent", () => {
  let $compile;
  let $rootScope;
  let $scope;
  let element;
  let input;
  let validityMessage;

  beforeEach(() => {
    angular.mock.module(app.name);
    angular.mock.inject((_$compile_, _$rootScope_) => {
      $compile = _$compile_;
      $rootScope = _$rootScope_;
    });
    $scope = $rootScope.$new();
    element = $compile("<main-component></main-component>")($scope);
    $scope.$digest();
    input = element.find("input");
    validityMessage = element.find("p");
  });

  const typeIntoInput = (value) => {
    input.val(value);
    input.triggerHandler("input");
    $scope.$digest();
  };

  describe("initialization", () => {
    it("should initialize with empty value", () => {
      expect(input.val()).toBe("");
      expect(validityMessage.text()).toBe("");
    });
  });

  describe("valueValidity", () => {
    it("should return empty string for empty value", () => {
      typeIntoInput("");
      expect(validityMessage.text()).toBe("");
    });

    it("should return numberOnly error for non-numeric input", () => {
      typeIntoInput("12345678a");
      const expectedMessage = VALIDATIONS.numberOnly().message;
      expect(validityMessage.text()).toBe(expectedMessage);
    });

    it("should return minLength error for input with wrong length (too short)", () => {
      typeIntoInput("12345678");
      const expectedMessage = VALIDATIONS.minLength({
        parameters: { minLength: VALID_ACN_LENGTH },
      }).message;
      expect(validityMessage.text()).toBe(expectedMessage);
    });

    it("should return maxLength error for input with wrong length (too long)", () => {
      typeIntoInput("1234567890");
      const expectedMessage = VALIDATIONS.maxLength({
        parameters: { maxLength: VALID_ACN_LENGTH },
      }).message;
      expect(validityMessage.text()).toBe(expectedMessage);
    });

    it("should return whitespace error for input with invalid whitespace pattern", () => {
      typeIntoInput("12 345 6789");
      const expectedMessage = VALIDATIONS.whitespaceEveryNthCharacter({
        parameters: { nthCharacter: 3 },
      }).message;
      expect(validityMessage.text()).toBe(expectedMessage);
    });

    it("should return ACN validation error for valid input but invalid checksum", () => {
      typeIntoInput("123456789");
      const expectedMessage = VALIDATIONS.isValidACNNumber().message;
      expect(validityMessage.text()).toBe(expectedMessage);
    });

    it("should return ACN validation error for valid input format but invalid checksum (with whitespace)", () => {
      typeIntoInput("123 456 789");
      const expectedMessage = VALIDATIONS.isValidACNNumber().message;
      expect(validityMessage.text()).toBe(expectedMessage);
    });

    it("should return 'Valid ACN number' for valid ACN number without whitespace", () => {
      typeIntoInput("000000019");
      expect(validityMessage.text()).toBe("Valid ACN number");
    });

    it("should return 'Valid ACN number' for valid ACN number with whitespace", () => {
      typeIntoInput("000 000 019");
      expect(validityMessage.text()).toBe("Valid ACN number");
    });

    it("should validate all valid ACN number examples", () => {
      VALID_ACN_NUMBER_EXAMPLE.forEach((acn) => {
        typeIntoInput(acn);
        expect(validityMessage.text()).toBe("Valid ACN number");
      });
    });

    it("should validate all valid ACN number examples without whitespace", () => {
      VALID_ACN_NUMBER_EXAMPLE.forEach((acn) => {
        const acnWithoutWhitespace = acn.replace(/\s/g, "");
        typeIntoInput(acnWithoutWhitespace);
        expect(validityMessage.text()).toBe("Valid ACN number");
      });
    });
  });
});
