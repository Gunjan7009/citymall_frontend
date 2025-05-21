// src/components/layout/AppHeader.js
import React from 'react';
import TerminalDisplay from '../common/TerminalDisplay';
import { APP_TITLE } from '../../utils/constants';

const AppHeader = ({ userCredits }) => (
    <header className="app-header neon-shadow-cyan">
        <h1 className="app-title glitch-text">{APP_TITLE}</h1>
        <TerminalDisplay userCredits={userCredits} />
    </header>
);

export default AppHeader;
