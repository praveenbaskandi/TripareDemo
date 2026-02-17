import * as SecureStore from 'expo-secure-store';

const KEY_PREFIX = 'note_';

export const SecureNoteStore = {
    saveNote: async (id: string, text: string) => {
        try {
            await SecureStore.setItemAsync(`${KEY_PREFIX}${id}`, text);
            return true;
        } catch (error) {
            console.error('Error saving note:', error);
            return false;
        }
    },

    getNote: async (id: string) => {
        try {
            return await SecureStore.getItemAsync(`${KEY_PREFIX}${id}`);
        } catch (error) {
            console.error('Error getting note:', error);
            return null;
        }
    },

    deleteNote: async (id: string) => {
        try {
            await SecureStore.deleteItemAsync(`${KEY_PREFIX}${id}`);
            return true;
        } catch (error) {
            console.error('Error deleting note:', error);
            return false;
        }
    },
};
