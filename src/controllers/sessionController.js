import Sessions from '../models/sessionModel';
import validateMentorSession from '../validations/createMentorshipRequest';

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

  static getSingleMentor(req, res) {
    const { mentorId } = req.params;
    const mentor = Users.find((value) => value.id === Number(mentorId));

    if (!mentor) {
      return res.status(404).json({
        message: 'Error',
        error: 'User not found',
      });
    }
    if (mentor.level === 'Mentor') {
      return res.status(200).json({
        status: 200,
        message: 'Mentor',
        data: mentor,
      });
    }
    return res.status(404).json({
      status: 404,
      message: 'The supplied ID does not belong to a mentor',
    });
  }
}

export default SessionController;
