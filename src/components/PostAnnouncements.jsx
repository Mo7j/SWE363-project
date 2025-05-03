import React, { useState } from 'react';

const PostAnnouncements = () => {
    const [showTextbox, setShowTextbox] = useState(false);
    const [announcement, setAnnouncement] = useState('');

    const handleButtonClick = () => {
        setShowTextbox(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (announcement.trim()) {
            alert(`Announcement: ${announcement}`);
            setAnnouncement('');
            setShowTextbox(false);
        }
    };

    return (
        <div>
            <button onClick={handleButtonClick}>Post Announcement</button>
            {showTextbox && (
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Type your announcement"
                        value={announcement}
                        onChange={(e) => setAnnouncement(e.target.value)}
                    />
                    <button type="submit">Submit</button>
                </form>
            )}
        </div>
    );
};

export default PostAnnouncements;