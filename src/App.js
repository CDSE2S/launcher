import React, { useState } from "react";

function App() {
    const [gamePath, setGamePath] = useState("");

    // Function to select a game
    const selectGame = async () => {
        const path = await window.electronAPI.selectGame();
        if (path) setGamePath(path);
    };

    // Function to launch the game
    const launchGame = () => {
        if (gamePath) {
            window.electronAPI.launchGame(gamePath);
        } else {
            alert("Please select a game first!");
        }
    };

    return (
        <div style={{ textAlign: "center", padding: "20px" }}>
            <h1>Game Launcher</h1>
            <button onClick={selectGame} style={{ fontSize: "16px", marginBottom: "10px" }}>
                Select Game
            </button>
            <p>{gamePath || "No game selected"}</p>
            <button onClick={launchGame} style={{ fontSize: "16px", padding: "10px 20px" }}>
                Launch Game
            </button>
        </div>
    );
}

export default App;
