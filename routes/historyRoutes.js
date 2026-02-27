import express from 'express';
import History from '../models/History.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// @desc    Get user history
// @route   GET /api/history
// @access  Private
router.get('/', protect, async (req, res) => {
    try {
        const history = await History.find({ userId: req.user._id }).sort({ createdAt: -1 });
        res.status(200).json(history);
    } catch (error) {
        console.error('Fetch History Error:', error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// @desc    Save new component to history
// @route   POST /api/history
// @access  Private
router.post('/', protect, async (req, res) => {
    try {
        const { prompt, framework, code } = req.body;

        if (!prompt || !framework || !code) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const newHistory = await History.create({
            userId: req.user._id,
            prompt,
            framework: framework.value || framework,
            code,
        });

        res.status(201).json(newHistory);
    } catch (error) {
        console.error('Save History Error:', error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// @desc    Delete a history item
// @route   DELETE /api/history/:id
// @access  Private
router.delete('/:id', protect, async (req, res) => {
    try {
        const history = await History.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
        if (!history) {
            return res.status(404).json({ message: 'History item not found' });
        }
        res.status(200).json({ message: 'History item removed' });
    } catch (error) {
        console.error('Delete History Error:', error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// @desc    Sync guest histories from localStorage
// @route   POST /api/history/sync
// @access  Private
router.post('/sync', protect, async (req, res) => {
    try {
        const { guestHistories } = req.body;

        if (!guestHistories || !Array.isArray(guestHistories) || guestHistories.length === 0) {
            return res.status(400).json({ message: 'No valid guest histories provided' });
        }

        // Map through array and attach userId
        const historiesToInsert = guestHistories.map(item => ({
            userId: req.user._id,
            prompt: item.prompt,
            framework: item.framework?.value || item.framework || 'html-css',
            code: item.code,
            createdAt: item.createdAt ? new Date(item.createdAt) : new Date(),
        }));

        // Bulk insert into MongoDB
        const result = await History.insertMany(historiesToInsert);

        res.status(201).json({ message: `Synced ${result.length} guest items`, count: result.length });
    } catch (error) {
        console.error('Sync History Error:', error);
        res.status(500).json({ message: 'Server Error' });
    }
});

export default router;
