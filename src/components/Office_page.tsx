import { FaMoneyBillTrendUp, FaPeopleArrows, FaPeopleGroup } from 'react-icons/fa6';
import { GrCloudSoftware, GrGroup } from 'react-icons/gr';
import { IoPeopleCircle } from 'react-icons/io5';
import { MdManageHistory } from 'react-icons/md';
import { useLocation, useNavigate } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import './Office.scss';  // Assuming SCSS is used for better control over styling
import { useEffect, useState } from 'react';
import axios from 'axios';

interface OfficeProps {
  officeid: number;
  name: string;
  location: string;
  total_employees: number;
  checkedInEmployees: number;
 
}

interface Department {
  _id: string;
  name: string;
  office: string;
  employees: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const departmentIcons: { [key: string]: JSX.Element } = {
  Software: <GrCloudSoftware />,
  HR: <IoPeopleCircle />,
  Management: <MdManageHistory />,
  Finance: <FaMoneyBillTrendUp />,
  Operations: <GrGroup />,
  Sales: <FaPeopleArrows />,
  Support: <FaPeopleGroup />,
  Development: <FaPeopleGroup />,
  Marketing: <FaMoneyBillTrendUp />,
};


const Office_page: React.FC<OfficeProps> = ({ officeid, name, location, total_employees, checkedInEmployees}:OfficeProps) => {
  const navigate = useNavigate();
  const [Departments, setDepartments] = useState<Department[]>([]);
 
  
  useEffect(() => {
    const fetchDepartmentsByOffice = async () => {
      try {
        const response = await axios.get(
          `https://alpha-one-server.vercel.app/api/department/getDepartmentsByOffice/${name}`
        );
        setDepartments(response.data.departments);
      } catch (error) {
        console.error('Error fetching departments:', error);
      }
    };

    fetchDepartmentsByOffice();
  }, [name]);




  const handleDepartmentClick = (department: string) => {
    navigate(`/dept-info/${department._id}`,{state:{ department }});
  };

  return (
    <div className="AdminContainer">
      <AdminSidebar />
      <main className="dashboard">
        <section className="office-info">
          <h1 className="office-title">Office Details</h1>
          <div className="office-card">
            <h2>ID: <span>{officeid}</span></h2>
            <h2>Location: <span>{location}</span></h2>
            <h2>Office Name: <span>{name}</span></h2>
          </div>
        </section>

        <section className="employee-stats">
          <h1>Employee Statistics</h1>
          <div className="stats-grid">
            <div className="stats-box">
              <FaPeopleGroup className="icon" />
              <h2>Total Employees</h2>
              <p>{total_employees}</p>
            </div>
            <div className="stats-box">
              <FaPeopleArrows className="icon" />
              <h2>Checked-In Employees</h2>
              <p>{checkedInEmployees}</p>
            </div>
            <div className="stats-box">
              <GrGroup className="icon" />
              <h2>Checked-Out Employees</h2>
              <p>{total_employees - checkedInEmployees}</p>
            </div>
          </div>
        </section>

        <section className="departments-section">
          <h1 className="dept-title">Departments</h1>
          <div className="departments-grid">
            {Departments.map((department) => (
               <div
               key={department._id}
               className="deptbox"
               onClick={() => handleDepartmentClick(department)}
             >
               {departmentIcons[department.name] || <FaMoneyBillTrendUp />} {/* Fallback icon */}
               {department.name}
             </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Office_page;
