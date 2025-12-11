import React, { useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  Cell,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Sample data (replace with DataAnalyzer results for real data later)
const sampleData = [
  { name: "Jan", value: 400 },
  { name: "Feb", value: 300 },
  { name: "Mar", value: 200 },
  { name: "Apr", value: 278 },
  { name: "May", value: 189 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28EFF"];

// The component accepts data via props (defaults to sampleData if none provided)
const SimpleChart = ({ data = sampleData }) => {
  const [chartType, setChartType] = useState("Bar");

  // Error Handling (Requirement)
  if (!data || !Array.isArray(data) || data.length === 0) {
    return <Card className="p-4"><p>No data available for charting.</p></Card>;
  }

  // Chart Type Selector (Buttons)
  const ChartSelector = () => (
    <div className="flex gap-2 mb-4">
      <Button onClick={() => setChartType("Bar")} variant={chartType === "Bar" ? "default" : "outline"}>Bar Chart</Button>
      <Button onClick={() => setChartType("Line")} variant={chartType === "Line" ? "default" : "outline"}>Line Chart</Button>
      <Button onClick={() => setChartType("Pie")} variant={chartType === "Pie" ? "default" : "outline"}>Pie Chart</Button>
      <Button onClick={() => setChartType("Scatter")} variant={chartType === "Scatter" ? "default" : "outline"}>Scatter Chart</Button>
    </div>
  );

  return (
    <Card className="max-w-4xl mx-auto">
        <CardHeader><CardTitle>Data Visualization</CardTitle></CardHeader>
        <CardContent>
            <ChartSelector />
            {/* Responsive Design (Requirement) */}
            <div style={{ width: "100%", height: 350 }}>
                <ResponsiveContainer width="100%" height={300}>
                    {/* Switch Statement for Chart Types (Requirement) */}
                    {(() => {
                    switch (chartType) {
                        case "Bar":
                        return (
                            <BarChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="value" fill="#0088FE" />
                            </BarChart>
                        );
                        case "Line":
                        return (
                            <LineChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="value" stroke="#00C49F" />
                            </LineChart>
                        );
                        case "Pie": // Bonus Chart Type
                        return (
                            <PieChart>
                            <Tooltip />
                            <Legend />
                            <Pie
                                data={data}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={100}
                                fill="#FFBB28"
                                label
                            >
                                {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            </PieChart>
                        );
                        case "Scatter": // Bonus Chart Type
                        return (
                            <ScatterChart>
                            <CartesianGrid />
                            <XAxis dataKey="name" type="category" />
                            <YAxis dataKey="value" />
                            <Tooltip />
                            <Legend />
                            <Scatter name="Values" data={data} fill="#A28EFF" />
                            </ScatterChart>
                        );
                        default:
                        return null;
                    }
                    })()}
                </ResponsiveContainer>
            </div>
        </CardContent>
    </Card>
    );
 };

export default SimpleChart;
