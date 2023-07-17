import Logo from "./Logo.png";
type ModeProps = {
  setMode: (mode: string) => void;
  setNoteId: (noteId: number) => void;
};

export function NavBar({ setMode, setNoteId }: ModeProps) {
  return (
    <div className="navBarContainer">
      <div className="modeButtonsContainer">
        <img src={Logo} height={30} />
        <button
          className="modeButton"
          onClick={() => {
            setMode("Notes");
            setNoteId(0);
          }}
        >
          Notes
        </button>
        <button
          className="modeButton"
          onClick={() => {
            setMode("NewNote");
            setNoteId(0);
          }}
        >
          New Note
        </button>
        <button
          className="modeButton"
          onClick={() => {
            setMode("EditTags");
            setNoteId(0);
          }}
        >
          Edit Tags
        </button>
      </div>
    </div>
  );
}
