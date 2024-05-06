import React from 'react';
import Navigation from '../ClientHome/Navigation';
import '../ClientHome/ClientHome.css'; // Import associated styles for navbar
import '../Profile/Profile.css'; // Import associated styles

const Profile = () => {
    return (
        <div className="profile">
            {/* Add Navigation Bar */}
            <Navigation />
        </div>
    );
};

export default Profile;