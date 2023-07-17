import { createContext, useContext, ReactNode } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

type NotesContextProviderProps = {
  children: ReactNode;
};

type Note = {
  id: number;
  title: string;
  body: string;
  tagsId: number[];
};

type Tag = {
  id: number;
  name: string;
};

type NotesContext = {
  Notes: Note[];
  Tags: Tag[];
  addNote: (title: string, body: string, tagsId: number[]) => void;
  removeNote: (id: number) => void;
  getNote: (id: number) => Note | undefined;
  getNotesByTag: (tag: string) => Note[] | undefined;
  modifyNote: (Note: Note) => void;
  addTag: (name: string) => { value: number; label: string };
  removeTag: (id: number) => void;
  modifyTag: (id: number, name: string) => void;
  getTagName: (id: number) => string;
};
const NotesContext = createContext({} as NotesContext);

export function useNotesContext() {
  return useContext(NotesContext);
}

export function NotesContextProvider({ children }: NotesContextProviderProps) {
  const [Notes, setNotes] = useLocalStorage<Note[]>("notes", []);
  const [Tags, setTags] = useLocalStorage<Tag[]>("tags", []);

  function addNote(title: string, body: string, tagsId: number[]) {
    const newNote: Note = { id: Date.now(), title, body, tagsId };
    setNotes((prevNotes) => [...prevNotes, newNote]);
  }
  function removeNote(id: number) {
    const newNotes = Notes.filter((e) => e.id !== id);
    setNotes(newNotes);
  }

  function getNote(id: number): Note | undefined {
    const note = Notes.find((e) => e.id === id);
    return note;
  }

  function getNotesByTag(tagName?: string): Note[] | undefined {
    if (!tagName) {
      return Notes;
    }

    const matchingTags = Tags.filter((tag) =>
      tag.name.toLowerCase().includes(tagName.toLowerCase())
    );

    const matchingNoteIds = matchingTags.flatMap((tag) => tag.id);

    const matchingNotes = Notes.filter((note) =>
      note.tagsId.some((tagId) => matchingNoteIds.includes(tagId))
    );

    return matchingNotes;
  }

  function modifyNote(newNote: Note) {
    setNotes((prevNotes) => {
      const updatedNotes = prevNotes.map((note) => {
        if (note.id === newNote.id) {
          return { ...newNote };
        }
        return note;
      });
      return updatedNotes;
    });
  }

  function addTag(name: string) {
    const newTag: Tag = { id: Date.now(), name };
    setTags((prevTags) => [...prevTags, newTag]);
    return { value: newTag.id, label: newTag.name };
  }

  function modifyTag(id: number, name: string) {
    setTags((prevTags) => {
      const updatedTags = [...prevTags];
      const tagIndex = updatedTags.findIndex((tag) => tag.id === id);
      if (tagIndex !== -1) {
        updatedTags[tagIndex] = { ...updatedTags[tagIndex], name };
      }
      return updatedTags;
    });
  }

  function removeTag(id: number) {
    const newTags = Tags.filter((e) => e.id !== id);
    const newNotes = Notes.map((e) => {
      const newTags = e.tagsId.filter((f) => f !== id);
      return { ...e, tagsId: newTags };
    });
    setNotes(newNotes);
    setTags(newTags);
  }

  function getTagName(id: number) {
    const TagName = Tags.find((e) => e.id === id);

    return TagName ? TagName.name : "";
  }

  return (
    <>
      <NotesContext.Provider
        value={{
          Notes,
          Tags,
          addNote,
          removeNote,
          getNote,
          getNotesByTag,
          modifyNote,
          addTag,
          removeTag,
          getTagName,
          modifyTag,
        }}
      >
        {children}
      </NotesContext.Provider>
    </>
  );
}
