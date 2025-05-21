// src/components/meme/Leaderboard.js
import React from 'react';
import { TrendingUp } from 'lucide-react';

const Leaderboard = ({ leaderboardData }) => (
    <div className="leaderboard-container neon-shadow-yellow">
        <h2 className="leaderboard-title glitch-text">
            <TrendingUp className="icon icon-lg icon-mr-3 animate-pulse" />
            TRENDING_MEMES //
        </h2>
        {leaderboardData.length > 0 ? (
            <ol className="leaderboard-list">
                {leaderboardData.map((meme, index) => (
                    <li key={meme.id} className="leaderboard-item">
                        <span className="leaderboard-item-name">
                            {index + 1}. {meme.title}
                        </span>
                        <span className="leaderboard-item-score">{meme.upvotes} Votes</span>
                    </li>
                ))}
            </ol>
        ) : (
            <p className="leaderboard-empty-text">No memes on the leaderboard yet. Go vote!</p>
        )}
    </div>
);

export default Leaderboard;
