import { useCallback, useEffect, useState } from 'react';
import { SecureNoteStore } from '../store/SecureStore';

export function useSecureNotes(id: string) {
    const [note, setNote] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const fetchNote = useCallback(async () => {
        setIsLoading(true);
        const savedNote = await SecureNoteStore.getNote(id);
        setNote(savedNote);
        setIsLoading(false);
    }, [id]);

    useEffect(() => {
        fetchNote();
    }, [fetchNote]);

    const saveNote = async (text: string) => {
        const success = await SecureNoteStore.saveNote(id, text);
        if (success) {
            setNote(text);
        }
        return success;
    };

    const deleteNote = async () => {
        const success = await SecureNoteStore.deleteNote(id);
        if (success) {
            setNote(null);
        }
        return success;
    };

    return {
        note,
        isLoading,
        saveNote,
        deleteNote,
        refreshNote: fetchNote,
    };
}
