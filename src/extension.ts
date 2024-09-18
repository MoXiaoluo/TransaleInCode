import * as vscode from 'vscode';
import { translate } from "@vitalets/google-translate-api";

export function activate(context: vscode.ExtensionContext) {

	console.log('Congratulations, your extension "translateincode" is now active!');

	const outputChannel = vscode.window.createOutputChannel('TranslateInCode');

	const disposable = vscode.commands.registerCommand('translateincode.translate', () => {
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

		translate(text, { from: 'auto', to: 'zh' }).then((res) => {
			outputChannel.appendLine(`Translated text: ${res.text}`);
		}).catch((err) => {
			outputChannel.appendLine(`Translation failed: ${err.message}`);
		});
	});

	context.subscriptions.push(disposable);
	context.subscriptions.push(outputChannel);
}

export function deactivate() {}
