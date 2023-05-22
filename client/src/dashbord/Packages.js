import React, { useState } from 'react';
import { toast } from 'react-toastify';
import UserPaymentDetails from './packagesitem/UserPaymentDetails';

function Packages() {
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [paymentAmount, setPaymentAmount] = useState("");

  const handleBuyClick = (packageInfo) => {
    setSelectedPackage(packageInfo);
  };

  const handleAmountChange = (event) => {
    setPaymentAmount(event.target.value);
  };

  const handlePayment = async () => {
    try {
      if (parseInt(paymentAmount) !== selectedPackage.amount) {
        toast.error('Invalid payment amount');
        return;
      }
      const paymentId = generatePaymentId();
      const paymentDate = new Date();

      const paymentData = {
        paymentId,
        package: selectedPackage.package,
        amount: paymentAmount,
        date: paymentDate,
      };
     
      const token = localStorage.getItem('usersdatatoken');
      const response = await fetch('/payment/details', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        body: JSON.stringify(paymentData),
      });

      if (response.ok) {
        toast.success('Payment successful');
        setSelectedPackage(null);
        setPaymentAmount("");
      } else {
        throw new Error('Payment failed');
      }
    } catch (error) {
      toast.error('Payment failed');
    }
  };

  // Helper function to generate a random payment ID
  const generatePaymentId = () => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let paymentId = "";
    for (let i = 0; i < 8; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      paymentId += characters.charAt(randomIndex);
    }
    return paymentId;
  };

  return (
    <div className="bg-white min-h-screen p-4">
      <div className="flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="border border-indigo-500 rounded-lg p-4">
            <h2 className="text-2xl font-bold mb-4">Basic Package</h2>
            <p className="text-lg mb-4">$25</p>
            <button
              className="bg-indigo-500 text-white px-4 py-2 rounded"
              onClick={() =>
                handleBuyClick({ package: 'Basic Package', amount: 25 })
              }
            >
              Buy
            </button>
          </div>
          <div className="border border-indigo-500 rounded-lg p-4">
            <h2 className="text-2xl font-bold mb-4">Premium Package</h2>
            <p className="text-lg mb-4">$50</p>
            <button
              className="bg-indigo-500 text-white px-4 py-2 rounded"
              onClick={() =>
                handleBuyClick({ package: 'Premium Package', amount: 50 })
              }
            >
              Buy
            </button>
          </div>
          <div className="border border-indigo-500 rounded-lg p-4">
            <h2 className="text-2xl font-bold mb-4">Family Package</h2>
            <p className="text-lg mb-4">$100</p>
            <button
              className="bg-indigo-500 text-white px-4 py-2 rounded"
              onClick={() =>
                handleBuyClick({ package: 'Family Package', amount: 100 })
              }
            >
              Buy
            </button>
          </div>
          <div className="border border-indigo-500 rounded-lg p-4">
            <h2 className="text-2xl font-bold mb-4">Student Package</h2>
            <p className="text-lg mb-4">$25</p>
            <button
              className="bg-indigo-500 text-white px-4 py-2 rounded"
              onClick={() =>
                handleBuyClick({ package: 'Student Package', amount: 25 })
              }
            >
              Buy
            </button>
          </div>
        
        </div>
        
      </div>
      <div className='bg-blue-400 mt-8 rounded-xl w-1225 h-343 p-3 '>
         <UserPaymentDetails/>
        </div>
      {/* Popup box */}
      {selectedPackage && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-4 rounded-xl">
            <h2 className="text-2xl font-bold mb-4">
              {selectedPackage.package}
            </h2>
            <p className="text-lg mb-4">Amount: ${selectedPackage.amount}</p>
            <input
              type="number"
              value={paymentAmount}
              onChange={handleAmountChange}
              placeholder="Enter payment amount"
              className="border border-gray-300 rounded-lg p-2 mb-4"
            />
            <button
              className="bg-indigo-500 text-white px-4 py-2 rounded"
              onClick={handlePayment}
            >
              Pay
            </button>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded ml-2"
              onClick={() => setSelectedPackage(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Packages;


