import { app } from "../../app/app.module";
import template from "./main.view.html";
import "./main.component.css";
import { VALIDATIONS } from "../../utils/validation";
import { VALID_ACN_LENGTH } from "../../config/ACN";

app.directive("mainComponent", function () {
  return {
    restrict: "E",
    template,
    scope: {},
    controller: function ($scope) {
      $scope.value = "";
      $scope.validations = [
        VALIDATIONS.minLength({ parameters: { minLength: VALID_ACN_LENGTH } }),
        VALIDATIONS.maxLength({
          parameters: { maxLength: VALID_ACN_LENGTH },
        }),
        VALIDATIONS.whitespaceEveryNthCharacter({
          parameters: { nthCharacter: 3 },
        }),
        VALIDATIONS.numberOnly(),
        VALIDATIONS.isValidACNNumber(),
      ];
      $scope.valueValidity = () => {
        if ($scope.value === "") return { success: false, message: "" };
        const message = $scope.validations.find(
          (validation) => !validation.validator($scope.value)
        )?.message;

        if (message) return { success: false, message };
        return { success: true, message: "Valid ACN number" };
      };
    },
  };
});
