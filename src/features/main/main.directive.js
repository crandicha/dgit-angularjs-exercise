import { app } from "../../app/app.module";
import template from "./main.view.html";
import "./main.component.css";
import { isValidACNInput, isValidACNNumber } from "../../utils/ACN";
import { VALID_ACN_LENGTH } from "../../config/ACN";

app.directive("mainComponent", function () {
  return {
    restrict: "E",
    template,
    scope: {},
    controller: function ($scope) {
      $scope.value = "";
      $scope.validations = [
        { validator: isValidACNInput, errorMessage: "Invalid ACN input" },
        { validator: isValidACNNumber, errorMessage: "Invalid ACN number" },
      ];
      $scope.valueValidity = () => {
        const errorMessage = $scope.validations.find(
          (validation) => !validation.validator($scope.value)
        )?.errorMessage;
        if (errorMessage) return { success: false, errorMessage };
        return { success: true, errorMessage: "Valid ACN number" };
      };
    },
  };
});
