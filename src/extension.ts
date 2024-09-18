import * as vscode from 'vscode';
import { translate } from "@vitalets/google-translate-api";

export function activate(context: vscode.ExtensionContext) {

	console.log('Congratulations, your extension "translateincode" is now active!');

	const disposable = vscode.commands.registerCommand('translateincode.translate', () => {

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
			vscode.window.showInformationMessage(res.text);
		}).catch((err) => {
			vscode.window.showErrorMessage(err.message);
		});
	});

	context.subscriptions.push(disposable);
}

export function deactivate() {}
