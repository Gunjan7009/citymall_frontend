// src/App.js
import React, { useState, useEffect, useCallback } from 'react';
import { memeApi } from './services/api';

import {
  MOCK_USER_ID,
  INITIAL_USER_CREDITS,
  FALLBACK_CAPTIONS,
  FALLBACK_VIBES
} from './utils/constants';
import { getRandomFallback } from './utils/helpers';
import { callGeminiAPI } from './services/geminiService';

import NotificationArea from './components/common/NotificationArea';
import AppHeader from './components/layout/AppHeader';
import AppFooter from './components/layout/AppFooter';
import MemeForm from './components/meme/MemeForm';
import MemeCard from './components/meme/MemeCard';
import Leaderboard from './components/meme/Leaderboard';

import './App.css'; // Import the main CSS file

export default function App() {
  const [memes, setMemes] = useState([]);
  const [userCredits, setUserCredits] = useState(INITIAL_USER_CREDITS);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [leaderboard, setLeaderboard] = useState([]);
  const [isLoadingAI, setIsLoadingAI] = useState({});
  const [notifications, setNotifications] = useState([]);

  // Fetch memes when component mounts
  useEffect(() => {
    const fetchMemes = async () => {
      try {
        const memesData = await memeApi.getAllMemes();
        setMemes(memesData);
      } catch (error) {
        console.error('Error fetching memes:', error);
        addNotification("Failed to fetch memes. Please try again.", 'error');
      }
    };
    fetchMemes();
  }, []);

  const addNotification = useCallback((message, type = 'info') => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 3000);
  }, []);

  const generateAICaption = useCallback(async (memeId, title, tags) => {
    setIsLoadingAI(prev => ({ ...prev, [`caption-${memeId}`]: true }));
    const prompt = `Generate a short, witty, and funny cyberpunk-themed caption for a meme titled "${title}" with tags: ${tags}. Keep it under 15 words.`;
    const caption = await callGeminiAPI(prompt);
    setMemes(prevMemes =>
      prevMemes.map(meme =>
        meme.id === memeId ? { ...meme, aiCaption: caption || getRandomFallback(FALLBACK_CAPTIONS) } : meme
      )
    );
    setIsLoadingAI(prev => ({ ...prev, [`caption-${memeId}`]: false }));
    if (caption) addNotification(`AI caption generated for "${title}"!`, 'success');
    else addNotification(`AI caption failed for "${title}", using fallback.`, 'warn');
  }, [addNotification]);

  const generateAIVibe = useCallback(async (memeId, title, tags) => {
    setIsLoadingAI(prev => ({ ...prev, [`vibe-${memeId}`]: true }));
    const prompt = `Describe the "vibe" of a meme titled "${title}" with tags: ${tags}. Use 2-4 evocative cyberpunk or internet culture adjectives. Example: "Neon Crypto Chaos" or "Glitchy Doge Energy".`;
    const vibe = await callGeminiAPI(prompt);
    setMemes(prevMemes =>
      prevMemes.map(meme =>
        meme.id === memeId ? { ...meme, aiVibe: vibe || getRandomFallback(FALLBACK_VIBES) } : meme
      )
    );
    setIsLoadingAI(prev => ({ ...prev, [`vibe-${memeId}`]: false }));
    if (vibe) addNotification(`AI vibe analyzed for "${title}"!`, 'success');
    else addNotification(`AI vibe analysis failed for "${title}", using fallback.`, 'warn');
  }, [addNotification]);

  const handleCreateMeme = useCallback(async (newMemeData) => {
    try {
      const createdMeme = await memeApi.createMeme({
        title: newMemeData.title,
        imageUrl: newMemeData.imageUrl, // The API service will convert this to image_url
        tags: newMemeData.tags
      });

      if (createdMeme) {
        setMemes(prevMemes => [createdMeme, ...prevMemes]);
        setShowCreateForm(false);
        addNotification(`Meme "${createdMeme.title}" created! Let the hustle begin.`, 'success');
        generateAICaption(createdMeme.id, createdMeme.title, createdMeme.tags.join(', '));
        generateAIVibe(createdMeme.id, createdMeme.title, createdMeme.tags.join(', '));
      }
    } catch (error) {
      console.error('Create meme error:', error);
      addNotification(error.response?.data?.error || "Failed to create meme. Please try again.", 'error');
    }
  }, [addNotification, generateAICaption, generateAIVibe]);

  const handleBid = useCallback(async (memeId, bidAmount) => {
    const bidValue = parseInt(bidAmount);
    if (isNaN(bidValue) || bidValue <= 0) {
      addNotification("Invalid bid amount.", 'error');
      return;
    }
    if (bidValue > userCredits) {
      addNotification("Not enough credits!", 'error');
      return;
    }

    try {
      const response = await fetch(`http://localhost:3001/api/memes/${memeId}/bid`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ credits: bidValue }),
      });

      if (!response.ok) {
        throw new Error('Bid failed');
      }

      const data = await response.json();
      setMemes(prevMemes =>
        prevMemes.map(meme =>
          meme.id === memeId ? { ...meme, highestBid: bidValue, highestBidder: MOCK_USER_ID } : meme
        )
      );
      setUserCredits(prevCredits => prevCredits - bidValue);
      addNotification(`You are the highest bidder for "${data.meme.title}" with ${bidValue} $MEME!`, 'success');
    } catch (error) {
      console.error('Error placing bid:', error);
      addNotification("Failed to place bid. Please try again.", 'error');
    }
  }, [userCredits, addNotification]);

  const handleVote = useCallback(async (memeId, voteType) => {
    try {
      const response = await fetch(`http://localhost:3001/api/memes/${memeId}/vote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ voteType }),
      });

      if (!response.ok) {
        throw new Error('Vote failed');
      }

      const updatedMeme = await response.json();
      setMemes(prevMemes =>
        prevMemes.map(meme =>
          meme.id === memeId ? { ...meme, upvotes: updatedMeme.upvotes } : meme
        )
      );
      addNotification(`Voted ${voteType} on the meme!`, 'info');
    } catch (error) {
      console.error('Error voting:', error);
      addNotification("Failed to register vote. Please try again.", 'error');
    }
  }, [addNotification]);

  useEffect(() => {
    const sortedMemes = [...memes].sort((a, b) => b.upvotes - a.upvotes);
    setLeaderboard(sortedMemes.slice(0, 10));
  }, [memes]);

  return (
    <div className="cyberpunk-bg"> {/* Applied to the root div */}
      <NotificationArea notifications={notifications} />
      <div className="app-container"> {/* Added container for padding and max-width */}
        <AppHeader userCredits={userCredits} />

        <main>
          <div className="creator-mode-toggle-container">
            <button
              onClick={() => setShowCreateForm(!showCreateForm)}
              className="cyberpunk-button btn-purple"
            >
              {showCreateForm ? 'CLOSE CREATOR_MODE //' : 'ACTIVATE CREATOR_MODE +'}
            </button>
          </div>

          {showCreateForm && <MemeForm onCreateMeme={handleCreateMeme} addNotification={addNotification} />}

          <div className="main-content-grid">
            {memes.map(meme => (
              <MemeCard
                key={meme.id}
                meme={meme}
                onBid={handleBid}
                onVote={handleVote}
                isLoadingAI={isLoadingAI}
                onGenerateCaption={generateAICaption}
                onGenerateVibe={generateAIVibe}
              />
            ))}
          </div>

          <Leaderboard leaderboardData={leaderboard} />
        </main>
        <AppFooter userCredits={userCredits} />
      </div>
    </div>
  );
}
