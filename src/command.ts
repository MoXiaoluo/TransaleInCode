import vscode from 'vscode';
import md from 'markdown-it';
import { outputChannel, appendLineWithTimestamp } from './utils/outputChannel';
import { translateByGoogle, translationDictionaryContent } from './utils/transaltion';

/**
 * Translate the selected text
 * @returns void
 */
export const translateWord = () => {
    outputChannel.show();
    appendLineWithTimestamp('Translating text ...');
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

export const openTranslationDictionary = async () => {
    const content = await translationDictionaryContent();
    if (!content) {
        vscode.window.showErrorMessage('No translation dictionary found');
        return;
    }
    const panel = vscode.window.createWebviewPanel(
        'translationDictionary',
        'Translation Dictionary',
        vscode.ViewColumn.One,
        {},
    );
    const htmlContent = md().render(content);

    panel.webview.html = htmlContent;
};
