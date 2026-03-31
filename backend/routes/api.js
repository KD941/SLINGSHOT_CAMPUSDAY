const express = require('express');
const router = express.Router();
const geminiService = require('../services/geminiService');

// Mock user ID for the initial development phase
const MOCK_USER_ID = 'user_123';

/**
 * @route GET /api/dashboard
 * @desc Get daily summary
 */
router.get('/dashboard', (req, res) => {
    res.json({
        userId: MOCK_USER_ID,
        today: new Date(),
        message: 'Welcome to your daily health dashboard.',
        streak: 5
    });
});

/**
 * @route POST /api/events
 * @desc Sync or add user events (e.g. Marathon, Wedding)
 */
router.post('/events', (req, res) => {
    const { title, date, eventType, description } = req.body;
    // TODO: Save to Firestore
    res.status(201).json({
        message: 'Event saved successfully',
        event: { title, date, eventType, description }
    });
});

/**
 * @route GET /api/analysis
 * @desc Aggregate user data for the health check page
 */
router.get('/analysis', async (req, res) => {
    try {
        const mockHealthData = {
            weightData: [70, 69.5, 69], // kg over the last 3 weeks
            events: ['Marathon next week'],
            fasting: '16:8 schedule'
        };
        const analysis = await geminiService.generateHealthAnalysis(mockHealthData);
        res.json({ analysis });
    } catch (error) {
        res.status(500).json({ error: 'Failed to generate health analysis.' });
    }
});

/**
 * @route GET /api/recommendations/food
 * @desc Generate Food of the Day using Gemini API
 */
router.get('/recommendations/food', async (req, res) => {
    try {
        // Mocking context - eventually derived from Firestore user profile
        const mockContext = {
            upcomingEvents: ['Marathon in 3 days'],
            diet: 'High carb, moderate protein',
            allergies: 'None',
            fastingRoutine: '16:8'
        };
        const foodSuggestion = await geminiService.generateFoodSuggestion(mockContext);
        res.json(foodSuggestion);
    } catch (error) {
        res.status(500).json({ error: 'Failed to generate food suggestion.' });
    }
});

/**
 * @route GET /api/recommendations/exercise
 * @desc Generate fun exercises based on user interval
 */
router.get('/recommendations/exercise', async (req, res) => {
    try {
        const userContext = { lastExercise: '8 hours ago' };
        const exerciseSuggestion = await geminiService.generateExerciseSuggestion(userContext);
        res.json(exerciseSuggestion);
    } catch (error) {
        res.status(500).json({ error: 'Failed to generate exercise suggestion.' });
    }
});

module.exports = router;
