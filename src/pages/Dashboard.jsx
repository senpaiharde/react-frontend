import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Bar, BarChart, Legend, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { fetchToys } from "../store/toySlice";



export function Dashboard() {
    const dispatch = useDispatch()
    const toys = useSelector(state => state.toy.toys);
    const [chartData, setChartData] = useState([]);
    const [hasFetched, setHasFetched] = useState(false);
    


    useEffect(() => {
        if (!hasFetched && toys.length === 0) {
            console.warn("⚠ No toys available for charts, fetching...");
            dispatch(fetchToys()).then(() => setHasFetched(true)); 
        }
    }, [dispatch, toys.length, hasFetched]); 


    const processChartData = (toys) => {
        if (toys.length > 0) {
            const labels = [...new Set(toys.flatMap(toy => toy.labels))];
            return labels.map(label => ({
                label,
                count: toys.filter(toy => toy.labels.includes(label)).length,
                avgPrice: (
                    toys.filter(toy => toy.labels.includes(label)).reduce((x, y) => x + y.price, 0) /
                    toys.filter(toy => toy.labels.includes(label)).length
                ).toFixed(2),
            }));
        }
        return [];
    };

    
    useEffect(() => {
        setChartData(processChartData(toys));
        console.log("📊 Chart Data Updated:", processChartData(toys));
    }, [toys]); 


    return(
        <div className="dashboard">
            <h2 className="dashboard-title">📊 Dashboard</h2>
            {toys.length === 0 ? (<p>Loading Data...</p>) : (
            <div className="charts-container">
                <div className="chart">
                    <h2>Inventory by Label</h2>
                    <ResponsiveContainer>
                        <BarChart data={chartData}>
                            <XAxis dataKey='label'/>
                            <YAxis/>
                            <Tooltip/>
                            <Legend/>
                            <Bar dataKey='count' fill="#82ca9d"/>
                             </BarChart>
                    </ResponsiveContainer>
                </div>
                <div className="chart">
                <h2 className="chart-title">Price Distribution</h2>
                    <ResponsiveContainer width='100%' height={300}>
                        <PieChart>
                            <Pie data={chartData} dataKey='avgPrice' nameKey='label' fill="#8884d8" label/>
                            <Tooltip/>
                            </PieChart>
                    </ResponsiveContainer>
                </div>
                <div className="chart">
                  <h2 className="chart-title">Sales Over Time</h2>
                    <ResponsiveContainer width="100%" height={300}> 
                    <LineChart data={Array.from({ length: 7 }, (_, i) => ({ 
                                   day: `Day ${i + 1}`, 
                                 sales: Math.floor(Math.random() * 100) 
                            }))}>
                            <XAxis dataKey='day'/>
                            <YAxis/>
                            <Tooltip/>
                            <Legend/>
                            <Bar type="monotone" dataKey='sales' stroke="#ff7300"/>
                             </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
            )}
        </div>
    );
}