const express = require('express');
const router = express.Router();
const enrollmentService = require('../services/enrollmentService');
const logger = require('../utils/logger');

router.get('/', async (req, res) => {
  try {
    const { studentId } = req.query;
    const enrollments = await enrollmentService.getEnrollmentsByStudent(parseInt(studentId));
    res.json(enrollments);
  } catch (err) {
    logger.error('Error fetching enrollments:', err.message);
    res.status(500).json({ error: 'Failed to fetch enrollments' });
  }
});

module.exports = router;