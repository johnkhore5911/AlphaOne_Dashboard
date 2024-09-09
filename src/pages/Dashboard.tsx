import axios from "axios";
import { useEffect, useState } from "react";
import { BiMaleFemale } from "react-icons/bi";
import { BsSearch } from "react-icons/bs";
import { FaRegBell } from "react-icons/fa";
import { HiTrendingDown, HiTrendingUp } from "react-icons/hi";
import data from "../assets/data.json";
import userimg from "../assets/userfinal.png";
import AdminSidebar from "../components/AdminSidebar";
import { LineChart, PieChart } from "../components/Charts";
import Table from "../components/DashboardTable";
import './dashboard.scss';

const first = data.emp;

const Dashboard = () => {
  const [data1 , setData] = useState([]);
  const [genderData ,setGenderData]=useState();
  const [liveStats, setLiveStats] = useState([]);
  
const departments = ["HR", "Engineering", "Marketing", "Sales"];
const departmentDistribution = [15, 35, 25, 25]; // Example distribution
  
  const fetchData = async () => {
    try {
      const officeResponse = await axios.get("https://alpha-one-server.vercel.app/api/office/getAllOffices");
      setData(officeResponse.data.offices);

      const genderResponse = await axios.get("https://alpha-one-server.vercel.app/api/v1/getGenderCounts");
      setGenderData(genderResponse.data.data);

      // const liveStatsResponse = await axios.get("https://sih-test-server.vercel.app/api/v1/admin/getRecentlyCheckedInEmployees");
      // const liveStatsResponse = await axios.get("https://alpha-one-server.vercel.app/api/v1/admin/getRecentlyCheckedInEmployees");
      const liveStatsResponse = await axios.get("http://192.168.18.208:3000/api/v1/admin/getRecentlyCheckedInEmployees");
      // http://192.168.18.208:3000/api/v1/admin/getRecentlyCheckedInEmployees
      // 
      setLiveStats(liveStatsResponse.data.transaction);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

 
  useEffect(() => {
    fetchData(); // Initial fetch

    const interval = setInterval(() => {
      fetchData(); // Fetch data every 3 seconds
    }, 3000); // 3000 milliseconds = 3seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  return (
    <div className="AdminContainer">
      <AdminSidebar />
      <main className="dashboard">
        <div className="bar">
          <BsSearch className="searchIcon" />
          <input type="text" className="searchText" placeholder="Search for Data, Users, docs .." />
          <FaRegBell />
          <img src={userimg} alt="" />
        </div>
        <h2>Today's CHECKED IN STATUS</h2>
        <section className="widgetContainer">
          {data1.map((i) => (
            <WidgetItem
              heading={i.name}
              percents={parseInt((i.CheckedINemployees.length / i.employees.length) * 100)}
              amount={true}
              value={i.CheckedINemployees.length>0?i.CheckedINemployees.length:0}
              color="rgb(0,115,255)"
            />
          ))}
        </section>

        <h2>Average Working Hours</h2>
        <section className="widgetContainer">
          {first.map((i) => (
            <WidgetItem
              heading={i.OfficeName}
              percents={i.percents}
              amount={true}
              value={i.employees_checkedIn}
              color="rgb(0,115,255)"
            />
          ))}
        </section>

        <section className="graphContainer">
          <div className="revenueChart chartSection">
            <h2>Employee Distribution BY Departments</h2>
            <div className="chart">
              <PieChart
                labels={departments}
                data={departmentDistribution}
                backgroundColor={["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"]}
                cutout={0}
              />
            </div>
          </div>

          <div className="dashboardCategories">
            <h2>Checked-IN Compliance Rate</h2>
            {data1.map((c) => (
              <CategoryItem
                key={c.name}
                heading={c.name}
                // value={c.CheckedINemployees.length}
                value={parseInt((c.CheckedINemployees.length / c.employees.length) * 100)}
                // color={`hsl(${(c.value) * 4}, ${c.value}%, 50%)`}
                color={`hsl(${(parseInt((c.CheckedINemployees.length / c.employees.length) * 100)) * 4}, ${parseInt((c.CheckedINemployees.length / c.employees.length) * 100)}%, 50%)`}
              />
            ))}
          </div>
        </section>

        <section className="transactionContainer">
        <div className="genderChart">
            <h2>Gender Ratio</h2>
            <PieChart
              labels={["female", "male"]}
              data={genderData}
              backgroundColor={["hsl(342,56%,82%)", "rgba(53,162,235,0.8)"]}
              cutout={90}
            
            />
            <BiMaleFemale />
          </div>
          <Table data={liveStats} />
        </section>
      </main>
    </div>
  );
};

interface widgetProps {
  heading: string;
  value: number;
  percents: number;
  color: string;
  amount?: boolean;
}

const WidgetItem = ({
  heading,
  percents,
  color,
  amount = false,
  value,
}: widgetProps) => (
  <article className="widget">
    <div className="widgetInfo">
      <p>{heading}</p>
      <h4>{amount ? ` ${value}` : value} </h4>
      {percents > 0 ? (
        <span className="green">
          <HiTrendingUp /> +{percents}%{" "}
        </span>
      ) : (
        <span className="red">
          <HiTrendingDown /> {percents}%{" "}
        </span>
      )}
    </div>
    <div
      className="widgetCircle"
      style={{
        background: `conic-gradient(
            ${color} ${(Math.abs(percents) / 100) * 360}deg ,
            rgba(255,255,255) 0)`,
      }}
    >
      <span style={{ color: "black" }}>{percents}% </span>
    </div>
  </article>
);

interface categoryItemProps {
  heading: string;
  value: number;
  color: string;
}
const CategoryItem = ({ heading, value, color }: categoryItemProps) => (
  <div className="categoryItem">
    <h5>{heading}</h5>

    <div>
      <div style={{ backgroundColor: color, width: `${value}%` }}></div>
      <span>{value}%</span>
    </div>
  </div>
);

export default Dashboard;
