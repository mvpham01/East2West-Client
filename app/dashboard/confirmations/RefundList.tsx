import React from 'react';
import { RefundFetch } from './types'; 

interface RefundListProps {
  refunds: RefundFetch[];
}

const RefundList: React.FC<RefundListProps> = ({ refunds }) => {
  const confirmRefund = (bookingTourId: number) => {
    fetch(`http://localhost:8080/api/confirmations/tour/${bookingTourId}/refund`, {
      method: 'PUT',
    })
      .then((response) => response.json())
      .then((data) => {
        alert('Refund confirmed');
        // Optionally, you can update the refund list or refetch data here
      })
      .catch((error) => console.error('Error confirming refund:', error));
  };

  return (
    <div className="mx-16">
      <h2 className="text-xl font-semibold mb-4">Refund List</h2>
      {refunds.map((refund) => (
        <div 
          key={refund.bookingTourId} 
          className="border border-gray-300 rounded-lg p-4 mb-4 shadow-md"
        >
          <p><strong>Tour Title:</strong> {refund.tourTitle}</p>
          <p><strong>User:</strong> {refund.user.firstname} {refund.user.lastname}</p>
          <p><strong>Phone:</strong> {refund.user.phone}</p>
          <p><strong>Reason:</strong> {refund.reason || 'No Reason Provided'}</p>
          <p><strong>Refund Status:</strong> {refund.status}</p>
          <p><strong>Refund Amount:</strong> ${refund.refundAmount ? refund.refundAmount.toFixed(2) : 'N/A'}</p>
          <p><strong>Refund Date:</strong> {refund.refundDate ? new Date(refund.refundDate).toLocaleDateString() : 'N/A'}</p>
          {refund.status === 'Waiting Refund' && (
            <button 
              className="mt-2 py-1 px-4 bg-green-500 text-white rounded"
              onClick={() => confirmRefund(refund.bookingTourId)}
            >
              Confirm Refund
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default RefundList;
