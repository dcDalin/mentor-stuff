import Sessions from '../models/sessionModel';
import validateMentorSession from '../validations/createMentorshipRequest';
import validateSessionAcceptReq from '../validations/validateSessionAcceptReq';

class SessionController {
  static createMentorshipRequest(req, res) {
    const newId = parseInt(Sessions.length, 10) + 1;
    const { id, email } = req.decoded;
    const { mentorId, questions } = req.body;

    const { valid, errors } = validateMentorSession(mentorId);
    if (!valid) {
      return res.status(400).json({
        message: 'Validation errors',
        errors,
      });
    }

    const newSession = {
      sessionId: newId,
      mentorId,
      menteeId: id,
      questions,
      menteeEmail: email,
      status: 'Pending',
    };
    Sessions.push(newSession);

    return res.status(201).json({
      status: 201,
      data: newSession,
    });
  }

  static acceptMentorshipRequest(req, res) {
    const { id } = req.decoded;
    const { sessionId } = req.params;

    const { valid, errors } = validateSessionAcceptReq(id, sessionId);
    if (!valid) {
      return res.status(400).json({
        errors,
      });
    }
    const sessionExists = Sessions.find((item) => item.sessionId === Number(sessionId));

    if (sessionExists.status === 'Accepted') {
      return res.json({
        message: 'Session already accepted',
      });
    }

    sessionExists.status = 'Accepted';
    return res.status(200).json({
      status: '200',
      data: {
        sessionId: sessionExists.id,
        mentorId: sessionExists.mentorId,
        menteeId: sessionExists.menteeId,
        questions: sessionExists.questions,
        menteeEmail: sessionExists.menteeEmail,
        status: 'Accepted',
      },
    });
  }
}

export default SessionController;
