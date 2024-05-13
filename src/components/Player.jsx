import { useState, useRef } from "react";

export default function Player() {
  const PlayerName = useRef();
  const [enterPN, SetEnterPN] = useState("");
  function handelNameChange() {
    SetEnterPN(PlayerName.current.value);
    PlayerName.current.value="";
  }
  return (
    <section id="player">
      <h2>Welcome {enterPN != "" ? enterPN : "unknown entity"}</h2>
      <p>
        <input type="text" ref={PlayerName} />
        <button onClick={handelNameChange}>Set Name</button>
      </p>
    </section>
  );
}
