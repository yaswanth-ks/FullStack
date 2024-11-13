import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Profile.css'; // Import the CSS file

const Profile = () => {
  const { id } = useParams(); // Get the employee id from URL params
  const [employee, setEmployee] = useState([]); // employee initialized as an empty array
  const [attendance, setAttendance] = useState([]); // Assuming you will fetch attendance data later
  const [daysWorked, setDaysWorked] = useState('');
  const [calculatedSalary, setCalculatedSalary] = useState(null);

  // Fetch employee data from API
  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await fetch(`http://localhost:3000/employee/detail`);
        if (!response.ok) {
          throw new Error('Failed to fetch employee data');
        }
        const data = await response.json();
        console.log(data);
        if (data.length > 0) {
          // Add 'att' to each employee object and update state
          const updatedEmployees = data.map((emp) => ({
            ...emp,
            att: Math.floor(Math.random() * 11) + 20, // Random 'att' between 0 and 30
          }));
          setEmployee(updatedEmployees); // Update state with modified employees array
        } else {
          console.log('Employee not found');
        }
      } catch (err) {
        console.error('Error fetching employee details', err);
      }
    };

    fetchEmployee();
  }, [id]);

  return (
    <div className="profile-container">
      <h2>Employee Profile</h2>
      {employee.length > 0 ? (
        employee.map((emp) => (
          <div className="employee-details" key={emp.id}> {/* Ensure a unique key */}
            <table className="profile-table">
              <tbody>
                <tr>
                  <td><strong>Name:</strong></td>
                  <td>{emp.name}</td>
                </tr>
                <tr>
                  <td><strong>Email:</strong></td>
                  <td>{emp.email}</td>
                </tr>
                <tr>
                  <td><strong>Salary:</strong></td>
                  <td>${emp.salary}</td>
                </tr>
                <tr>
                  <td><strong>Days Worked:</strong></td>
                  <td>{emp.att}</td> {/* Showing the random 'att' value */}
                </tr>
                <tr>
                  <td><strong>Days Absent:</strong></td>
                  <td>{30-emp.att.toFixed(2)}</td> {/* Showing the random 'att' value */}
                </tr>
                <tr>
                  <td><strong>This Month Salary:</strong></td>
                  <td>${(emp.salary/30 * emp.att).toFixed(2)}</td> {/* Calculating and displaying the salary */}
                </tr>
              </tbody>
            </table>
          </div>
        ))
      ) : (
        <p>Loading employee details...</p>
      )}
    </div>
  );
};

export default Profile;
