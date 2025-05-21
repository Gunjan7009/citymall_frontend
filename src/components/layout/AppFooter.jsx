// src/components/layout/AppFooter.js
import React from 'react';
import { MOCK_USER_ID, APP_TITLE } from '../../utils/constants';

const AppFooter = ({ userCredits }) => (
    <footer className="app-footer">
        <p>&copy; {new Date().getFullYear()} {APP_TITLE}. All rights reserved (or not, it's a hackathon!).</p>
        <p>Embrace the neon chaos. Ship it. Then iterate.</p>
        <p className="user-info">
            Current User: <span className="highlight-pink">{MOCK_USER_ID}</span> | Credits: <span className="highlight-lime">{userCredits} $MEME</span>
        </p>
    </footer>
);

export default AppFooter;
