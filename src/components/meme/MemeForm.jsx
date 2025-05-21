// src/components/meme/MemeForm.js
import React, { useState } from 'react';
import { Zap, PlusCircle } from 'lucide-react';

const MemeForm = ({ onCreateMeme, addNotification }) => {
    const [title, setTitle] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [tags, setTags] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const trimmedTitle = title.trim();
        const trimmedImageUrl = imageUrl.trim();

        if (!trimmedTitle) {
            addNotification("Title is required to create a meme.", 'error');
            return;
        }

        // Always provide a default image URL if empty
        const finalImageUrl = trimmedImageUrl || `https://picsum.photos/seed/${Date.now()}/400/300`;

        onCreateMeme({
            title: trimmedTitle,
            imageUrl: finalImageUrl,
            tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag)
        });

        // Reset form
        setTitle('');
        setImageUrl('');
        setTags('');
    };

    return (
        <div className="meme-form-container neon-shadow-pink">
            <h2 className="form-title glitch-text">
                <PlusCircle className="icon icon-lg icon-mr-3 animate-pulse" />
                CREATE NEW MEME //
            </h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title" className="form-label">Title_</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="form-input"
                        placeholder="e.g., Doge HODL"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="imageUrl" className="form-label">Image_URL_ (or_leave_blank_for_random)</label>
                    <input
                        type="text"
                        id="imageUrl"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        className="form-input"
                        placeholder="e.g., https://picsum.photos/200"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="tags" className="form-label">Tags_ (comma_separated)</label>
                    <input
                        type="text"
                        id="tags"
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                        className="form-input"
                        placeholder="e.g., crypto, funny, stonks"
                    />
                </div>
                <button type="submit" className="cyberpunk-button btn-pink w-full">
                    <Zap className="icon icon-md icon-mr-2" />LAUNCH MEME
                </button>
            </form>
        </div>
    );
};

export default MemeForm;
