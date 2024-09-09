import React, { useEffect, useState } from 'react';
import Office_page from '../../components/Office_page';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // Import useParams from react-router-dom
import Loader from '../../components/Loader';

const Offices = () => {
  const { id } = useParams(); // Extract the id from the URL using useParams
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOfficeById = async () => {
      try {
        setLoading(true);
        setData(null); // Clear previous data
        setError(null);

        console.log('Fetching office data for ID:', id);

    
        const response = await axios.get(`https://alpha-one-server.vercel.app/api/office/${id}`);
        console.log(response.data.office);
        
        setData(response.data.office);

      } catch (error) {
        console.error('Error fetching office data:', error);
        setError('Failed to load office data');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchOfficeById(); // Fetch data whenever id changes
    }
  }, [id]); // Trigger useEffect when id changes

  if (loading) {
    return <div><Loader /></div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      {data && (
        <Office_page
          officeid={data._id}
          name={data.name}
          location={data.Address}
          total_employees={(data.employees).length}
          checkedInEmployees={(data.
            CheckedINemployees
            ).length}
          departments={data.departments}
        />
      )}
    </div>
  );
};

export default Offices;
