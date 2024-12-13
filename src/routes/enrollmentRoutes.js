const express = require('express');
const router = express.Router();
const enrollmentService = require('../services/enrollmentService');
const logger = require('../utils/logger');

router.post('/', async (req, res) => {
  try {
    const { studentId, courseId } = req.body;
    await enrollmentService.enrollStudentInCourse(studentId, courseId);
    res.status(201).json({ message: 'Enrollment successful' });
  } catch (err) {
    logger.error('Error creating enrollment:', err.message);
    res.status(500).json({ error: 'Failed to create enrollment' });
  }
});

router.get('/student/:studentId', async (req, res) => {
  try {
    const enrollments = await enrollmentService.getStudentEnrollments(req.params.studentId);
    res.json(enrollments);
  } catch (err) {
    logger.error('Error fetching enrollments:', err.message);
    res.status(500).json({ error: 'Failed to fetch enrollments' });
  }
});

module.exports = router;