// src/components/UploadSimulator.tsx
import React, { useState } from 'react';

const UploadSimulator = () => {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('Idle');

  // We will add the simulation logic here next!
// Inside the UploadSimulator component from Task 1...

const startSimulation = () => {
    setStatus('Uploading...');
    setProgress(0);

    const interval = setInterval(() => {
        // Use functional state updates if depending on previous value
        setProgress(prevProgress => {
            if (prevProgress >= 100) {
                clearInterval(interval); // Stop the simulation
                setStatus('Complete!');
                return 100;
            }
            // Add a random amount of progress
            return Math.min(100, prevProgress + Math.random() * 15);
        });
    }, 500); // Update every half second
};

// ... add a button to trigger it in the return statement:

return (
    <div className="p-4 border rounded-lg shadow-md">
      {/* ... progress bar JSX ... */}
      <p className="text-right mt-1">{Math.round(progress)}%</p>
      <button 
        onClick={startSimulation} 
        // Optional: Disable button if already running
        disabled={status === 'Uploading...'}
        className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded disabled:bg-gray-400"
      >
        Run Simulation
      </button>
    </div>
  );

  return (
    <div className="p-4 border rounded-lg shadow-md">
      <h3 className="text-lg font-semibold">Upload Progress Simulator</h3>
      <p>Status: {status}</p>
      <div className="w-full bg-gray-200 rounded-full h-4 mt-2">
        <div 
          className="bg-blue-600 h-4 rounded-full" 
          style={{ width: `${progress}%` }} 
        />
      </div>
      <p className="text-right mt-1">{progress}%</p>
    </div>
  );
};

export default UploadSimulator;
