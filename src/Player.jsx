import { useState } from "react";

export default function Player({name, symbol, isActive}) {
    const [playerName , setPlayerName] = useState(name);
    const [edit,  setEdit] = useState(false);

    function handleEdit() {
        setEdit(edit => !edit);
    }

    function handleChange(event) {
        setPlayerName(event.target.value);
    }

    let player = edit===false?
                <span className="player-name">{playerName}</span>
                :<input type="text" required  value={playerName} onChange={handleChange}/>;

    return (
        <li className={isActive ? 'active' : undefined }>
            <span className="player">
                {player}
                <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handleEdit}>{edit?'Save':'Edit'}</button>
        </li>
    );
}