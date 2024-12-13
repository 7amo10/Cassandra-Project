const express = require('express');
const router = express.Router();
const courseService = require('../services/courseService');
const logger = require('../utils/logger');

router.get('/', async (req, res) => {
  try {
    const { department } = req.query;
    const courses = await courseService.getCoursesByDepartment(parseInt(department) || 1);
    res.json(courses);
  } catch (err) {
    logger.error('Error fetching courses:', err.message);
    res.status(500).json({ error: 'Failed to fetch courses' });
  }
});

module.exports = router;