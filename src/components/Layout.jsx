import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { LogOut, User, ChevronDown, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Layout = ({ children }) => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [showDropdown, setShowDropdown] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="layout-wrapper">
            {/* Background Orbs */}
            <div className="layout-bg">
                <div className="layout-orb layout-orb-1" />
                <div className="layout-orb layout-orb-2" />
            </div>

            {/* Navbar */}
            <header className="navbar">
                <div className="navbar-inner">
                    {/* Logo */}
                    <div className="navbar-brand">
                        <div className="navbar-logo">
                            <span>A</span>
                            <div className="navbar-logo-glow" />
                        </div>
                        <div className="navbar-brand-text">
                            <span className="navbar-title">ApiAuth</span>
                            <span className="navbar-subtitle">Dashboard</span>
                        </div>
                    </div>

                    {/* Right Side */}
                    <div className="navbar-actions">
                        {user && (
                            <>
                                {/* Status Indicator */}
                                <div className="navbar-status">
                                    <Sparkles size={14} />
                                    <span>System Active</span>
                                </div>

                                {/* User Profile */}
                                <div
                                    className="navbar-profile"
                                    onClick={() => setShowDropdown(!showDropdown)}
                                >
                                    <div className="navbar-avatar">
                                        <User size={16} />
                                    </div>
                                    <div className="navbar-user-info">
                                        <span className="navbar-user-name">
                                            {user.email?.split('@')[0] || 'User'}
                                        </span>
                                        <span className="navbar-user-email">{user.email}</span>
                                    </div>
                                    <ChevronDown
                                        size={14}
                                        className={`navbar-chevron ${showDropdown ? 'rotated' : ''}`}
                                    />

                                    {/* Dropdown */}
                                    {showDropdown && (
                                        <div className="navbar-dropdown">
                                            <div className="navbar-dropdown-header">
                                                <div className="navbar-dropdown-avatar">
                                                    <User size={20} />
                                                </div>
                                                <div>
                                                    <p className="navbar-dropdown-name">
                                                        {user.email?.split('@')[0] || 'User'}
                                                    </p>
                                                    <p className="navbar-dropdown-email">{user.email}</p>
                                                </div>
                                            </div>
                                            <div className="navbar-dropdown-divider" />
                                            <button
                                                className="navbar-logout-btn"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleLogout();
                                                }}
                                            >
                                                <LogOut size={16} />
                                                Sign Out
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </header>

            <main className="layout-main animate-fade-in">
                {children}
            </main>
        </div>
    );
};

export default Layout;
