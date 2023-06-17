import React, { useState, useEffect } from "react";

export default function SecondaryHeader() {
  const [quests, setQuests] = useState([]);

  useEffect(() => {
    const storedQuests = localStorage.getItem("myQuests");
    if (storedQuests) {
      setQuests(JSON.parse(storedQuests));
    }
  }, []);

  const createNewQuest = () => {
    return {
      id: Date.now(),
      check: false,
      quest: "",
    };
  };

  const updateQuests = (id, updatedQuest) => {
    const updatedQuests = quests.map((quest) => {
      if (quest.id === id) {
        return { ...quest, ...updatedQuest };
      }
      return quest;
    });
    localStorage.setItem("myQuests", JSON.stringify(updatedQuests));
    setQuests(updatedQuests);
  };

  const QuestChange = (id, check, quest) => {
    const updatedQuest = { check, quest };
    updateQuests(id, updatedQuest);
  };

  const AddQuest = () => {
    const newQuest = createNewQuest();
    const updatedQuests = [...quests, newQuest];
    setQuests(updatedQuests);
  };

  const RemoveQuest = (id) => {
    const filteredQuests = quests.filter((quest) => quest.id !== id);
    localStorage.setItem("myQuests", JSON.stringify(filteredQuests));
    setQuests(filteredQuests);
  };

  return (
    <div>
      {quests.map((quest) => (
        <div className="SecondaryHeader" key={quest.id}>
          <label class="checkbox-container">
            <input
              type="checkbox"
              className="checkbox"
              checked={quest.check}
              onChange={(e) =>
                QuestChange(quest.id, e.target.checked, quest.quest)
              }
            />
            <span class="checkmark"></span>
          </label>
          <input
            type="text"
            className={`textField ${quest.check ? "checked" : ""}`}
            value={quest.quest}
            onChange={(e) => QuestChange(quest.id, quest.check, e.target.value)}
          />
          <button
            className="deleteElement"
            onClick={() => RemoveQuest(quest.id)}
          >
            X
          </button>
        </div>
      ))}
      <div className="button">
        <button onClick={AddQuest} className="newElement">
          + Add new element
        </button>
      </div>
    </div>
  );
}
