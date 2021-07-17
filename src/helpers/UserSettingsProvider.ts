import { storage } from '@extend-chrome/storage';

export interface WallpaperSettings {
    lastUsed: number;
    whenUsed?: number;
}

export interface QuoteSettings {
    lastUsed: number;
    whenUsed?: number;
}

export interface UserSettings {
    name?: string;
    wallpaperSettings?: WallpaperSettings;
    quoteSettings?: QuoteSettings;
}

export default class UserSettingsProvider {
    static set(settings: UserSettings) {
        this.get()
            .then(storedSettings => Object.assign({}, storedSettings, settings))
            .then(mergedSettings => storage.sync.set({ "settings": mergedSettings }));
    }

    static async get() {
        return storage.sync.get("settings")
            .then(settingsWrap => settingsWrap.settings)
            .then((settings = {}) => settings);
    }
}
