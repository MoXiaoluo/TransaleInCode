import * as vscode from 'vscode';
import { outputChannel } from './utils/outputChannel';
import { translateByGoogle } from './utils/transaltion';

export function activate(context: vscode.ExtensionContext) {

	console.log('Congratulations, your extension "translateincode" is now active!');



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
		translateByGoogle(text);
	});

	context.subscriptions.push(disposable);
	context.subscriptions.push(outputChannel);

	
}

export function deactivate() { }
