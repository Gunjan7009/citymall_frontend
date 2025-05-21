// src/components/meme/AIInsights.js
import React from 'react';
import { Brain } from 'lucide-react';

const AIInsights = ({ meme, isLoadingAI, onGenerateCaption, onGenerateVibe }) => (
    <div className="ai-insights-container">
        <div className="ai-insights-header">
            <Brain className="icon icon-sm" />
            <h4>AI Insights:</h4>
        </div>
        <p className="ai-insights-text">
            <strong>Caption:</strong> {isLoadingAI[`caption-${meme.id}`] ? <span className="animate-pulse">Generating...</span> : meme.aiCaption}
        </p>
        <p className="ai-insights-text">
            <strong>Vibe:</strong> {isLoadingAI[`vibe-${meme.id}`] ? <span className="animate-pulse">Analyzing...</span> : meme.aiVibe}
        </p>
        <div className="ai-insights-buttons">
            <button
                onClick={() => onGenerateCaption(meme.id, meme.title, meme.tags.join(', '))}
                disabled={isLoadingAI[`caption-${meme.id}`]}
                className="cyberpunk-button-small btn-purple">
                {isLoadingAI[`caption-${meme.id}`] ? 'Working...' : 'Re-Gen Caption'}
            </button>
            <button
                onClick={() => onGenerateVibe(meme.id, meme.title, meme.tags.join(', '))}
                disabled={isLoadingAI[`vibe-${meme.id}`]}
                className="cyberpunk-button-small btn-purple">
                {isLoadingAI[`vibe-${meme.id}`] ? 'Working...' : 'Re-Gen Vibe'}
            </button>
        </div>
    </div>
);

export default AIInsights;
