import { useNotesContext } from "../context/notesContext";
import { useState } from "react";

type ModeProps = {
  setMode: (mode: string) => void;
  setNoteId: (noteId: number) => void;
};

export function Notes({ setMode, setNoteId }: ModeProps) {
  const { getTagName, removeNote, getNotesByTag } = useNotesContext();
  const [searchTag, serSearchTag] = useState<string>("");
  const Notes = getNotesByTag(searchTag);
  return (
    <>
      <div className="searchTagInputContainer">
        <input
          type="text"
          className="searchTagInput"
          placeholder="Search tag"
          onChange={(e) => {
            serSearchTag(e.target.value);
            console.log(getNotesByTag(e.target.value));
          }}
        ></input>
      </div>
      <div className="NotesContainer">
        {Notes && Notes.length > 0 ? (
          Notes.map((e) => (
            <div className="NoteContainer" key={`${e.id}container`}>
              <div className="NoteTitle" key={`${e.id}title`}>
                {e.title}
                <button
                  key={`${e.id}remove`}
                  className="removeButtom"
                  onClick={() => removeNote(e.id)}
                >
                  X
                </button>
              </div>
              <div
                onClick={() => {
                  setMode("Edit");
                  setNoteId(e.id);
                }}
              >
                <div className="NoteTags" key={`${e.id}tags`}>
                  {e.tagsId.map((f) => (
                    <div className="NoteTag" key={`${f}tag`}>
                      {getTagName(f)}
                    </div>
                  ))}
                </div>

                <div className="NoteBody" key={`${e.body}body`}>
                  {e.body}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div>You don't have any notes, click New Note to create some</div>
        )}
      </div>
    </>
  );
}
