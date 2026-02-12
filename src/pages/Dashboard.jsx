import React, { useEffect, useState } from 'react';
import api from '../services/api';
import Layout from '../components/Layout';
import Loader from '../components/Loader';
import Button from '../components/Button';
import { Mail, Briefcase, MapPin, RefreshCw, AlertTriangle, Users, Activity, Globe2, TrendingUp, ExternalLink, Phone } from 'lucide-react';

const Dashboard = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);

    // Realistic data overlay mapped by JSONPlaceholder user id
    const realisticProfiles = {
        1: { name: 'Aarav Sharma', username: 'aarav.sharma', email: 'aarav.sharma@techcorp.in', phone: '+91 98765 43210', company: { name: 'TechCorp Solutions', catchPhrase: 'Innovating Digital Experiences', bs: 'tech' }, address: { city: 'Mumbai', street: 'Andheri West' }, website: 'techcorp.in' },
        2: { name: 'Priya Patel', username: 'priya.patel', email: 'priya.patel@designhub.co', phone: '+91 91234 56789', company: { name: 'DesignHub Studios', catchPhrase: 'Crafting Pixel-Perfect Designs', bs: 'design' }, address: { city: 'Bangalore', street: 'Koramangala' }, website: 'designhub.co' },
        3: { name: 'Rohit Mehta', username: 'rohit.mehta', email: 'rohit.m@cloudnine.dev', phone: '+91 87654 32109', company: { name: 'CloudNine Technologies', catchPhrase: 'Scaling Businesses to the Cloud', bs: 'cloud' }, address: { city: 'Hyderabad', street: 'HITEC City' }, website: 'cloudnine.dev' },
        4: { name: 'Ananya Gupta', username: 'ananya.gupta', email: 'ananya@datawise.io', phone: '+91 99887 76543', company: { name: 'DataWise Analytics', catchPhrase: 'Turning Data Into Decisions', bs: 'analytics' }, address: { city: 'Delhi', street: 'Connaught Place' }, website: 'datawise.io' },
        5: { name: 'Vikram Singh', username: 'vikram.singh', email: 'vikram.s@nexagen.com', phone: '+91 78901 23456', company: { name: 'NexaGen Systems', catchPhrase: 'Next-Generation IT Solutions', bs: 'systems' }, address: { city: 'Pune', street: 'Hinjewadi' }, website: 'nexagen.com' },
        6: { name: 'Sneha Reddy', username: 'sneha.reddy', email: 'sneha.r@brightspark.in', phone: '+91 90123 45678', company: { name: 'BrightSpark Media', catchPhrase: 'Lighting Up Digital Marketing', bs: 'media' }, address: { city: 'Chennai', street: 'T. Nagar' }, website: 'brightspark.in' },
        7: { name: 'Arjun Nair', username: 'arjun.nair', email: 'arjun@codeforge.dev', phone: '+91 81234 56780', company: { name: 'CodeForge Labs', catchPhrase: 'Building Tomorrow\'s Software Today', bs: 'software' }, address: { city: 'Kochi', street: 'Marine Drive' }, website: 'codeforge.dev' },
        8: { name: 'Kavya Iyer', username: 'kavya.iyer', email: 'kavya.i@pixelcraft.co', phone: '+91 70987 65432', company: { name: 'PixelCraft Interactive', catchPhrase: 'Where Creativity Meets Technology', bs: 'creative' }, address: { city: 'Jaipur', street: 'MI Road' }, website: 'pixelcraft.co' },
        9: { name: 'Raj Malhotra', username: 'raj.malhotra', email: 'raj.m@swiftlogic.in', phone: '+91 85432 10987', company: { name: 'SwiftLogic Consulting', catchPhrase: 'Accelerating Business Growth', bs: 'consulting' }, address: { city: 'Gurgaon', street: 'Cyber City' }, website: 'swiftlogic.in' },
        10: { name: 'Meera Joshi', username: 'meera.joshi', email: 'meera@innovest.co.in', phone: '+91 92345 67890', company: { name: 'InnoVest Technologies', catchPhrase: 'Invest in Innovation, Reap the Future', bs: 'fintech' }, address: { city: 'Ahmedabad', street: 'SG Highway' }, website: 'innovest.co.in' },
    };

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Good Morning';
        if (hour < 18) return 'Good Afternoon';
        return 'Good Evening';
    };

    const fetchUsers = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await api.get(`${import.meta.env.VITE_DATA_API_URL}/users`);
            // Map API data with realistic profiles
            const enhancedUsers = response.data.map(user => ({
                ...user,
                ...(realisticProfiles[user.id] || {}),
            }));
            setUsers(enhancedUsers);
        } catch (err) {
            console.error('Failed to fetch data', err);
            setError('Failed to load user data. Please check your connection.');
        } finally {
            setTimeout(() => setLoading(false), 800);
        }
    };


    useEffect(() => {
        fetchUsers();
    }, []);

    const stats = [
        {
            label: 'Total Members',
            value: users.length,
            icon: Users,
            color: 'indigo',
            gradient: 'from-indigo-500 to-blue-500',
            bgGlow: 'rgba(99, 102, 241, 0.15)',
        },
        {
            label: 'Active Now',
            value: Math.ceil(users.length * 0.7),
            icon: Activity,
            color: 'emerald',
            gradient: 'from-emerald-500 to-teal-500',
            bgGlow: 'rgba(16, 185, 129, 0.15)',
        },
        {
            label: 'Companies',
            value: [...new Set(users.map(u => u.company?.name))].filter(Boolean).length,
            icon: Globe2,
            color: 'purple',
            gradient: 'from-purple-500 to-pink-500',
            bgGlow: 'rgba(168, 85, 247, 0.15)',
        },
        {
            label: 'Growth',
            value: '+24%',
            icon: TrendingUp,
            color: 'amber',
            gradient: 'from-amber-500 to-orange-500',
            bgGlow: 'rgba(245, 158, 11, 0.15)',
        },
    ];

    return (
        <Layout>
            {/* Header Section */}
            <div className="dash-header animate-fade-in">
                <div className="dash-header-left">

                    <h1 className="dash-title">
                        <span className="gradient-text">{getGreeting()}</span>, Team!
                    </h1>
                    <p className="dash-subtitle">
                        Manage your team members and view their contact details in real-time.
                    </p>
                </div>
                <button
                    onClick={fetchUsers}
                    className="dash-refresh-btn"
                    disabled={loading}
                >
                    <RefreshCw size={18} className={loading ? 'spinning' : ''} />
                    Refresh Data
                </button>
            </div>

            {/* Stats Grid */}
            {!loading && !error && (
                <div className="dash-stats-grid">
                    {stats.map((stat, i) => (
                        <div
                            key={i}
                            className="dash-stat-card"
                            style={{
                                animation: `fadeIn 0.5s ease-out forwards ${i * 100}ms`,
                                opacity: 0,
                            }}
                        >
                            <div className="dash-stat-glow" style={{ background: stat.bgGlow }} />
                            <div className={`dash-stat-icon bg-gradient-to-br ${stat.gradient}`}>
                                <stat.icon size={20} className="text-white" />
                            </div>
                            <div className="dash-stat-info">
                                <span className="dash-stat-value">{stat.value}</span>
                                <span className="dash-stat-label">{stat.label}</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Main Content */}
            {loading ? (
                <div className="dash-loading">
                    <div className="dash-loading-inner">
                        <Loader />
                        <p>Loading team data...</p>
                    </div>
                </div>
            ) : error ? (
                <div className="dash-error">
                    <div className="dash-error-icon">
                        <AlertTriangle size={32} />
                    </div>
                    <h3>Unavailable</h3>
                    <p>{error}</p>
                    <Button onClick={fetchUsers} className="btn-primary">Try Again</Button>
                </div>
            ) : (
                <div className="dash-users-grid">
                    {users.map((user, index) => (
                        <div
                            key={user.id}
                            className={`dash-user-card ${selectedUser === user.id ? 'dash-user-card-active' : ''}`}
                            style={{ animation: `fadeIn 0.5s ease-out forwards ${index * 80}ms`, opacity: 0 }}
                            onClick={() => setSelectedUser(selectedUser === user.id ? null : user.id)}
                        >
                            {/* Card Banner */}
                            <div className="dash-card-banner">
                                <div className="dash-card-banner-pattern" />
                                <div className={`dash-card-status ${index % 3 === 0 ? 'online' : 'offline'}`}
                                    title={index % 3 === 0 ? 'Online' : 'Offline'}
                                />
                            </div>

                            {/* Avatar */}
                            <div className="dash-card-avatar-wrap">
                                <div className="dash-card-avatar">
                                    {user.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                                </div>
                            </div>

                            {/* Info */}
                            <div className="dash-card-body">
                                <div className="dash-card-name-section">
                                    <h3 className="dash-card-name">{user.name}</h3>
                                    <p className="dash-card-username">@{user.username}</p>
                                </div>

                                <div className="dash-card-details">
                                    <div className="dash-card-detail-row">
                                        <div className="dash-detail-icon indigo">
                                            <Mail size={14} />
                                        </div>
                                        <div className="dash-detail-text">
                                            <span className="dash-detail-label">Email</span>
                                            <span className="dash-detail-value">{user.email}</span>
                                        </div>
                                    </div>

                                    <div className="dash-card-detail-row">
                                        <div className="dash-detail-icon purple">
                                            <Briefcase size={14} />
                                        </div>
                                        <div className="dash-detail-text">
                                            <span className="dash-detail-label">Company</span>
                                            <span className="dash-detail-value">{user.company.name}</span>
                                        </div>
                                    </div>

                                    <div className="dash-card-detail-row">
                                        <div className="dash-detail-icon emerald">
                                            <MapPin size={14} />
                                        </div>
                                        <div className="dash-detail-text">
                                            <span className="dash-detail-label">Location</span>
                                            <span className="dash-detail-value">{user.address.city}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Expanded section */}
                                {selectedUser === user.id && (
                                    <div className="dash-card-expanded">
                                        <div className="dash-card-detail-row">
                                            <div className="dash-detail-icon amber">
                                                <Phone size={14} />
                                            </div>
                                            <div className="dash-detail-text">
                                                <span className="dash-detail-label">Phone</span>
                                                <span className="dash-detail-value">{user.phone}</span>
                                            </div>
                                        </div>
                                        <div className="dash-card-detail-row">
                                            <div className="dash-detail-icon rose">
                                                <Globe2 size={14} />
                                            </div>
                                            <div className="dash-detail-text">
                                                <span className="dash-detail-label">Website</span>
                                                <span className="dash-detail-value">{user.website}</span>
                                            </div>
                                        </div>
                                        <div className="dash-card-catchphrase">
                                            "{user.company.catchPhrase}"
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Bottom gradient line */}
                            <div className="dash-card-bottom-line" />
                        </div>
                    ))}
                </div>
            )}
        </Layout>
    );
};

export default Dashboard;
