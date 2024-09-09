// import axios from 'axios';
// import React, { useState } from 'react';
// import AdminSidebar from '../components/AdminSidebar';
// import './styles/deptCreation.scss'; // Import the SCSS file

// interface MyFormProps {
//   officeName: string;
// }
// interface ResponseType {
//   success: boolean;
//   name: string;
// }

// const MyForm: React.FC<MyFormProps> = () => {
//   const [inputValue, setInputValue] = useState<string>('');
//   const [OfficeValue, setOfficeValue] = useState<string>('');


//   const [loading, setLoading] = useState<boolean>(false);
//   const [error, setError] = useState<string | null>(null);
//   const [officeName,setOfficeName] = useState<string>('');
//   const [officeFind,setOfficeFind] = useState<boolean>(false);


//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);

//     try {
//       const response = await axios.post('https://sih-test-server.vercel.app/api/department/createDepartment', {
//         name : inputValue ,
//         officeName: officeName,
//       });

//       console.log(inputValue, officeName);
//       console.log('Response:', response.data);
//       alert('Department created successfully!');
//     } catch (error) {
//       console.error('Error:', error);
//       setError('Failed to create department. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleFindOffice = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);

//     try {
//       const response = await axios.post('http://localhost:3000/api/office/findofficename', {
//         name: OfficeValue,
//       });
//       console.log('Response:', response.data.name);
//       setOfficeName(response.data.name)
//       alert(`Office Found! Now Create Department in ${response.data.name}`);
//     } catch (error) {
//       console.error('Error:', error);
//       setError('Failed to Find Office Name. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = () => {
//     setInputValue('');
//   };

//   return (
//        <div className="AdminContainer">
//         <AdminSidebar/>
//         <main>
//         <div className="department-form">
//       <h1>Find Office</h1>
//       <form onSubmit={handleFindOffice}>
//         <div>
//           <label htmlFor="inputField">Office Name:</label>
//           <input
//             type="text"
//             id="inputField"
//             value={OfficeValue}
//             onChange={(e) => setOfficeValue(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <button type="submit" disabled={loading}>
//             {loading ? 'Finding...' : 'Find'}
//           </button>
//           <button type="button" className="remove-btn" onClick={handleDelete}>
//             Clear
//           </button>
//         </div>
//         {error && <p className="error-message">{error}</p>}
//       </form>
   
//    {
//     officeFind?<form onSubmit={handleSubmit}>
//     <div>
//       <label htmlFor="inputField">Department Name:</label>
//       <input
//         type="text"
//         id="inputField"
//         value={inputValue}
//         onChange={(e) => setInputValue(e.target.value)}
//         required
//       />
//     </div>
//     <div>
//       <button type="submit" disabled={loading}>
//         {loading ? 'Submitting...' : 'Submit'}
//       </button>
//       <button type="button" className="remove-btn" onClick={handleDelete}>
//         Clear
//       </button>
//     </div>
//     {error && <p className="error-message">{error}</p>}
//   </form>:""
//    }
//     </div>
//         </main>
//        </div>
//   );
// };

// export default MyForm;

import axios from 'axios';
import React, { useState } from 'react';
import AdminSidebar from '../components/AdminSidebar';
import './styles/deptCreation.scss'; // Import the SCSS file

interface MyFormProps {}

const MyForm: React.FC<MyFormProps> = () => {
  const [inputValue, setInputValue] = useState<string>(''); // Department name input
  const [OfficeValue, setOfficeValue] = useState<string>(''); // Office name input
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null); // General error handling
  const [officeName, setOfficeName] = useState<string>(''); // Store office name after finding it
  const [officeFind, setOfficeFind] = useState<boolean>(false); // Control visibility of department form

  // Handle department creation
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post('https://alpha-one-server.vercel.app/api/department/createDepartment', {
        name: inputValue,  // Department name
        officeName: officeName,  // Office name from search
      });

      console.log(inputValue, officeName);
      console.log('Response:', response.data);
      alert('Department created successfully!');
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to create department. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle finding office
  const handleFindOffice = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post('https://alpha-one-server.vercel.app/api/office/findofficename', {
        // params: {
        //   name: OfficeValue,
        // },
        name: OfficeValue,
      });

      console.log('Response:', response.data.name);
      setOfficeName(response.data.name); // Set office name after successful search
      setOfficeFind(true); // Enable the department creation form
      alert(`Office Found! Now Create Department in ${response.data.name}`);
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to Find Office Name. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Clear input value function
  const handleDelete = () => {
    setInputValue('');
    setOfficeValue('');
    setOfficeFind(false);
    setError(null); // Clear any error message
  };

  return (
    <div className="AdminContainer">
      <AdminSidebar />
      <main>
      { officeFind==false ? (<div className="department-form">
          {/* Office search form */}
          <h1>Find Office</h1>
          <form onSubmit={handleFindOffice}>
            <div>
              <label htmlFor="inputField">Office Name:</label>
              <input
                type="text"
                id="inputField"
                value={OfficeValue}
                onChange={(e) => setOfficeValue(e.target.value)}
                required
              />
            </div>
            <div>
              <button type="submit" disabled={loading}>
                {loading ? 'Finding...' : 'Find'}
              </button>
              <button type="button" className="remove-btn" onClick={handleDelete}>
                Clear
              </button>
            </div>
            {error && <p className="error-message">{error}</p>}
          </form>
        </div>):""
          
       }
          {officeFind && (
         <div className="department-form">
              <h1>{`Create Department In ${OfficeValue} Office`}</h1>    
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="inputField">Department Name:</label>
                <input
                  type="text"
                  id="inputField"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  required
                />
              </div>
              <div>
                <button type="submit" disabled={loading}>
                  {loading ? 'Creating...' : 'Create Department'}
                </button>
                <button type="button" className="remove-btn" onClick={handleDelete}>
                  Clear
                </button>
              </div>
              {error && <p className="error-message">{error}</p>}
            </form>
         </div>
         )}

      </main>
    </div>
  );
};

export default MyForm;
