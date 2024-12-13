import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-indigo-600">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-white font-bold text-xl">
              Student Management
            </Link>
          </div>
          <div className="flex space-x-4">
            <Link to="/" className="text-white hover:text-indigo-200">Students</Link>
            <Link to="/departments" className="text-white hover:text-indigo-200">Departments</Link>
            <Link to="/courses" className="text-white hover:text-indigo-200">Courses</Link>
            <Link to="/enrollments" className="text-white hover:text-indigo-200">Enrollments</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;