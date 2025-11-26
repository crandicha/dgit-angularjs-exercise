import angular from "angular";
import { app } from "../../app/app.module";
import { VALID_ACN_NUMBER_EXAMPLE } from "../../config/ACN";

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
      expect(validityMessage.text()).toBe("Invalid ACN input");
    });
  });

  describe("valueValidity", () => {
    it("should return 'Invalid ACN input' for empty value", () => {
      typeIntoInput("");
      expect(validityMessage.text()).toBe("Invalid ACN input");
    });

    it("should return 'Invalid ACN input' for non-numeric input", () => {
      typeIntoInput("12345678a");
      expect(validityMessage.text()).toBe("Invalid ACN input");
    });

    it("should return 'Invalid ACN input' for input with wrong length", () => {
      typeIntoInput("12345678");
      expect(validityMessage.text()).toBe("Invalid ACN input");
    });

    it("should return 'Invalid ACN input' for input with wrong length (too long)", () => {
      typeIntoInput("1234567890");
      expect(validityMessage.text()).toBe("Invalid ACN input");
    });

    it("should return 'Invalid ACN input' for input with invalid whitespace pattern", () => {
      typeIntoInput("12 345 6789");
      expect(validityMessage.text()).toBe("Invalid ACN input");
    });

    it("should return 'Invalid ACN number' for valid input but invalid checksum", () => {
      typeIntoInput("123456789");
      expect(validityMessage.text()).toBe("Invalid ACN number");
    });

    it("should return 'Invalid ACN number' for valid input format but invalid checksum (with whitespace)", () => {
      typeIntoInput("123 456 789");
      expect(validityMessage.text()).toBe("Invalid ACN number");
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
