import { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

function Enrollments() {
  const [enrollments, setEnrollments] = useState([]);
  const [studentId, setStudentId] = useState('');

  const fetchEnrollments = async () => {
    if (!studentId) return;
    try {
      const response = await axios.get(`http://localhost:5000/api/enrollments?studentId=${studentId}`);
      setEnrollments(response.data);
    } catch (error) {
      toast.error('Failed to fetch enrollments');
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        <input
          type="number"
          placeholder="Enter Student ID"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          className="border p-2 rounded"
        />
        <button
          onClick={fetchEnrollments}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          Search
        </button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <h2 className="text-2xl font-bold p-6 border-b">Enrollments</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Course ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {enrollments.map((enrollment) => (
                <tr key={enrollment.enrollment_id}>
                  <td className="px-6 py-4">{enrollment.enrollment_id}</td>
                  <td className="px-6 py-4">{enrollment.course_id}</td>
                  <td className="px-6 py-4">{new Date(enrollment.enrollment_date).toLocaleDateString()}</td>
                  <td className="px-6 py-4">{enrollment.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Enrollments;