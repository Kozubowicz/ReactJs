import { useState } from "react";
import { NavBar } from "./components/NavBar";
import { NotesContextProvider } from "./context/notesContext";
import { Notes } from "./pages/Notes";
import { NewNote } from "./pages/NewNote";
import { NewTag } from "./pages/NewTag";
import { EditNote } from "./pages/EditNote";

function App() {
  const [mode, setMode] = useState<string>("Notes");
  const [noteId, setNoteId] = useState<number>(0);

  return (
    <NotesContextProvider>
      <div className="appContainer">
        <NavBar setMode={setMode} setNoteId={setNoteId} />

        {mode === "Notes" && noteId < 1 ? <Notes setMode={setMode} setNoteId={setNoteId} /> : <></>}

        {mode === "NewNote" && noteId < 1 ? <NewNote /> : <></>}

        {mode === "EditTags" && noteId < 1 ? <NewTag /> : <></>}

        {mode === "Edit" && noteId > 0 ? <EditNote noteId={noteId} /> : <></>}
      </div>
    </NotesContextProvider>
  );
}

export default App;
