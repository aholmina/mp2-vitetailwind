import React from 'react';

const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-[100px]">
    <div className="w-9 h-9 border-4 border-solid border-black/10 border-l-primary-color rounded-full animate-spin"></div>
  </div>
);

export default LoadingSpinner;
