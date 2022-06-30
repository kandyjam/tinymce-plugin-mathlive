import { Editor, TinyMCE } from "tinymce";

declare const tinymce: TinyMCE;

interface PluginOptions {
  title: string;
  buttons: {
    cancel: string;
    insert: string;
  };
}

const setup = (editor: Editor): void => {
  // get plugin options - named mathlive
  const options: PluginOptions = editor.getParam("mathlive");

  let markup = "";

  // custom sigma icon as functions
  editor.ui.registry.addIcon(
    "functions",
    '<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M6 20V18L12.5 12L6 6V4H18V7H10.775L16.15 12L10.775 17H18V20Z"/></svg>'
  );

  editor.addCommand("mathlive-equation-insert", function (_, data) {
    if (!data) return;

    const content = `
      <span class="mathlive" data-latex="${data.latex}">
        ${data.html}
      </span>
    `;

    if (data.currentTarget) {
      editor.selection.select(data.currentTarget);
    }

    editor.selection.setContent(content);
  });

  editor.addCommand("mathlive-equation-window", function (_, data = {}) {
    editor.windowManager.openUrl({
      url: "mathlive.html",
      title: options.title || "Insert Equation",
      width: 820,
      height: 400,
      buttons: [
        {
          type: "cancel",
          text: options.buttons.cancel || "Cancel",
        },
        {
          type: "custom",
          text: options.buttons.insert || "Insert",
          primary: true,
        },
      ],
      onAction: () => {
        editor.execCommand("mathlive-equation-insert", false, {
          html: markup,
          latex: data.latex,
          currentTarget: data.currentTarget,
        });

        editor.windowManager.close();
      },
      onMessage: (instance, message) => {
        console.log(message);
        if (message.mceAction === "mathlive-load") {
          instance.sendMessage({
            latex: "",
          });
        }

        if (message.mceAction === "mathlive-input") {
          markup = message.html;
          data.latex = message.latex;
        }
      },
    });
  });

  editor.ui.registry.addButton("mathlive", {
    icon: "functions", // TODO: allow custom icon
    tooltip: "Insert equation", // TODO: allow custom tooltip
    onAction: () => {
      editor.execCommand("mathlive-equation-window");
    },
  });
};

export default (): void => {
  tinymce.PluginManager.add("mathlive", setup);
};
