const express = require('express');
const router = express.Router();
const studentService = require('../services/studentService');
const logger = require('../utils/logger');

router.get('/', async (req, res) => {
  try {
    const { department, course } = req.query;
    const students = await studentService.getStudentsByDepartmentAndCourse(
      parseInt(department) || 1,
      parseInt(course) || 1
    );
    res.json(students);
  } catch (err) {
    logger.error('Error fetching students:', err.message);
    res.status(500).json({ error: 'Failed to fetch students' });
  }
});

router.post('/', async (req, res) => {
  try {
    const student = req.body;
    await studentService.insertStudents([student]);
    res.status(201).json({ message: 'Student created successfully' });
  } catch (err) {
    logger.error('Error creating student:', err.message);
    res.status(500).json({ error: 'Failed to create student' });
  }
});

module.exports = router;