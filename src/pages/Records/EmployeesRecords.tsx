import React from "react";
import { BarChart, LineChart, DoughnutChart, PieChart } from "../Charts";
import "./EmployeeRecords.scss";
import AdminSidebar from "../../components/AdminSidebar";

// Months for line charts
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// Employees-related data
const employeesLeft = [20, 15, 10, 12, 18, 22, 19, 16, 14, 20, 25, 30];
const employeesJoined = [30, 28, 35, 40, 38, 42, 45, 50, 48, 55, 60, 65];

// Department performance and attendance-related data
const departments = ["HR", "Engineering", "Marketing", "Sales"];
const departmentDistribution = [15, 35, 25, 25]; 
const employeeStatus = ["Active", "On Leave", "Resigned"];
const statusDistribution = [70, 15, 15]; // Example distribution

// Unique employee stats
const ageGroups = ["20-30", "31-40", "41-50", "51-60", "61+"];
const ageDistribution = [25, 40, 20, 10, 5]; // Example distribution

const EmployeeRecords = () => {
  return (
    <div className="AdminContainer">
      <AdminSidebar />
      <main>
        <div className="employeeRecordsContainer">
          <h1>Employee Records</h1>
          <div className="chartSection">
            <h2>Employees Joined (Jan - Dec)</h2>
            <div className="chart">
              <LineChart
                data={employeesJoined}
                label="Employees Joined"
                backgroundColor="rgba(75,192,192,0.2)"
                borderColor="rgba(75,192,192,1)"
                labels={months}
              />
            </div>
          </div>

          <div className="chartSection">
            <h2>Employee Status Distribution</h2>
            <div className="chart">
              <DoughnutChart
                labels={employeeStatus}
                data={statusDistribution}
                backgroundColor={["#FF6384", "#36A2EB", "#FFCE56"]}
                cutout={60}
                legends={true}
              />
            </div>
          </div>

          <div className="chartSection">
            <h2>Employee Age Distribution</h2>
            <div className="chart">
              <PieChart
                labels={ageGroups}
                data={ageDistribution}
                backgroundColor={[
                  "#FF6384",
                  "#36A2EB",
                  "#FFCE56",
                  "#4BC0C0",
                  "#9966FF",
                ]}
                cutout={0}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EmployeeRecords;
