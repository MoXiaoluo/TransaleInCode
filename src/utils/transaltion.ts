import os from 'node:os';
import fs from 'fs';
import fsp from 'fs/promises';
import { translate } from '@vitalets/google-translate-api';
import { appendLineWithTimestamp } from './outputChannel';
import ollama from 'ollama';
import { getConfig } from './configuration';
import dayjs from 'dayjs';

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
    appendLineWithTimestamp(`Translated ${text}: ${res.message.content}`);
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
            appendLineWithTimestamp(`Translated ${text}: ${res.text}`);
        })
        .catch((err) => {
            appendLineWithTimestamp(`Translation failed: ${err.message}`);
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
        await fsp.writeFile(file, '# TranslateInCode\n\nStudy English Every Day, Enjoy your life.\n\n');
    }
    const date = dayjs().format('YYYY-MM-DD');
    const fileContent = await fsp.readFile(file, 'utf-8');

    if (!fileContent.includes(date)) {
        await fsp.appendFile(file, `\n\n${date} Translated Words:\n\n`);
        await fsp.appendFile(file, '| 原文 | 翻译 |\n| --- | --- |');
    }

    await fsp.appendFile(file, `\n|${origin} | ${translation}|`);

    appendLineWithTimestamp('saved successfully');
};

export const translationDictionaryContent = async () => {
    if (!fs.existsSync(`${os.homedir()}/.translateincode/translate.md`)) {
        return;
    }
    return await fsp.readFile(`${os.homedir()}/.translateincode/translate.md`, 'utf-8');
};
