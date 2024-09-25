import React, { useEffect, useState } from 'react'

export default function Home() {
    const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch data from API
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/employee"); // แก้ URL นี้ให้ตรงกับ API ของคุณ
        const data = await response.json();
        setEmployees(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching employees:", error);
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  const openModal = async (id) => {
    try {
        const response = await fetch(`http://localhost:8000/api/employee/${id}`); // แก้ URL นี้ให้ตรงกับ API ของคุณ
        const data = await response.json();
        setSelectedEmployee(data);
        setIsModalOpen(true);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching employees:", error);
        setLoading(false);
      }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEmployee(null);
  };

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Employee List</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {employees.map((employee) => (
          <div
            onClick={() => openModal(employee.id)}
            key={employee.id}
            className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold mb-2">
              {employee.first_name} {employee.last_name}
            </h2>
            <p className="text-gray-700">Position: {employee.position}</p>
            <p className="text-gray-700">Department: {employee.department}</p>
            <p className="text-gray-700">Email: {employee.email}</p>
            <p className="text-gray-700">Phone: {employee.phone_number}</p>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-11/12 max-w-lg">
            <h2 className="text-2xl font-bold mb-4">
              {selectedEmployee.first_name} {selectedEmployee.last_name}
            </h2>
            <p><strong>Email:</strong> {selectedEmployee.email}</p>
            <p><strong>Phone:</strong> {selectedEmployee.phone_number}</p>
            <p><strong>Address:</strong> {selectedEmployee.address}</p>
            <p><strong>Date of Birth:</strong> {selectedEmployee.date_of_birth}</p>
            <p><strong>Position:</strong> {selectedEmployee.position}</p>
            <p><strong>Department:</strong> {selectedEmployee.department}</p>
            <p><strong>Salary:</strong> ${selectedEmployee.salary}</p>
            <p><strong>Emergency Contact:</strong> {selectedEmployee.emergency_contact}</p>
            <p><strong>Nationality:</strong> {selectedEmployee.nationality}</p>
            <p><strong>Gender:</strong> {selectedEmployee.gender}</p>
            <p><strong>Marital Status:</strong> {selectedEmployee.marital_status}</p>
            <p><strong>Notes:</strong> {selectedEmployee.notes}</p>
            <button 
              className="mt-4 bg-blue-500 text-white rounded px-4 py-2"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
