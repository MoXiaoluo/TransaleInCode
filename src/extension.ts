import * as vscode from 'vscode';
import { outputChannel } from './utils/outputChannel';
import { commands } from './common/constant';
import { translateWord } from './command';

export function activate(context: vscode.ExtensionContext) {
    console.log('Congratulations, your extension "translateincode" is now active!');

    const disposable = vscode.commands.registerCommand(commands.translate, translateWord);

    context.subscriptions.push(disposable);
    context.subscriptions.push(outputChannel);
}

export function deactivate() {}
