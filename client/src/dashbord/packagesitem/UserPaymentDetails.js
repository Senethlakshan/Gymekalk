import React, { useEffect, useState } from 'react';

const UserPaymentDetails = () => {
  const [paymentDetails, setPaymentDetails] = useState([]);

  useEffect(() => {
    fetchPaymentDetails();
  }, []);

  const fetchPaymentDetails = async () => {
    try {
        const response = await fetch(`/payment/details`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: localStorage.getItem('usersdatatoken'),
        },
    });
      const data = await response.json();
      setPaymentDetails(data.data);
    } catch (error) {
      console.error('Error fetching payment details:', error);
    }
  };

  return (
    <div className="bg-white p-4">
      <h2 className="text-2xl font-bold mb-4">Payment Details</h2>
      {paymentDetails.length > 0 ? (
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">Payment ID</th>
              <th className="px-4 py-2">Package</th>
              <th className="px-4 py-2">Amount</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Payment Date</th>
            </tr>
          </thead>
          <tbody>
            {paymentDetails.map((payment) => (
              <tr key={payment.paymentId}>
                <td className="border px-4 py-2">{payment.paymentId}</td>
                <td className="border px-4 py-2">{payment.package}</td>
                <td className="border px-4 py-2">{payment.amount}</td>
                <td className="border px-4 py-2">{payment.paymentStatus}</td>
                <td className="border px-4 py-2">{payment.paymentDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No payment details available.</p>
      )}
    </div>
  );
};

export default UserPaymentDetails;
