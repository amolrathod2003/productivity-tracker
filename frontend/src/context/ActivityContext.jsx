import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AuthContext from './AuthContext';

const ActivityContext = createContext();

export const ActivityProvider = ({ children }) => {
    const [activities, setActivities] = useState([]);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        if (user) {
            fetchActivities();
        } else {
            setActivities([]);
        }
    }, [user]);

    const fetchActivities = async () => {
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            const res = await axios.get('http://localhost:5000/api/activities', config);
            setActivities(res.data);
        } catch (err) {
            console.log('Error loading activities:', err);
        }
    };

    const addActivity = async (activityData) => {
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            const res = await axios.post('http://localhost:5000/api/activities', activityData, config);
            setActivities([res.data, ...activities]);
            return res.data;
        } catch (err) {
            console.log('Error saving activity:', err);
            throw err;
        }
    };

    return (
        <ActivityContext.Provider value={{ activities, fetchActivities, addActivity }}>
            {children}
        </ActivityContext.Provider>
    );
};

export default ActivityContext;
