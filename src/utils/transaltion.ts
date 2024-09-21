import os from 'node:os';
import fs from 'fs';
import fsp from 'fs/promises';
import { translate } from '@vitalets/google-translate-api';
import { outputChannel } from './outputChannel';
import ollama from 'ollama';
import { getConfig } from './configuration';

/**
 * Translate the word by ollama
 * @param text the pending translate word
 */
export const translateByOllama = async (text: string) => {
    const res = await ollama.chat({
        model: 'phi3',
        messages: [
            {
                role: 'assistant',
                content: `Translate ${text} from English to Chinese`,
            },
        ],
    });
    console.log(res);
    outputChannel.appendLine(`Translated ${text}: ${res.message.content}`);
};
/**
 * Translate the word by google
 * @param text the pending translate word
 */
export const translateByGoogle = (text: string) => {
    translate(text, { from: 'auto', to: 'zh' })
        .then((res) => {
            if (getConfig().get('SaveTranslation')) {
                saveWrodInLocalWithMd(text, res.text);
            }
            outputChannel.appendLine(`Translated ${text}: ${res.text}`);
        })
        .catch((err) => {
            outputChannel.appendLine(`Translation failed: ${err.message}`);
        });
};

/**
 *
 * @param origin the pending translate word
 * @param translation the transalated word
 */
const saveWrodInLocalWithMd = async (origin: string, translation: string) => {
    const homePath = os.homedir();
    const file = `${homePath}/.translateincode/translate.md`;
    if (!fs.existsSync(`${homePath}/.translateincode`)) {
        await fsp.mkdir(`${homePath}/.translateincode`);
        await fsp.writeFile(file, '# TranslateInCode\n\n| 原文 | 翻译 |\n| --- | --- |');
    } else if (!fs.existsSync(file)) {
        await fsp.writeFile(file, '# TranslateInCode\n\n| 原文 | 翻译 |\n| --- | --- |');
    }

    await fsp.appendFile(file, `\n|${origin} | ${translation}|`);

    outputChannel.appendLine('saved successfully');
};
