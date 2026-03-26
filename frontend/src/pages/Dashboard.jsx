import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import ActivityContext from '../context/ActivityContext';
import Timer from '../components/Timer';
import Pomodoro from '../components/Pomodoro';
import { LogOut, Activity as ActivityIcon, Clock, List } from 'lucide-react';

const Dashboard = () => {
    const { user, logout } = useContext(AuthContext);
    const { activities, fetchActivities } = useContext(ActivityContext);
    const navigate = useNavigate();

    useEffect(() => {
        fetchActivities();
    }, []);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    // format seconds into readable string like "1h 23m" or "5m 30s"
    const formatDuration = (seconds) => {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        if (h > 0) return `${h}h ${m}m`;
        return `${m}m ${seconds % 60}s`;
    };

    return (
        <>
            <nav className="navbar">
                <div className="brand">
                    <ActivityIcon size={24} />
                    <span>DevTrack Dashboard</span>
                </div>
                <div className="nav-links">
                    <span>Welcome, {user?.name}</span>
                    <button onClick={handleLogout} className="btn btn-secondary" style={{ padding: '0.4rem 1rem', fontSize: '0.9rem', width: 'auto' }}>
                        <LogOut size={16} /> Logout
                    </button>
                </div>
            </nav>

            <div className="container" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
                
                {/* timer cards */}
                <div className="dashboard-grid" style={{ marginBottom: '1.5rem' }}>
                    <Timer />
                    <Pomodoro />
                </div>

                {/* activity log */}
                <div className="glass-card" style={{ marginTop: '2rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
                        <List size={24} />
                        <h2 style={{ marginBottom: 0 }}>Recent Activity History</h2>
                    </div>
                    
                    {activities.length === 0 ? (
                        <p style={{ textAlign: 'center', padding: '1.5rem 0' }}>No activities recorded yet. Start a timer above!</p>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {activities.map((act) => (
                                <div key={act._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', backgroundColor: 'rgba(255,255,255,0.02)', borderRadius: '0.5rem', border: '1px solid var(--glass-border)' }}>
                                    <div>
                                        <div style={{ fontWeight: '600', fontSize: '1.1rem', marginBottom: '0.25rem' }}>{act.title}</div>
                                        <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                                            <span style={{ display: 'inline-block', padding: '0.1rem 0.5rem', backgroundColor: 'var(--bg-primary)', borderRadius: '1rem', marginRight: '0.5rem', border: '1px solid var(--glass-border)' }}>
                                                {act.category}
                                            </span>
                                            <span style={{ display: 'inline-block', padding: '0.1rem 0.5rem', backgroundColor: 'rgba(99, 102, 241, 0.2)', color: 'var(--accent)', borderRadius: '1rem', marginRight: '0.5rem' }}>
                                                {act.type}
                                            </span>
                                            {new Date(act.date).toLocaleDateString()}
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent)', fontWeight: 'bold', fontSize: '1.125rem' }}>
                                        <Clock size={18} /> {formatDuration(act.duration)}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

            </div>
        </>
    );
};

export default Dashboard;
