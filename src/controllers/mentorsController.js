import Users from '../models/authModel';

class MentorsController {
  static allMentors(req, res) {
    const mentors = Users.find((value) => value.level === 'Mentor');

    if (!mentors) {
      return res.status(404).json({
        status: 404,
        message: 'No mentors found',
      });
    }
    return res.status(200).json({
      status: 200,
      message: 'Mentors',
      data: mentors,
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

export default MentorsController;
