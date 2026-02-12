import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Input from '../components/Input';
import { LogIn, Lock, Shield, Zap, Globe, Eye, EyeOff } from 'lucide-react';

const Login = () => {
    const [email, setEmail] = useState('summitkumawat888@gmail.com');
    const [password, setPassword] = useState('Sumit@123');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const { login } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePos({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        const result = await login(email, password);
        if (result.success) {
            navigate('/dashboard');
        } else {
            setError(result.message);
            setLoading(false);
        }
    };

    const features = [
        { icon: Shield, title: 'Secure Auth', desc: 'JWT token-based authentication' },
        { icon: Zap, title: 'Lightning Fast', desc: 'Optimized API performance' },
        { icon: Globe, title: 'RESTful API', desc: 'Clean & scalable endpoints' },
    ];

    return (
        <div className="login-page">
            {/* Animated background */}
            <div className="login-bg">
                <div className="login-orb login-orb-1" />
                <div className="login-orb login-orb-2" />
                <div className="login-orb login-orb-3" />
                <div
                    className="login-mouse-glow"
                    style={{
                        left: mousePos.x,
                        top: mousePos.y,
                    }}
                />
                {/* Grid pattern */}
                <div className="login-grid-pattern" />
            </div>

            <div className="login-container">
                {/* Left Side - Branding */}
                <div className="login-left">
                    <div className="login-left-content">
                        <div className="login-brand">
                            <div className="login-logo">
                                <div className="login-logo-icon">
                                    <span>A</span>
                                    <div className="login-logo-ring" />
                                </div>
                                <span className="login-logo-text">ApiAuth</span>
                            </div>
                        </div>

                        <div className="login-hero">
                            <h1 className="login-hero-title">
                                <span className="login-hero-line">Manage Your</span>
                                <span className="login-hero-gradient">Team Seamlessly</span>
                            </h1>
                            <p className="login-hero-desc">
                                A modern API integration dashboard with real-time data, team management, and beautiful analytics.
                            </p>
                        </div>

                        <div className="login-features">
                            {features.map((f, i) => (
                                <div
                                    key={i}
                                    className="login-feature-item"
                                    style={{ animationDelay: `${0.6 + i * 0.15}s` }}
                                >
                                    <div className="login-feature-icon">
                                        <f.icon size={18} />
                                    </div>
                                    <div>
                                        <h4>{f.title}</h4>
                                        <p>{f.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Side - Form */}
                <div className="login-right">
                    <div className="login-form-card">
                        <div className="login-form-header">
                            <div className="login-lock-icon">
                                <Lock size={24} />
                                <div className="login-lock-pulse" />
                            </div>
                            <h2>Welcome Back</h2>
                            <p>Sign in to access your dashboard</p>
                        </div>

                        <form onSubmit={handleSubmit} className="login-form">
                            <div className="login-input-group">
                                <label>Email Address</label>
                                <div className="login-input-wrapper">
                                    <input
                                        type="email"
                                        placeholder="name@example.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        className="login-input"
                                    />
                                </div>
                            </div>

                            <div className="login-input-group">
                                <label>Password</label>
                                <div className="login-input-wrapper">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        className="login-input"
                                    />
                                    <button
                                        type="button"
                                        className="login-eye-btn"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                    </button>
                                </div>
                            </div>

                            {error && (
                                <div className="login-error">
                                    <span>⚠</span> {error}
                                </div>
                            )}

                            <button
                                type="submit"
                                className="login-submit-btn"
                                disabled={loading}
                            >
                                {loading ? (
                                    <div className="login-spinner" />
                                ) : (
                                    <>
                                        <LogIn size={18} />
                                        Sign In
                                    </>
                                )}
                            </button>
                        </form>

                        <div className="login-divider">
                            <span>Demo Credentials</span>
                        </div>

                        <div className="login-demo-info">
                            <div className="login-demo-row">
                                <span className="login-demo-label">Email</span>
                                <code>summitkumawat888@gmail.com</code>
                            </div>
                            <div className="login-demo-row">
                                <span className="login-demo-label">Password</span>
                                <code>Sumit@123</code>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
