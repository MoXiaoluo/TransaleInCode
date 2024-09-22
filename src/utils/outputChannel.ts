import { window } from 'vscode';

export const outputChannel = window.createOutputChannel('TranslateInCode');

export const appendLineWithTimestamp = (message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    outputChannel.appendLine(`[${timestamp}] ${message}`);
};
