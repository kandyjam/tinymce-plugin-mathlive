import { TinyMCE } from "tinymce";

import Plugin from "../../main/ts/Plugin";

declare let tinymce: TinyMCE;

Plugin();

tinymce.init({
  selector: "textarea.tinymce",
  plugins: "code mathlive",
  toolbar: "mathlive",
  mathlive: {
    title: "Insert",
    buttons: {
      cancel: "Cancel",
      insert: "Insert Equation",
    },
  },
});
