import React from 'react'
import { useNavigate } from "react-router-dom";

function PaymentError() {
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate("/dashboard"); 
  };
  return (
    <div class="flex items-center justify-center min-h-screen bg-gray-50">
      <div class="text-center">
        <p class="mt-4 text-4xl font-semibold text-red-600">
          Payment failed!!!
        </p>
        <img
          src="https://i0.wp.com/nrifuture.com/wp-content/uploads/2022/05/comp_3.gif?fit=800%2C600&ssl=1"
          alt="success"
          class="mx-auto mt-4 w-140 h-100"
        />
        <button style={{ backgroundColor: "#9e085d" }}
          type="button"
          className="w-70 py-3 rounded-lg text-white font-medium hover:bg-[#7d064a] transition-all"
          onClick={handleContinue}> continue..</button>
      </div>
    </div>
  )
}

export default PaymentError
