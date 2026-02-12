import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('auth_token'));
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check for persisted token on mount
        const storedToken = localStorage.getItem('auth_token');
        const storedEmail = localStorage.getItem('auth_email');
        const storedName = localStorage.getItem('auth_name');
        if (storedToken) {
            setUser({ email: storedEmail || 'summitkumawat888@gmail.com', name: storedName || 'Sumit Kumawat' });
            setToken(storedToken);
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        try {
            // Mock login for demo purposes (ReqRes can be flaky or blocked)
            if (email === 'summitkumawat888@gmail.com' && password === 'Sumit@123') {
                const mockToken = 'mock-reqres-token-QpwL5tke4Pnpja7X4';
                localStorage.setItem('auth_token', mockToken);
                localStorage.setItem('auth_email', email);
                localStorage.setItem('auth_name', 'Sumit Kumawat');
                setToken(mockToken);
                setUser({ email, name: 'Sumit Kumawat' });
                return { success: true };
            }

            // Using ReqRes API for authentication
            const response = await axios.post(`${import.meta.env.VITE_AUTH_API_URL}/login`, {
                email,
                password,
            });

            if (response.data.token) {
                const newToken = response.data.token;
                localStorage.setItem('auth_token', newToken);
                localStorage.setItem('auth_email', email);
                localStorage.setItem('auth_name', 'Sumit Kumawat');
                setToken(newToken);
                setUser({ email, name: 'Sumit Kumawat' });
                return { success: true };
            }
        } catch (error) {
            console.error('Login failed:', error);
            return {
                success: false,
                message: error.response?.data?.error || 'Login failed. Please check your credentials.'
            };
        }
    };

    const logout = () => {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('auth_email');
        localStorage.removeItem('auth_name');
        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout, isAuthenticated: !!token, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
