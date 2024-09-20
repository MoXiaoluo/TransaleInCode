import { translate } from "@vitalets/google-translate-api";
import { outputChannel } from "./outputChannel";
import ollama from "ollama";

export const translateByOllama = async (text: string) => {
    const res = await ollama.chat({
        model: 'phi3',
        messages: [
            {
                role: 'assistant',
                content: `Translate ${text} from English to Chinese`,
            },
        ]
    });
    console.log(res);
    outputChannel.appendLine(`Translated ${text}: ${res.message.content}`);
};

export const translateByGoogle = (text: string) => {
    translate(text, { from: 'auto', to: 'zh' }).then((res) => {
        outputChannel.appendLine(`Translated ${text}: ${res.text}`);
    }).catch((err) => {
        outputChannel.appendLine(`Translation failed: ${err.message}`);
    });
};