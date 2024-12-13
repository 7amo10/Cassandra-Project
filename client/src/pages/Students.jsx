import { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useApi } from '../hooks/useApi';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

function Students() {
  const { data: students, loading, fetchData: fetchStudents } = useApi('/students');
  const { data: departments } = useApi('/departments');
  const [newStudent, setNewStudent] = useState({
    department_id: 1,
    first_name: '',
    last_name: '',
    email: '',
    age: ''
  });

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/students', newStudent);
      toast.success('Student added successfully');
      fetchStudents();
      setNewStudent({
        department_id: 1,
        first_name: '',
        last_name: '',
        email: '',
        age: ''
      });
    } catch (error) {
      toast.error('Failed to add student');
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold mb-4">Add New Student</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          <Input
            type="text"
            placeholder="First Name"
            value={newStudent.first_name}
            onChange={(e) => setNewStudent({ ...newStudent, first_name: e.target.value })}
            required
          />
          <Input
            type="text"
            placeholder="Last Name"
            value={newStudent.last_name}
            onChange={(e) => setNewStudent({ ...newStudent, last_name: e.target.value })}
            required
          />
          <Input
            type="email"
            placeholder="Email"
            value={newStudent.email}
            onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
            required
          />
          <Input
            type="number"
            placeholder="Age"
            value={newStudent.age}
            onChange={(e) => setNewStudent({ ...newStudent, age: parseInt(e.target.value) })}
            required
          />
          <select
            value={newStudent.department_id}
            onChange={(e) => setNewStudent({ ...newStudent, department_id: parseInt(e.target.value) })}
            className="border p-2 rounded"
            required
          >
            {departments.map((dept) => (
              <option key={dept.department_id} value={dept.department_id}>
                {dept.name}
              </option>
            ))}
          </select>
          <Button type="submit" className="col-span-2">Add Student</Button>
        </form>
      </div>

      <div className="bg-white rounded-lg shadow">
        <h2 className="text-2xl font-bold p-6 border-b">Students List</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Age</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Department</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {students.map((student) => (
                <tr key={student.student_id}>
                  <td className="px-6 py-4">{`${student.first_name} ${student.last_name}`}</td>
                  <td className="px-6 py-4">{student.email}</td>
                  <td className="px-6 py-4">{student.age}</td>
                  <td className="px-6 py-4">{student.department_id}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}