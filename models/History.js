import mongoose from 'mongoose';

const historySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    prompt: {
        type: String,
        required: true,
    },
    framework: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true,
    }
}, { timestamps: true });

export default mongoose.model('History', historySchema);
