import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Admin() {
  const { token } = useParams();
  const [employees, setEmployees] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [idEmployee, setIdEmployee] = useState("");
  const [switchButton, setSwictButton] = useState(false);
  const [formEmployee, setFormEmployee] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    address: "",
    date_of_birth: "",
    position: "",
    department: "",
    salary: "",
    hired_at: "",
    emergency_contact: "",
    nationality: "",
    gender: "",
    marital_status: "",
    notes: "",
    is_visible: true,
  });

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/employee", {
          headers: {
            Authorization: `Bearer ${token}`, // ใช้ token ใน header
          },
        });
        const data = await response.json();
        setEmployees(data);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchEmployees();
  }, [token]);

  const handleEdit = async (id) => {
    const response = await fetch(`http://localhost:8000/api/employee/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json(); // ใช้ await เพื่อรอให้ response.json() เสร็จ
    setFormEmployee(data); // จากนั้นค่อย set ค่า formEmployee
    setShowForm(true); // แสดงฟอร์มแก้ไข
    setIdEmployee(id);
    setSwictButton(true);
  };

  const handleDelete = async (id) => {
    window.confirm("Do you want delete it?");
    const response = await fetch(`http://localhost:8000/api/employee/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
      }
    })
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormEmployee({ ...formEmployee, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/api/employee", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formEmployee),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log("Employee created successfully:", data);
      setShowForm(false);
    } catch (error) {
      console.error("Error creating employee:", error);
    }
  };
  
 console.log("dataf", formEmployee)
 

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:8000/api/employee/${idEmployee}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formEmployee),
        }
      );
      setShowForm(false);
      setSwictButton(false);
      // window.location.reload();
    } catch (error) {
      console.error("error: ", error);
    }
  };

  const showAdd = () => {
    setShowForm((prevShow) => !prevShow);
    setFormEmployee("");
    setSwictButton(false);
  };

  //active
  const toggleVisibility = async (id) => {
    try {
      // หา employee ที่จะถูกสลับค่าใน employees list
      const employeeToToggle = employees.find((employee) => employee.id === id);
  
      // ตรวจสอบว่าพบ employee ที่ต้องการหรือไม่ก่อนดำเนินการ
      if (!employeeToToggle) {
        throw new Error("Employee not found");
      }
  
      // ส่งคำขอไปที่ API เพื่ออัปเดตค่า is_visible ของ employee
      const response = await fetch(`http://localhost:8000/api/employee/${id}`, {
        method: "PUT", 
        headers: {
          "Content-Type": "application/json", 
          Authorization: `Bearer ${token}`, 
        },
        body: JSON.stringify({
          // ส่งข้อมูลที่ต้องการอัปเดตไปยัง API
          is_visible: !employeeToToggle.is_visible, // สลับค่า is_visible: ถ้าเป็น true ก็เปลี่ยนเป็น false และกลับกัน
        }),
      });
  
      // ตรวจสอบว่า API ตอบกลับมาด้วยข้อมูลที่ถูกต้องหรือไม่
      if (!response.ok) {
        throw new Error("Failed to update employee visibility");
      }
  
      // แปลงข้อมูลที่ได้จาก API จาก JSON เป็น JavaScript object
      const updatedEmployee = await response.json();
  
      // อัปเดตสถานะ employees ใน React state ด้วยข้อมูลใหม่จาก API
      setEmployees((prevEmployees) =>
        prevEmployees.map((employee) =>
          // ถ้า employee.id ตรงกับ id ที่ส่งไปอัปเดต ก็จะใช้ข้อมูลที่อัปเดตแล้ว (updatedEmployee) มาแทน
          employee.id === id
            ? { ...employee, is_visible: updatedEmployee.is_visible } // อัปเดตฟิลด์ is_visible จากข้อมูลที่ได้จาก API
            : employee // ถ้าไม่ตรงกับ id ที่ส่งไป ก็คืนค่า employee เดิมๆ
        )
      );
    } catch (error) {
      // ถ้ามีข้อผิดพลาด จะแสดงข้อผิดพลาดใน console
      console.error("Error toggling visibility:", error);
    }
  };
  

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold mb-4">Admin Page</h1>
        <button
          onClick={showAdd}
          className="bg-green-500 w-[7rem] text-white h-[2rem]"
        >
          {showForm ? "Close" : "Add Employee"}
        </button>
      </div>

      {showForm ? (
        <form
          onSubmit={handleSubmit}
          className="max-w-lg mx-auto bg-white p-8 shadow-lg rounded-md mb-8"
        >
          <h2 className="text-xl font-bold mb-4">เพิ่มข้อมูลพนักงาน</h2>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              ชื่อ
            </label>
            <input
              type="text"
              name="first_name"
              value={formEmployee.first_name}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              นามสกุล
            </label>
            <input
              type="text"
              name="last_name"
              value={formEmployee.last_name}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              อีเมล
            </label>
            <input
              type="email"
              name="email"
              value={formEmployee.email}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              เบอร์โทรศัพท์
            </label>
            <input
              type="text"
              name="phone_number"
              value={formEmployee.phone_number}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              ที่อยู่
            </label>
            <textarea
              name="address"
              value={formEmployee.address}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              วันเกิด
            </label>
            <input
              type="date"
              name="date_of_birth"
              value={formEmployee.date_of_birth}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              ตำแหน่ง
            </label>
            <input
              type="text"
              name="position"
              value={formEmployee.position}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              แผนก
            </label>
            <input
              type="text"
              name="department"
              value={formEmployee.department}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              เงินเดือน
            </label>
            <input
              type="text"
              name="salary"
              value={formEmployee.salary}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              วันที่เข้าทำงาน
            </label>
            <input
              type="date"
              name="hired_at"
              value={formEmployee.hired_at}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              ผู้ติดต่อฉุกเฉิน
            </label>
            <input
              type="text"
              name="emergency_contact"
              value={formEmployee.emergency_contact}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              สัญชาติ
            </label>
            <input
              type="text"
              name="nationality"
              value={formEmployee.nationality}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              เพศ
            </label>
            <select
              name="gender"
              value={formEmployee.gender}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            >
              <option value="">เลือกเพศ</option>
              <option value="male">ชาย</option>
              <option value="female">หญิง</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              สถานภาพสมรส
            </label>
            <select
              name="marital_status"
              value={formEmployee.marital_status}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            >
              <option value="">เลือกสถานภาพ</option>
              <option value="single">โสด</option>
              <option value="married">สมรส</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              หมายเหตุ
            </label>
            <textarea
              name="notes"
              value={formEmployee.notes}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            />
          </div>

          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              name="is_visible"
              checked={formEmployee.is_visible}
              onChange={(e) =>
                setFormEmployee({
                  ...formEmployee,
                  is_visible: e.target.checked,
                })
              }
              className="mr-2"
            />
            <label className="text-sm font-medium text-gray-700">
              แสดงข้อมูล
            </label>
          </div>

          <div>
            {switchButton ? (
              <button
                onClick={handleUpdate}
                className="bg-yellow-500 text-white px-4 py-2 rounded-md"
              >
                อัพเดทข้อมูล
              </button>
            ) : (
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
              >
                บันทึกข้อมูล
              </button>
            )}
          </div>
        </form>
      ) : (
        ""
      )}

      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">Full Name</th>
            <th className="py-2 px-4 border-b">Phone Number</th>
            <th className="py-2 px-4 border-b">Address</th>
            <th className="py-2 px-4 border-b">Position</th>
            <th className="py-2 px-4 border-b">Department</th>
            <th className="py-2 px-4 border-b">Status</th>
            <th className="py-2 px-4 border-b">Action</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td className="py-2 px-4 border-b">{employee.id}</td>
              <td className="py-2 px-4 border-b">
                {employee.first_name} {employee.last_name}
              </td>
              <td className="py-2 px-4 border-b">{employee.phone_number}</td>
              <td className="py-2 px-4 border-b">{employee.address}</td>
              <td className="py-2 px-4 border-b">{employee.position}</td>
              <td className="py-2 px-4 border-b">{employee.department}</td>
              <td className="py-2 px-4 border-b">{employee.is_visible}</td>
              <td className="py-2 px-4 border-b">
                <button
                  onClick={() => toggleVisibility(employee.id)}
                  className={`${
                    employee.is_visible ? "bg-red-500" : "bg-green-500"
                  } hover:bg-opacity-75 text-white font-bold py-1 px-2 rounded mr-2`}
                >
                  {employee.is_visible ? "Hide" : "Show"}
                </button>
                <button
                  onClick={() => handleEdit(employee.id)}
                  className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(employee.id)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
