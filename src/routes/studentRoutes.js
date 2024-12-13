const express = require('express');
const router = express.Router();
const studentService = require('../services/studentService');
const logger = require('../utils/logger');

router.post('/', async (req, res) => {
  try {
    const studentId = await studentService.insertStudent(req.body);
    res.status(201).json({ studentId });
  } catch (err) {
    logger.error('Error creating student:', err.message);
    res.status(500).json({ error: 'Failed to create student' });
  }
});

router.get('/department/:departmentId', async (req, res) => {
  try {
    const students = await studentService.getStudentsByDepartment(parseInt(req.params.departmentId));
    res.json(students);
  } catch (err) {
    logger.error('Error fetching students:', err.message);
    res.status(500).json({ error: 'Failed to fetch students' });
  }
});

router.get('/:studentId', async (req, res) => {
  try {
    const student = await studentService.getStudentById(req.params.studentId);
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }
    res.json(student);
  } catch (err) {
    logger.error('Error fetching student:', err.message);
    res.status(500).json({ error: 'Failed to fetch student' });
  }
});

module.exports = router;