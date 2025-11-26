import { app } from "../../app/app.module";
import template from "./main.view.html";
import { isValidACNInput, isValidACNNumber } from "../../utils/ACN";
import { VALID_ACN_LENGTH } from "../../config/ACN";

app.component("mainComponent", {
  template,
  controller: function () {
    this.value = "";
    this.validations = [
      { validator: isValidACNInput, errorMessage: "Invalid ACN input" },
      { validator: isValidACNNumber, errorMessage: "Invalid ACN number" },
    ];
    this.valueValidity = () => {
      const errorMessage = this.validations.find(
        (validation) => !validation.validator(this.value)
      )?.errorMessage;
      return errorMessage || "Valid ACN number";
    };
  },
});
