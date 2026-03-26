import { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { LogIn } from 'lucide-react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login, user } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) navigate('/dashboard');
    }, [user, navigate]);

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
        }
    };

    return (
        <div className="auth-wrapper">
            <div className="auth-form-container glass-card">
                <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                    <h1 className="brand" style={{ justifyContent: 'center', marginBottom: '0.5rem' }}><LogIn size={32} /> DevTrack</h1>
                    <p>Log in to access your dashboard</p>
                </div>
                
                {error && <div className="error-message">{error}</div>}
                
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <label className="form-label">Email Address</label>
                        <input
                            type="email"
                            className="form-input"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                        <label className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-input"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Sign In</button>
                </form>
                
                <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
                    <p>Don't have an account? <Link to="/register" className="link">Register</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Login;
