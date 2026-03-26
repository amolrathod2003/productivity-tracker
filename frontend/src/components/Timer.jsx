import { useState, useEffect, useContext } from 'react';
import ActivityContext from '../context/ActivityContext';
import { Play, Square, Save } from 'lucide-react';

const Timer = () => {
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('Study');
    const { addActivity } = useContext(ActivityContext);

    useEffect(() => {
        let interval;
        if (isRunning) {
            interval = setInterval(() => {
                setTime((prev) => prev + 1);
            }, 1000);
        } else {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isRunning]);

    const handleStartStop = () => setIsRunning(!isRunning);

    const handleSave = async () => {
        if (!title) return alert("Please enter a task title!");
        if (time === 0) return alert("Timer hasn't started yet!");
        
        setIsRunning(false);
        try {
            await addActivity({ title, duration: time, category, type: 'Timer' });
            setTime(0);
            setTitle('');
        } catch (err) {
            alert("Couldn't save activity");
        }
    };

    const formatTime = (s) => {
        const h = Math.floor(s / 3600);
        const m = Math.floor((s % 3600) / 60);
        const sec = s % 60;
        return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
    };

    return (
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h3 style={{ fontSize: '1.25rem', color: 'var(--accent)', marginBottom: '1rem' }}>Stopwatch</h3>
            
            <div style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '1.5rem', fontFamily: 'monospace' }}>
                {formatTime(time)}
            </div>

            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', width: '100%' }}>
                <input 
                    type="text" 
                    placeholder="Task name..." 
                    className="form-input" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)}
                />
                <select className="form-input" style={{ width: '150px' }} value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option>Study</option>
                    <option>Coding</option>
                    <option>Work</option>
                    <option>Entertainment</option>
                    <option>Other</option>
                </select>
            </div>

            <div style={{ display: 'flex', gap: '1rem', width: '100%' }}>
                <button 
                    className={`btn ${isRunning ? 'btn-danger' : 'btn-primary'}`} 
                    onClick={handleStartStop}
                >
                    {isRunning ? <><Square size={18}/> Pause</> : <><Play size={18}/> Start</>}
                </button>
                <button className="btn btn-secondary" onClick={handleSave} disabled={isRunning || time === 0}>
                    <Save size={18}/> Save
                </button>
            </div>
        </div>
    );
};

export default Timer;
