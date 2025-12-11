import React, { useState } from 'react';
// Import your existing Lucide icons
import { TrendingUp, AlertTriangle, BarChart3, Info, Zap, Loader2 } from 'lucide-react';
// Import your existing shadcn/ui components
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button"; 
// Import your types (adjust paths as necessary)
import { DataInsight } from '@/types/data';

// Define the type for your *uploaded raw data*
interface DataRow {
  [key: string]: any;
}

// Define the new AI Response Type (must match backend Zod schema structure)
interface AiInsightStructure {
    summary: string;
    anomalies: string[];
}

// Update the component props to accept the raw dataset
interface InsightsPanelProps {
  insights: DataInsight[];
  showAll?: boolean;
  data: DataRow[]; // <-- The raw data array
}

const InsightsPanel = ({ insights, showAll = false, data }: InsightsPanelProps) => {
  const [aiInsightData, setAiInsightData] = useState<AiInsightStructure | null>(null);
  const [isLoadingAi, setIsLoadingAi] = useState<boolean>(false);
  const [aiError, setAiError] = useState<string | null>(null);

  const handleGenerateAiInsight = () => {
    if (data?.length === 0) {
      setAiError("Please upload data before generating AI insights.");
      return;
    }

    setIsLoadingAi(true);
    setAiError(null);
    setAiInsightData(null); // Clear previous insights

    // 🛑 CRITICAL FIX: Only send a sample of the data to avoid exceeding AI limits
    const dataSample = data.slice(0, 15); // Adjust sample size as needed

    fetch('http://localhost:4000/insight', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        // Pass the *sampled* raw data stringified to the backend prompt
        prompt: `Generate a professional, concise summary and key insights (trends, anomalies) for the following dataset: ${JSON.stringify(dataSample)}`
      })
    })
    .then(res => {
      if (!res.ok) {
        // If the backend returns a 500, trigger this error
        throw new Error('AI insight server error occurred.');
      }
      return res.json();
    })
    .then(result => {
      // Check for the structured response keys
      if (result.summary) {
          setAiInsightData({
              summary: result.summary,
              anomalies: result.anomalies || [] 
          });
      } else {
          throw new Error('AI response structure was invalid.');
      }
    })
    .catch(err => {
      console.error(err);
      setAiError(err.message || 'Failed to fetch AI insight.');
    })
    .finally(() => {
      setIsLoadingAi(false);
    });
  };
  
  // [Existing Helper Functions: getInsightIcon and getInsightColor]
  const getInsightIcon = (type: DataInsight['type']) => {
    // ... (implementation hidden for brevity)
  };

  const getInsightColor = (type: DataInsight['type']) => {
    // ... (implementation hidden for brevity)
  };

  const hasInsights = insights.length > 0 || aiInsightData !== null || isLoadingAi || aiError;

  if (!hasInsights && (data?.length === 0)) { 
    return (
      <Card>
        <CardHeader>
          <CardTitle>Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500 text-center py-8">
            No insights available. Upload data using the main dashboard interface to see analysis options.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          Data Insights
        </CardTitle>
      </CardHeader>
      <CardContent>

        {/* AI Insight Button */}
        <div className="mb-6">
            <Button
                onClick={handleGenerateAiInsight}
                disabled={isLoadingAi || (data?.length === 0)}
                className="flex items-center gap-2"
            >
                {isLoadingAi ? (
                    <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Generating Insight...
                    </>
                ) : (
                    <>
                        <Zap className="h-4 w-4" />
                        Generate AI Insight
                    </>
                )}
            </Button>
            {(data?.length === 0) && (
                <p className="text-xs text-gray-500 mt-1">Load data in the main dashboard first.</p>
            )}
        </div>
        
        {/* Display the AI Insight Card */}
        {(aiInsightData || aiError) && (
             <div className="mb-4 p-4 border-2 border-indigo-200 bg-indigo-50 rounded-lg shadow-sm">
                <h4 className="font-semibold text-indigo-800 flex items-center gap-2 mb-2">
                    <Zap className="h-4 w-4" /> AI Insight
                </h4>
                
                {aiError && (
                    <p className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-md">
                        {aiError}
                    </p>
                )}

                {aiInsightData && (
                    <div className="text-sm text-gray-700">
                        <p className="mb-3 whitespace-pre-wrap">{aiInsightData.summary}</p>
                        {aiInsightData.anomalies.length > 0 && (
                            <div className="mt-3">
                                <p className="font-semibold text-indigo-800 mb-1">Anomalies Detected:</p>
                                <ul className="list-disc list-inside space-y-1 ml-2">
                                    {aiInsightData.anomalies.map((anomaly, index) => (
                                        <li key={index}>{anomaly}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                )}
             </div>
        )}
       

        {/* [Existing Dynamic List Rendering for predefined insights] */}
        <div className="space-y-4">
            <h3 className="text-lg font-semibold mt-6 mb-3">Manual Insights ({showAll ? insights.length : Math.min(insights.length, 3)})</h3>
          {insights.map((insight, index) => (
            <div key={index} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
              {/* ... (rest of the manual insights rendering logic) */}
            </div>
          ))}
        </div>

      </CardContent>
    </Card>
  );
};

export default InsightsPanel;
