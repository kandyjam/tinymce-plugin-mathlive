import { Editor, TinyMCE } from 'tinymce';

declare const tinymce: TinyMCE;

const setup = (editor: Editor, url: string): void => {
  editor.ui.registry.addButton('mathlive', {
    text: 'mathlive button',
    onAction: () => {
      editor.setContent('<p>content added from mathlive</p>');
    }
  });
};

export default (): void => {
  tinymce.PluginManager.add('mathlive', setup);
};
