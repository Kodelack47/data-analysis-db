// src/components/DataAnalyzer.tsx
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Sample data to start with (including an invalid entry 'a' for error testing)
const sampleData = [88, 92, 79, 95, 87, 90, 84, 89, 93, 86, 150, 'a', 45]; 

const DataAnalyzer = () => {
  const [data, setData] = useState<any[]>([]); // Use 'any[]' here because sampleData has a string 'a'
  const [results, setResults] = useState<any>(null); // To store calculated stats
  const [error, setError] = useState<string>('');

  // Function to load the sample data into our component state
  const loadSampleData = () => {
      setData(sampleData);
      setError('');
      setResults(null); // Clear previous results when loading new data
  };

  // Function that handles the main analysis logic
  const analyzeData = () => {
    // 1. Error Handling: Filter out non-numeric values and empty arrays
    // We cast to number[] because we filtered out non-numbers
    const validNumbers = data.filter(item => typeof item === 'number' && !isNaN(item)) as number[];

    if (validNumbers.length === 0) {
        setError('No valid numeric data found in the dataset.');
        setResults(null);
        return;
    }
    setError('');

    // 2. Calculations
    const count = validNumbers.length;
    const sum = validNumbers.reduce((a, b) => a + b, 0);
    const average = sum / count;
    const minimum = Math.min(...validNumbers);
    const maximum = Math.max(...validNumbers);
    const range = maximum - minimum;

    // Median calculation requires sorting the data
    const sortedData = [...validNumbers].sort((a, b) => a - b);
    let median;
    if (count % 2 === 0) {
        // Even number of items: average the two middle numbers
        const midIndex = count / 2;
        median = (sortedData[midIndex - 1] + sortedData[midIndex]) / 2;
    } else {
        // Odd number of items: take the middle number
        median = sortedData[Math.floor(count / 2)];
    }

    // 3. Store results in state
    setResults({
        count,
        sum,
        average: average.toFixed(2), // Round for display
        minimum,
        maximum,
        median,
        range,
    });
  };

  return (
    <Card className="max-w-xl mx-auto">
      <CardHeader>
        <CardTitle>Dataset Analysis Tool</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex space-x-4">
            <Button onClick={loadSampleData}>Load Sample Data</Button>
            <Button onClick={analyzeData} disabled={data.length === 0}>Analyze Data</Button>
        </div>

        {error && <p className="text-red-600">{error}</p>}
        
        {data.length > 0 && !results && <p>Loaded {data.length} items. Click Analyze Data to view statistics.</p>}

        {/* This section displays the results once available */}
        {results && (
          <div className="mt-4 grid grid-cols-2 gap-3 p-4 bg-gray-50 rounded-lg">
            <div className="font-semibold">Count:</div><div>{results.count}</div>
            <div className="font-semibold">Sum:</div><div>{results.sum}</div>
            <div className="font-semibold">Average:</div><div>{results.average}</div>
            <div className="font-semibold">Median:</div><div>{results.median}</div>
            <div className="font-semibold">Minimum:</div><div>{results.minimum}</div>
            <div className="font-semibold">Maximum:</div><div>{results.maximum}</div>
            <div className="font-semibold">Range:</div><div>{results.range}</div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DataAnalyzer;
