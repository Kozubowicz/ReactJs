import { useNotesContext } from "../context/notesContext";
import { useState, useEffect } from "react";

import CreatableSelect from "react-select/creatable";
import { MultiValue } from "react-select";
import { StylesConfig } from "react-select";
type Note = {
  id: number;
  title: string;
  body: string;
  tagsId: number[];
};

type OptionType = {
  label: string;
  value: number;
};
type EditNoteProps = {
  noteId: number;
};

export function EditNote({ noteId }: EditNoteProps) {
  const { getNote, modifyNote, Tags, addTag } = useNotesContext();

  const [selectValue, setSelectValue] = useState<OptionType[]>([]);
  const [note, setNote] = useState<Note | undefined>(getNote(noteId));

  const options = Tags.map((tag) => ({
    value: tag.id,
    label: tag.name,
  }));

  const handleSelectChange = (selected: MultiValue<OptionType>) => {
    if (selected) {
      setSelectValue(selected as OptionType[]);
      setNote((prevNote) => ({
        ...prevNote!,
        tagsId: (selected as OptionType[]).map((option) => option.value),
      }));
    }
  };

  const handleCreateOption = (newOption: string) => {
    const createdOption = addTag(newOption);
    handleSelectChange([...selectValue, createdOption]);
  };

  const handleChange = (field: string, value: string) => {
    setNote((prevNote) => ({
      ...prevNote!,
      [field]: value,
    }));
  };

  useEffect(() => {
    if (note) {
      setSelectValue(
        note.tagsId.map((tagId) => ({
          value: tagId,
          label: Tags.find((tag) => tag.id === tagId)?.name || "",
        }))
      );
    }
  }, [note, Tags]);

  useEffect(() => {
    if (note) modifyNote(note);
  }, [note]);

  const customStyles: StylesConfig<OptionType, true> = {
    control: (provided) => ({
      ...provided,
      backgroundColor: "black",
      color: "white",
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: "black",
      color: "white",
      border: "2px solid silver",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused || state.isSelected ? "rgb(34, 34, 34)" : "black",
      color: state.isSelected ? "black" : "white",
    }),

    noOptionsMessage: (provided) => ({
      ...provided,
      color: "white",
    }),
    input: (provided) => ({
      ...provided,
      color: "white",
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: "rgb(7, 147, 212)",
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: "white",
      padding: "3px 8px",
    }),
  };

  return (
    <div className="NewNote">
      <div className="NewNoteContainer">
        <h1>Edit note</h1>
        <input
          value={note?.title || ""}
          onChange={(e) => handleChange("title", e.target.value)}
          type="text"
          className="NewNoteTitle"
          placeholder="Title"
        />
        <CreatableSelect
          options={options}
          value={selectValue}
          onChange={handleSelectChange}
          onCreateOption={handleCreateOption}
          isMulti
          isSearchable
          isClearable
          className="NewNoteSelect"
          classNamePrefix="select"
          styles={customStyles}
        />

        <textarea
          value={note?.body || ""}
          onChange={(e) => handleChange("body", e.target.value)}
          placeholder="Note Body"
          className="NewNoteBody"
        />
      </div>
    </div>
  );
}
