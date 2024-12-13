import { useEffect } from 'react';
import { useApi } from '../hooks/useApi';
import Table from '../components/ui/Table';

function Departments() {
  const { data: departments, loading, fetchData } = useApi('/departments');

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold p-6 border-b">Departments</h2>
      <Table
        headers={['Name', 'Location', 'Head Professor']}
        data={departments}
        renderRow={(dept) => (
          <tr key={dept.department_id}>
            <td className="px-6 py-4">{dept.name}</td>
            <td className="px-6 py-4">{dept.location}</td>
            <td className="px-6 py-4">{dept.head_professor_id}</td>
          </tr>
        )}
      />
    </div>
  );
}