import { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

function Students() {
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({
    department: 1,
    course: 1,
    student_id: '',
    first_name: '',
    last_name: '',
    email: '',
    age: '',
    enrollment_date: new Date().toISOString()
  });

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/students');
      setStudents(response.data);
    } catch (error) {
      toast.error('Failed to fetch students');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/students', newStudent);
      toast.success('Student added successfully');
      fetchStudents();
      setNewStudent({
        department: 1,
        course: 1,
        student_id: '',
        first_name: '',
        last_name: '',
        email: '',
        age: '',
        enrollment_date: new Date().toISOString()
      });
    } catch (error) {
      toast.error('Failed to add student');
    }
  };

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold mb-4">Add New Student</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="First Name"
            className="border p-2 rounded"
            value={newStudent.first_name}
            onChange={(e) => setNewStudent({ ...newStudent, first_name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Last Name"
            className="border p-2 rounded"
            value={newStudent.last_name}
            onChange={(e) => setNewStudent({ ...newStudent, last_name: e.target.value })}
          />
          <input
            type="email"
            placeholder="Email"
            className="border p-2 rounded"
            value={newStudent.email}
            onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
          />
          <input
            type="number"
            placeholder="Age"
            className="border p-2 rounded"
            value={newStudent.age}
            onChange={(e) => setNewStudent({ ...newStudent, age: parseInt(e.target.value) })}
          />
          <button
            type="submit"
            className="col-span-2 bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
          >
            Add Student
          </button>
        </form>
      </div>

      <div className="bg-white rounded-lg shadow">
        <h2 className="text-2xl font-bold p-6 border-b">Students List</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Age</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Department</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Course</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {students.map((student) => (
                <tr key={student.student_id}>
                  <td className="px-6 py-4">{student.student_id}</td>
                  <td className="px-6 py-4">{`${student.first_name} ${student.last_name}`}</td>
                  <td className="px-6 py-4">{student.email}</td>
                  <td className="px-6 py-4">{student.age}</td>
                  <td className="px-6 py-4">{student.department}</td>
                  <td className="px-6 py-4">{student.course}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Students;