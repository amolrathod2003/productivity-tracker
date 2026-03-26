import { useState, useEffect, useContext } from 'react';
import ActivityContext from '../context/ActivityContext';
import { Play, Square, Coffee, Brain } from 'lucide-react';

const WORK_MINS = 25;
const BREAK_MINS = 5;

const Pomodoro = () => {
    const [timeLeft, setTimeLeft] = useState(WORK_MINS * 60);
    const [isRunning, setIsRunning] = useState(false);
    const [mode, setMode] = useState('work');
    const [title, setTitle] = useState('Pomodoro Session');
    const { addActivity } = useContext(ActivityContext);

    useEffect(() => {
        let interval;
        if (isRunning && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft(prev => prev - 1);
            }, 1000);
        } else if (timeLeft === 0 && isRunning) {
            handleComplete();
        }
        return () => clearInterval(interval);
    }, [isRunning, timeLeft]);

    const handleComplete = async () => {
        setIsRunning(false);
        if (mode === 'work') {
            alert('Pomodoro done! Time for a break.');
            try {
                await addActivity({ title, duration: WORK_MINS * 60, category: 'Study', type: 'Pomodoro' });
            } catch (e) {
                console.log('failed to save pomodoro:', e);
            }
            switchMode('break');
        } else {
            alert('Break over! Back to work.');
            switchMode('work');
        }
    };

    const switchMode = (newMode) => {
        setMode(newMode);
        setTimeLeft(newMode === 'work' ? WORK_MINS * 60 : BREAK_MINS * 60);
        setIsRunning(false);
    };

    const handleStartStop = () => setIsRunning(!isRunning);

    const formatTime = (totalSeconds) => {
        const m = Math.floor(totalSeconds / 60);
        const s = totalSeconds % 60;
        return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    return (
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.25rem', color: mode === 'work' ? '#ef4444' : '#22c55e', marginBottom: '1rem' }}>
                {mode === 'work' ? <Brain size={24}/> : <Coffee size={24} />} 
                {mode === 'work' ? 'Pomodoro Focus' : 'Short Break'}
            </h3>
            
            <div style={{ fontSize: '4rem', fontWeight: 'bold', marginBottom: '1.5rem', fontFamily: 'monospace' }}>
                {formatTime(timeLeft)}
            </div>

            {mode === 'work' && (
                <input 
                    type="text" 
                    placeholder="Focus task..." 
                    className="form-input" 
                    style={{ marginBottom: '1rem' }}
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)}
                />
            )}

            <div style={{ display: 'flex', gap: '1rem', width: '100%', marginBottom: '1rem' }}>
                <button 
                    className={`btn ${isRunning ? 'btn-secondary' : (mode === 'work' ? 'btn-danger' : 'btn-primary')}`} 
                    onClick={handleStartStop}
                >
                    {isRunning ? <><Square size={18}/> Pause</> : <><Play size={18}/> Start</>}
                </button>
            </div>

            <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
                <button className="btn btn-secondary" style={{ padding: '0.5rem', fontSize: '0.875rem' }} onClick={() => switchMode('work')}>Work Mode</button>
                <button className="btn btn-secondary" style={{ padding: '0.5rem', fontSize: '0.875rem' }} onClick={() => switchMode('break')}>Break Mode</button>
            </div>
        </div>
    );
};

export default Pomodoro;
