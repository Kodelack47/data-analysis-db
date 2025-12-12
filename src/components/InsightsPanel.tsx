import React, { useState } from 'react';
import { TrendingUp, AlertTriangle, BarChart3, Info, Zap, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DataInsight, DataRow } from '@/types/data';

// --- Placeholder for Week 7 AI Insight Fetch Hook (Uncomment when you have it) ---
// import useFetchAiInsight from '../hooks/useFetchAiInsight'; 

// TypeScript interface for the props the component accepts
interface InsightsPanelProps {
  insights: DataInsight[];
  showAll?: boolean;
  data: DataRow[]; // Explicitly requires the full dataset now
}

const InsightsPanel: React.FC<InsightsPanelProps> = ({ insights, showAll = false, data }) => {
  // Mock hook state for Week 7 (replace with real hook later)
  const [aiInsightData, setAiInsightData] = useState<string | null>(null);
  const [isLoadingAi, setIsLoadingAi] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);
  
  // You would integrate useFetchAiInsight here in Week 7

  const insightsToShow = showAll ? insights : insights.slice(0, 6);

  const hasInsights = insights.length > 0 || aiInsightData !== null || isLoadingAi || aiError;

  if (!hasInsights && (data?.length === 0)) { 
    return (
      <Card className="shadow-lg h-full bg-white/70 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <Info className="h-5 w-5 text-blue-500" />
            Data Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">Upload data to see insights.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-lg h-full bg-white/70 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-teal-500" />
          Top Insights
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {insightsToShow.map((insight, index) => (
          <div key={index} className="p-3 bg-gray-50 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-gray-700">{insight.title}</span>
              <Badge variant="secondary" className="text-xs">{insight.type}</Badge>
            </div>
            <p className="text-sm text-gray-600">{insight.description}</p>
          </div>
        ))}

        {isLoadingAi && (
          <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
            <Loader2 className="h-4 w-4 animate-spin text-blue-600" />
            <span className="text-sm text-blue-700">Generating AI summary...</span>
          </div>
        )}

        {aiError && (
           <div className="flex items-center space-x-3 p-3 bg-red-50 rounded-lg">
           <AlertTriangle className="h-4 w-4 text-red-600" />
           <span className="text-sm text-red-700">{aiError}</span>
         </div>
        )}

        {aiInsightData && (
          <div className="p-4 bg-purple-100 border-l-4 border-purple-500 rounded-r-lg shadow-md">
            <div className="flex items-start mb-2">
              <Zap className="h-5 w-5 text-purple-600 mr-3 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-purple-800 font-semibold">AI Insight Summary:</p>
            </div>
            <p className="text-sm text-gray-700 ml-8">{aiInsightData}</p>
          </div>
        )}

        {insights.length > insightsToShow.length && !showAll && (
          <p className="text-sm text-blue-600 mt-4 cursor-pointer hover:underline">
            View all {insights.length} insights
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default InsightsPanel;
