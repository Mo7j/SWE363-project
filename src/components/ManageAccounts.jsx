import React, { useState } from 'react';

const ManageAccounts = ({ studentId, isBanned, onToggleBan }) => {
    const [banned, setBanned] = useState(isBanned);

    const handleToggleBan = () => {
        const newStatus = !banned;
        setBanned(newStatus);
        onToggleBan(studentId, newStatus);
    };

    return (
        <button onClick={handleToggleBan} style={{ padding: '10px', margin: '5px' }}>
            {banned ? 'Unban Account' : 'Ban Account'}
        </button>
    );
};

export default ManageAccounts;