// // import React from 'react'
// // import Office_page from '../../components/Office_page'

// // const data={
// //     officeid:123424,
// //     name:"MUMBAI",
// //     location:"Sector 2 , Gorre gao ",
// //     total_employees:2000,
// //     checkedInEmployees:1700,
// //     departments:["software","HR","Management","Finance"]
// // }

// // const Mumbai = () => {
// //   return (
// //     <div>
// //         <Office_page
// //         officeid={data.officeid}
// //         name={data.name}
// //         location={data.location}
// //         total_employees={data.total_employees}
// //         checkedInEmployees={data.checkedInEmployees}
// //         departments={data.departments}
// //         />
// //     </div>
// //   )
// // }

// // export default Mumbai

// import React from 'react';
// import Office_page from '../../components/Office_page';

// const data = [
//   {
//     officeid: 123424,
//     name: "Jammu2",
//     location: "Sector 2, Goregaon",
//     total_employees: 2000,
//     checkedInEmployees: 1700,
//     departments: ["Software", "HR", "Management", "Finance"]
//   },
//   {
//     officeid: 123425,
//     name: "DELHI",
//     location: "Sector 8, Connaught Place",
//     total_employees: 1500,
//     checkedInEmployees: 1400,
//     departments: ["Operations", "Sales", "Support"]
//   },
//   {
//     officeid: 123426,
//     name: "CHANDIGARH",
//     location: "Sector 17, Chandigarh",
//     total_employees: 1200,
//     checkedInEmployees: 1100,
//     departments: ["Development", "HR", "Marketing"]
//   }
// ];

// const Offices = () => {
//   return (
//     <div>
//       {data.map((office, index) => (
//         <Office_page
//           key={office.officeid} // Use a unique key for each element
//           officeid={office.officeid}
//           name={office.name}
//           location={office.location}
//           total_employees={office.total_employees}
//           checkedInEmployees={office.checkedInEmployees}
//           departments={office.departments}
//         />
//       ))}
//     </div>
//   );
// };

// export default Offices;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Office_page from '../../components/Office_page';

const OfficePage = () => {
  const { officeid } = useParams(); // Get the office id from the URL
  // const id="66db28dda1597d1e7ee3d1b7"
  console.log("id from paramts",officeid);
  const [office, setOffice] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOffice = async () => {
      try {
        const response = await axios.get(`https://alpha-one-server.vercel.app/api/office/${officeid}`); // Fetch office details by id
        setOffice(response.data.office);
        console.log("response.data.office:",response.data.office);
        setLoading(false);
        // console.log("office._id",office._id);
      } catch (error) {
        setError('Error fetching office data');
        setLoading(false);
      }
    };

    fetchOffice();
  }, [officeid]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  if (!office) return <div>No data available</div>;

  return (
    // <Office_page
    //   officeid={office._id}
    //   name={office.name}
    //   location={office.location}
    //   total_employees={office.total_employees}
    //   checkedInEmployees={office.checkedInEmployees}
    //   departments={office.departments}
    // />
    <Office_page
    officeid={office._id}
    name={office.name}
    location={office.location}
    total_employees={office.employees.length} // Adjusted based on available data
    checkedInEmployees={office.CheckedINemployees.length} // Adjusted based on available data
    departments={office.departments.map(dept => dept.name)} // Adjusted to get department names
  />
  );
};

export default OfficePage;
