import { workspace } from 'vscode';

export const getConfig = () => {
    const config = workspace.getConfiguration('translateincode');
    return config;
};
