import * as vscode from 'vscode';
import { outputChannel } from './utils/outputChannel';
import { commands } from './common/constant';
import { translateWord, openTranslationDictionary } from './command';

export function activate(context: vscode.ExtensionContext) {
    console.log('Congratulations, your extension "translateincode" is now active!');

    const translateWordDisposable = vscode.commands.registerCommand(commands.translateWord, translateWord);
    const openTranslationDictionaryDisposable = vscode.commands.registerCommand(
        commands.translationDictory,
        openTranslationDictionary,
    );

    context.subscriptions.push(...[translateWordDisposable, openTranslationDictionaryDisposable, outputChannel]);
}

export function deactivate() {}
