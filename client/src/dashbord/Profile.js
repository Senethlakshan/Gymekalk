import React, { useState } from 'react';
import { FaUser } from 'react-icons/fa';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function Profile() {

  //add user details


  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
    dob: '',
    nic: '',
    telephone: '',
    weight: '',
    height: ''
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem('usersdatatoken');

    const response = await fetch('/user/profile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    console.log(data);
  };

  //calender
  const [date, setDate] = useState(new Date());
  const [showPopup, setShowPopup] = useState(false);

  const handleDateChange = (date) => {
    setDate(date);
  };

  const handlePopup = () => {
    setShowPopup(!showPopup);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className='bg-white flex rounded-lg'>
      {/* First Part */}
      <div className='w-3/4 rounded-l-lg bg-red-500 p-8 min-h-screen'>
        <div className='flex justify-center items-center mb-8'>
          <FaUser className='text-4xl mr-4' />
          <h1 className='text-4xl font-bold'>Profile Details</h1>
        </div>
        <div>
          <p className='text-gray-600 mb-2'>Name: </p>
          <input type='text' className='w-full border border-gray-300 rounded-md p-2 mb-4' />
          <p className='text-gray-600 mb-2'>Address: </p>
          <input type='text' className='w-full border border-gray-300 rounded-md p-2 mb-4' />
          <button className='bg-blue-500 text-white font-bold py-2 px-4 rounded'>Update</button>
        </div>
      </div>
      {/* Second Part */}
      <div className='w-1/4 rounded-r-lg bg-white p-8'>
        <div className='flex flex-col justify-center items-center'>
          <div className='w-24 h-24 rounded-full bg-gray-400 mb-4'></div>
          <Calendar value={date} onChange={handleDateChange} />
          <button className='bg-blue-500 text-white font-bold py-2 px-4 rounded mt-4' onClick={handlePopup}>Add Data</button>
          {showPopup && (

            <div className='fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center'>
              <div className='bg-yellow-500 w-3/4 h-4/5 rounded-lg p-8'>
                <h1 className='text-2xl font-bold mb-4'>Add Data</h1>
                <form onSubmit={handleSubmit}>
                  <div className='mb-4'>
                    <input
                      type='text'
                      name='fullName'
                      placeholder='Full Name'
                      value={formData.fullName}
                      onChange={handleChange}
                      className='w-full px-3 py-2 border rounded'
                    />
                  </div>
                  <div className='mb-4'>
                    <input
                      type='text'
                      name='address'
                      placeholder='Address'
                      value={formData.address}
                      onChange={handleChange}
                      className='w-full px-3 py-2 border rounded'
                    />
                  </div>
                  <div className='mb-4'>
                    <input
                      type='date'
                      name='dob'
                      placeholder='Date of Birth'
                      value={formData.dob}
                      onChange={handleChange}
                      className='w-full px-3 py-2 border rounded'
                    />
                  </div>
                  <div className='mb-4'>
                    <input
                      type='text'
                      name='nic'
                      placeholder='National Identification Card'
                      value={formData.nic}
                      onChange={handleChange}
                      className='w-full px-3 py-2 border rounded'
                    />
                  </div>
                  <div className='mb-4'>
                    <input
                      type='text'
                      name='telephone'
                      placeholder='Telephone'
                      value={formData.telephone}
                      onChange={handleChange}
                      className='w-full px-3 py-2 border rounded'
                    />
                  </div>
                  <div className='mb-4'>
                    <input
                      type='number'
                      name='weight'
                      placeholder='Weight'
                      value={formData.weight}
                      onChange={handleChange}
                      className='w-full px-3 py-2 border rounded'
                    />
                  </div>
                  <div className='mb-4'>
                    <input
                      type='number'
                      name='height'
                      placeholder='Height'
                      value={formData.height}
                      onChange={handleChange}
                      className='w-full px-3 py-2 border rounded'
                    />
                  </div>
                  <div className='flex justify-start'>
                    <button type='submit' className='bg-blue-500 text-white font-bold py-2 px-4 rounded mr-2'>Save</button>
                    <button className='bg-red-500 text-white font-bold py-2 px-4 rounded' onClick={handleClosePopup}>Close</button>
                  </div>
                </form>
              </div>
            </div>

          )}
          <button className='bg-blue-500 text-white font-bold py-2 px-4 rounded mt-2'>Update Data</button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
