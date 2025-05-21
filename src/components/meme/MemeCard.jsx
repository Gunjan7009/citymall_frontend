// src/components/meme/MemeCard.js
import React, { useState } from 'react';
import { ChevronUp, ChevronDown, DollarSign, TrendingUp, Image as ImageIcon } from 'lucide-react';
import AIInsights from './AIInsights';
import { MOCK_USER_ID } from '../../utils/constants';

const MemeCard = ({ meme, onBid, onVote, isLoadingAI, onGenerateCaption, onGenerateVibe }) => {
    const [bidInput, setBidInput] = useState('');

    const handleBidSubmit = (e) => {
        e.preventDefault();
        onBid(meme.id, bidInput);
        setBidInput('');
    };

    const isOwner = meme.owner_id === MOCK_USER_ID;
    // Ensure tags is always an array
    const tags = Array.isArray(meme.tags) ? meme.tags : [];

    return (
        <div className="meme-card neon-shadow-cyan glitch-hover-target hover-scale-105">
            <img src={meme.imageUrl} alt={meme.title} className="meme-card-image" onError={(e) => e.target.src = 'https://placehold.co/400x300/000000/FF00FF?text=GLITCHED'} />
            <div className="meme-card-content">
                <h3 className="meme-card-title glitch-text-subtle">{meme.title}</h3>
                <div className="meme-card-tags">
                    {tags.map(tag => (
                        <span key={tag} className="meme-card-tag">#{tag}</span>
                    ))}
                </div>

                <div className="meme-card-info">
                    <p><ImageIcon className="icon icon-sm" /> Owner: <span className="highlight">{isOwner ? `${meme.owner_id} (You)` : meme.owner_id}</span></p>
                    <p><DollarSign className="icon icon-sm" /> Highest Bid: <span className="highlight">{meme.highestBid} $MEME by {meme.highestBidder || 'N/A'}</span></p>
                </div>

                <AIInsights
                    meme={meme}
                    isLoadingAI={isLoadingAI}
                    onGenerateCaption={onGenerateCaption}
                    onGenerateVibe={onGenerateVibe}
                />

                {!isOwner && (
                    <form onSubmit={handleBidSubmit} className="meme-card-bid-form">
                        <input type="number" value={bidInput} onChange={(e) => setBidInput(e.target.value)}
                            className="meme-card-bid-input"
                            placeholder="Bid amount" />
                        <button type="submit" className="cyberpunk-button-small btn-green">
                            <DollarSign className="icon icon-sm icon-mr-1" />Bid
                        </button>
                    </form>
                )}

                <div className="meme-card-actions">
                    <div className="meme-card-vote-buttons">
                        <button onClick={() => onVote(meme.id, 'up')} className="cyberpunk-button-small btn-blue">
                            <ChevronUp className="icon icon-md icon-mr-1" /> Upvote
                        </button>
                        <button onClick={() => onVote(meme.id, 'down')} className="cyberpunk-button-small btn-red">
                            <ChevronDown className="icon icon-md icon-mr-1" /> Downvote
                        </button>
                    </div>
                    <div className="meme-card-upvotes">
                        <TrendingUp className="icon icon-md icon-mr-1" /> {meme.upvotes}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MemeCard;
