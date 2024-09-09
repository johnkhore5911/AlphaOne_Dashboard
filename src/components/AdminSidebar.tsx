
import axios from "axios";
import { useEffect, useState } from "react";
import { IconType } from "react-icons";
import { FaCity } from "react-icons/fa";
import { HiMenuAlt4 } from "react-icons/hi";
import { IoConstruct } from "react-icons/io5";
import { MdChangeCircle } from "react-icons/md";
import { RiDashboardFill } from "react-icons/ri";
import { Link, Location, useLocation } from "react-router-dom";

interface DivTwoProps{
  location: Location;
  data2: {
    _id: string;
    name: string;
    latitude: number;
    longitude: number;
    distance: number;
    departments: {
      _id: string;
      name: string;
      office: string;
      employees: string[];
    }[];
    employees: string[];
    CheckedINemployees: string[];
    createdAt: string;
    updatedAt: string;
  }[];
}

const AdminSidebar = () => {
  const location = useLocation();
  const [showModal,setShowModal]=useState<boolean>(false);
  const [phoneActive,setPhoneActive]=useState<boolean>(
        window.innerWidth < 1200
  );
  const [data2, setData] = useState<any[]>([]);

  const resizeHandler=()=>{
    setPhoneActive(window.innerWidth < 1200);
  }

  useEffect(()=>{
    window.addEventListener("resize",resizeHandler);
    return ()=>{
      window.removeEventListener("resize",resizeHandler);
    }
  },[]);


  useEffect(() => {
    axios
      .get("https://alpha-one-server.vercel.app/api/office/getAllOffices")
      .then((response) => {
        console.log("response.data.office2:", response.data.offices);
        setData(response.data.offices);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);


  return (
<>
{phoneActive && (
        <button id="hamburger" onClick={() => setShowModal(true)}>
          <HiMenuAlt4 />
        </button>
      )}

      <aside
        style={
          phoneActive
            ? {
                width: "20rem",
                // height: "100vh",
                position: "fixed",
                overflowY:"scroll",
                top: 0,
                left: showModal ? "0" : "-20rem",
                transition: "all 0.5s",
              }
            : {}
        }
      >
        <h2>GAIL INDIA </h2>
        <DivOne location={location} />
        <DivTwo location={location} data2={data2} />
        <DivThree location={location} />
        <DivFour location={location} />

        {phoneActive && (
          <button id="close-sidebar" onClick={() => setShowModal(false)}>
            Close
          </button>
        )}
      </aside>
    </>
  );
};

const DivOne = ({ location }: { location: Location }) => (
  <div>
    <h5>Dashboard</h5>
    <ul>
      <Li
        url="/admin/dashboard"
        text="Dashboard"
        Icon={RiDashboardFill}
        location={location}
      />
    </ul>
  </div>
);

const DivTwo = ({ location,data2 }: { location: Location ; data2:any[]}) => (
  <div>
    <h5>OFFICES</h5>
    <ul>
    {data2.map((office) => (
        <Li
          key={office._id}
          url={`/office/${office._id}`}
          text={office.name.toUpperCase()}
          Icon={FaCity}
          location={location}
        />
      ))}
    </ul>
  </div>
);

const DivThree = ({ location }: { location: Location }) => (
  <div>
    <h5>NEW OFFICE</h5>
    <ul>
      <Li
        url="/create-office"
        text="Create new Office"
        Icon={IoConstruct}
        location={location}
      />
      <Li
        url="/modify-office/:id"
        text="Modify any Office"
        Icon={MdChangeCircle}
        location={location}
      />
    </ul>
  </div>
);

const DivFour = ({ location }: { location: Location }) => (
  <div>
    <h5>Records</h5>
    <ul>
      <Li
        url="/office-records"
        text="Office Details"
        Icon={IoConstruct}
        location={location}
      />
      <Li
        url="/employee-records"
        text="Employees Details"
        Icon={MdChangeCircle}
        location={location}
      />
    </ul>
  </div>
);

interface LiProps {
  url: string;
  text: string;
  location: Location;
  Icon: IconType;
}
const Li = ({ url, text, location, Icon }: LiProps) => (
  <li
    style={{
      backgroundColor: location.pathname.includes(url)
        ? "rgba(0,115,255,0.1)"
        : "white",
    }}
  >
    <Link
      to={url}
      style={{
        color: location.pathname.includes(url) ? "rgb(0,115,255)" : "black",
      }}
    >
      <Icon />
      {text}
    </Link>
  </li>
 
);

export default AdminSidebar;
