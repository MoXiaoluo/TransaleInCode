import vscode from 'vscode';
import { outputChannel } from './utils/outputChannel';
import { translateByGoogle } from './utils/transaltion';

/**
 * Translate the selected text
 * @returns void
 */
export const translateWord = () => {
    outputChannel.show();
    outputChannel.appendLine('Translating text ...');
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
        return;
    }

    const selection = editor.selection;
    const text = editor.document.getText(selection);

    if (!text) {
        return;
    }
    translateByGoogle(text);
};
