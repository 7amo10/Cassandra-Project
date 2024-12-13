import { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

function Departments() {
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/departments');
        setDepartments(Array.isArray(response.data) ? response.data : [response.data]);
      } catch (error) {
        toast.error('Failed to fetch departments');
      }
    };

    fetchDepartments();
  }, []);

  return (
    <div className="bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold p-6 border-b">Departments</h2>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Head Professor</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {departments.map((dept) => (
              <tr key={dept.dept_id}>
                <td className="px-6 py-4">{dept.dept_id}</td>
                <td className="px-6 py-4">{dept.dept_name}</td>
                <td className="px-6 py-4">{dept.location}</td>
                <td className="px-6 py-4">{dept.head_professor_id}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Departments;