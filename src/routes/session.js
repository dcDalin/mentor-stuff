import express from 'express';
import AuthRequired from '../middleware';
import sessionController from '../controllers/sessionController';

const sessionRouter = express.Router();

sessionRouter.post('/', AuthRequired, sessionController.createMentorshipRequest);
sessionRouter.patch('/:sessionId/accept', AuthRequired, sessionController.acceptMentorshipRequest);
sessionRouter.patch('/:sessionId/reject', AuthRequired, sessionController.rejectMentorshipRequest);
sessionRouter.post('/:sessionId/review', (req, res) => res.send('review posted!'));
sessionRouter.delete('/:sessionId/review', (req, res) => res.send('review deleted!'));
sessionRouter.get('/:userId', (req, res) => res.send('get all mentor-session requests'));
sessionRouter.get('/:mentorId', (req, res) => res.send('get all mentor-session requests'));

export default sessionRouter;
