import React, { useState } from "react";

export default function Players({ initialName, symbol, isActive, onChangeName }) {
  const [playerName, setPlayerName] = useState(initialName);
  const [isEdit, setIsEdit] = useState(false);

  function handlerClickEdit() {
    setIsEdit((isEdit) => !isEdit);
    
    if(isEdit){
      onChangeName(symbol,playerName)
    }
  }

  function handleClickChange(event) {
    setPlayerName(event.target.value);
  }

  let editablePlayerName = <span className="player-name">{playerName}</span>;

  if (isEdit) {
    editablePlayerName = (
      <input
        type="text"
        name="name"
        id="name"
        value={playerName}
        onChange={handleClickChange}
        required
      />
    );
  }

  return (
    <>
      <li className={isActive ? "active" : undefined}>
        <span className="player">
          {editablePlayerName}
          <span className="player-symbol">{symbol}</span>
        </span>
        <button onClick={handlerClickEdit}>{isEdit ? "Save" : "Edit"}</button>
      </li>
    </>
  );
}
