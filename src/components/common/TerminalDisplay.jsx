// src/components/common/TerminalDisplay.js
import React, { useState, useEffect } from 'react';
import { MOCK_USER_ID } from '../../utils/constants';

const TerminalDisplay = ({ userCredits }) => {
    const [terminalText, setTerminalText] = useState("");

    const terminalLines = [
        "Booting MEMEHUSTLE OS...",
        "Neon core initialized.",
        "Connecting to the Grid...",
        "Fetching dankest memes...",
        "AI co-processor online.",
        "Ready for chaos.",
        `USER: ${MOCK_USER_ID} | CREDITS: ${userCredits} $MEME`,
        "SYSTEM READY."
    ];

    useEffect(() => {
        let currentLine = 0;
        let currentChar = 0;
        let fullText = "";

        if (terminalLines.length === 0) return;

        const type = () => {
            if (currentLine < terminalLines.length) {
                if (currentChar < terminalLines[currentLine].length) {
                    fullText += terminalLines[currentLine].charAt(currentChar);
                    setTerminalText(fullText + (currentChar % 2 === 0 ? '_' : ' '));
                    currentChar++;
                    setTimeout(type, 20 + Math.random() * 30);
                } else {
                    fullText += "\n";
                    setTerminalText(fullText);
                    currentLine++;
                    currentChar = 0;
                    setTimeout(type, 100 + Math.random() * 200);
                }
            } else {
                setTerminalText(prev => prev.replace(/(_| )$/, ''));
            }
        };
        type();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userCredits]);

    return (
        <div className="terminal-display">
            {terminalText}
        </div>
    );
};

export default TerminalDisplay;
