import React, { useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import './styles/deptCreation.scss'; // Import the SCSS file
import AdminSidebar from '../components/AdminSidebar';

interface MyFormProps {
  officeName: string;
}

const MyForm: React.FC<MyFormProps> = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const location = useLocation();
  const { officeName } = location.state;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post('https://alpha-one-server.vercel.app/api/department/createDepartment', {
        name: inputValue,
        officeName: officeName,
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

  const handleDelete = () => {
    setInputValue('');
  };

  return (
       <div className="AdminContainer">
        <AdminSidebar/>
        <main>
        <div className="department-form">
      <h1>Add Department in {officeName} Office</h1>
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
            {loading ? 'Submitting...' : 'Submit'}
          </button>
          <button type="button" className="remove-btn" onClick={handleDelete}>
            Clear
          </button>
        </div>
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
        </main>
       </div>
  );
};

export default MyForm;
