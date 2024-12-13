import { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

function Courses() {
  const [courses, setCourses] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState(1);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/courses?department=${selectedDepartment}`);
        setCourses(response.data);
      } catch (error) {
        toast.error('Failed to fetch courses');
      }
    };

    fetchCourses();
  }, [selectedDepartment]);

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        <label className="font-medium">Department:</label>
        <select
          value={selectedDepartment}
          onChange={(e) => setSelectedDepartment(e.target.value)}
          className="border p-2 rounded"
        >
          {[...Array(10)].map((_, i) => (
            <option key={i + 1} value={i + 1}>
              Department {i + 1}
            </option>
          ))}
        </select>
      </div>

      <div className="bg-white rounded-lg shadow">
        <h2 className="text-2xl font-bold p-6 border-b">Courses</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Code</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Credits</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Semester</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Year</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {courses.map((course) => (
                <tr key={course.course_id}>
                  <td className="px-6 py-4">{course.course_id}</td>
                  <td className="px-6 py-4">{course.course_code}</td>
                  <td className="px-6 py-4">{course.title}</td>
                  <td className="px-6 py-4">{course.credits}</td>
                  <td className="px-6 py-4">{course.semester}</td>
                  <td className="px-6 py-4">{course.year}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Courses;