import { app } from "../../app/app.module";
import template from "./main.view.html";

app.component("mainComponent", {
  template,
  controller: function () {
    this.name = "John Doe";
    this.greet = () => {
      alert(`Hello, ${this.name}!`);
    };
  },
});
