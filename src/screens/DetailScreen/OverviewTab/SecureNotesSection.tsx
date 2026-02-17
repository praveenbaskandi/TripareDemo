import { useSecureNotes } from "@/hooks/useSecureNotes";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { styles } from "../DetailScreen.styles";

export const SecureNotesSection = ({
  launchId,
  theme,
}: {
  launchId: string;
  theme: any;
}) => {
  const { note, isLoading, saveNote, deleteNote } = useSecureNotes(launchId);
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState("");

  const handleEdit = () => {
    setText(note || "");
    setIsEditing(true);
  };

  const handleSave = async () => {
    await saveNote(text);
    setIsEditing(false);
  };

  const handleDelete = async () => {
    await deleteNote();
    setIsEditing(false);
  };

  if (isLoading) {
    return (
      <ActivityIndicator
        size="small"
        color={theme.tint}
        style={{ marginTop: 20 }}
      />
    );
  }

  return (
    <View style={[styles.card, { backgroundColor: theme.card }]}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 8,
        }}
      >
        <Text
          style={[styles.sectionTitle, { color: theme.text, marginBottom: 0 }]}
        >
          Private Notes 🔒
        </Text>
        {!isEditing && (
          <TouchableOpacity onPress={handleEdit}>
            <Text style={{ color: theme.tint, fontWeight: "bold" }}>
              {note ? "Edit" : "Add"}
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {isEditing ? (
        <View>
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: theme.border,
              borderRadius: 8,
              padding: 10,
              color: theme.text,
              minHeight: 80,
              marginBottom: 10,
              textAlignVertical: "top",
            }}
            multiline
            value={text}
            onChangeText={setText}
            placeholder="Enter private note..."
            placeholderTextColor={theme.icon}
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              gap: 10,
            }}
          >
            {note && (
              <TouchableOpacity onPress={handleDelete} style={{ padding: 8 }}>
                <Text style={{ color: theme.failure }}>Delete</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              onPress={() => setIsEditing(false)}
              style={{ padding: 8 }}
            >
              <Text style={{ color: theme.text }}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleSave}
              style={{
                backgroundColor: theme.tint,
                padding: 8,
                borderRadius: 6,
              }}
            >
              <Text style={{ color: "white", fontWeight: "bold" }}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <Text
          style={[
            styles.bodyText,
            {
              color: theme.text,
              fontStyle: note ? "normal" : "italic",
              opacity: note ? 1 : 0.6,
            },
          ]}
        >
          {note || "No private notes added."}
        </Text>
      )}
    </View>
  );
};
