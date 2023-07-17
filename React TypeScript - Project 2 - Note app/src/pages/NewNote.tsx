import { useRef, useState } from "react";
import { useNotesContext } from "../context/notesContext";

import CreatableSelect from "react-select/creatable";
import { StylesConfig, MultiValue } from "react-select";

type OptionType = {
  label: string;
  value: number;
};

export function NewNote() {
  const { addNote, Tags, addTag } = useNotesContext();
  const titleRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLTextAreaElement>(null);
  const [selectValue, setSelectValue] = useState<OptionType[]>([]);

  const options = Tags.map((tag) => ({
    value: tag.id,
    label: tag.name,
  }));

  const handleSelectChange = (selected: MultiValue<OptionType>) => {
    if (selected) {
      setSelectValue(selected as OptionType[]);
    }
  };

  const handleCreateOption = (newOption: string) => {
    const createdOption = addTag(newOption);
    handleSelectChange([...selectValue, createdOption]);
  };

  const createContext = () => {
    const select = selectValue.map((e) => e.value);

    addNote(titleRef.current?.value ?? "", bodyRef.current?.value ?? "", select);

    if (titleRef.current) titleRef.current.value = "";
    setSelectValue([]);
    if (bodyRef.current) bodyRef.current.value = "";
  };

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
    <>
      <div className="NewNote">
        <div className="NewNoteContainer">
          <h1>New Note</h1>
          <input ref={titleRef} type="text" className="NewNoteTitle" placeholder="Tile" />

          <CreatableSelect
            options={options}
            value={selectValue}
            onChange={handleSelectChange}
            onCreateOption={handleCreateOption}
            isMulti
            isSearchable
            isClearable
            className="NewNoteSelect"
            styles={customStyles}
            classNamePrefix="select"
          />

          <textarea ref={bodyRef} placeholder="Note Body" className="NewNoteBody" />
        </div>
        <div className="SaveButtonContainer" onClick={createContext}>
          <button className="SaveButton">Save</button>
        </div>
      </div>
    </>
  );
}
