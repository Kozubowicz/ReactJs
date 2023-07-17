import { useNotesContext } from "../context/notesContext";

export function NewTag() {
  const { Tags, addTag, removeTag, modifyTag } = useNotesContext();
  return (
    <>
      <div className="TagsContainer">
        {Tags.map((e) => (
          <div key={`${e.id}container`}>
            <input
              type="text"
              key={`${e.id}input`}
              value={e.name}
              onChange={(f) => modifyTag(e.id, f.target.value)}
              className="inputTagContainer"
            />
            <button key={`${e.id}remove`} className="removeButtom" onClick={() => removeTag(e.id)}>
              X
            </button>
          </div>
        ))}
        <div className="addButtonContainer">
          <button
            className="addButton"
            onClick={() => {
              addTag("");
            }}
          >
            +
          </button>
        </div>
      </div>
    </>
  );
}
