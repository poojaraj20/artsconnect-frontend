import React from 'react'
import { useNavigate } from "react-router-dom";

function PaymentSuccess() {
  const navigate = useNavigate();
  const handleContinue = () => {
    navigate("/dashboard"); 
  };
  return (
    <div class="flex items-center justify-center min-h-screen bg-gray-50">
      <div class="text-center">

        <p class="mt-4 text-4xl font-semibold text-green-600">
          Payment successful✅🎉!!!
        </p>
        <img
          src="https://pan.utivle.in/WL-CNT/main/assest/img/success.gif"
          alt="success"
          class="mx-auto mt-4 w-100 h-100"
        />
        <button style={{ backgroundColor: "#9e085d" }}
          type="button"
          className="w-70 py-3 rounded-lg text-white font-medium hover:bg-[#7d064a] transition-all"
          onClick={handleContinue}> continue..</button>
      </div>
    </div>

  )
}

export default PaymentSuccess
