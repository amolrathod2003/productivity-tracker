const Activity = require('../models/Activity');

// get all activities for logged in user
const getActivities = async (req, res) => {
    try {
        const activities = await Activity.find({ user: req.user.id }).sort({ createdAt: -1 });
        res.json(activities);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Could not fetch activities' });
    }
};

// save a new activity
const addActivity = async (req, res) => {
    try {
        const { title, duration, category, type } = req.body;

        if (!title || duration === undefined) {
            return res.status(400).json({ message: 'Title and duration are required' });
        }

        const activity = await Activity.create({
            user: req.user.id,
            title,
            duration,
            category,
            type
        });

        res.status(201).json(activity);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Could not save activity' });
    }
};

module.exports = { getActivities, addActivity };
