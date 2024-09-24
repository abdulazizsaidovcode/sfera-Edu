import { getStudentStatictik } from '@/context/logic/course';
import { useStudentYear } from '@/context/logic/state-managment/statistik';
import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2'; 
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement, 
} from 'chart.js';
import { setConfig } from '@/context/api/token';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const ChartOne = () => {
  const [chartData, setChartData] = useState<any>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { setYearData } = useStudentYear();

  useEffect(() => {
    setConfig()
    const fetchData = async () => {
      try {
        await getStudentStatictik((statData: any) => {
          if (statData.length === 0) {
            setChartData(null); 
            return;
          }

          const months = statData.map((item: { monthName: string }) => item.monthName);
          const totalScores = statData.map((item: { totalScore: number }) => item.totalScore);

          
          const allZero = totalScores.every((score: number) => score === 0);
          if (allZero) {
            setChartData(null); 
            return;
          }

          setYearData(statData);

          setChartData({
            labels: months,
            datasets: [
              {
                label: 'Umumiy bal',
                data: totalScores,
                backgroundColor: [
                  'rgba(75,192,192,0.6)',
                  'rgba(255,99,132,0.6)',
                  'rgba(255,206,86,0.6)',
                  'rgba(75,192,192,0.6)',
                  'rgba(153,102,255,0.6)',
                ],
                borderColor: 'white',
                borderWidth: 4,
              },
            ],
          });
        });

        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching statistics:', error);
        setError('Failed to load chart data');
        setIsLoading(false);
      }
    };

    fetchData();
  }, [setYearData]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context: any) {
            const label = context.label || '';
            const value = context.raw || '';
            return `${label}: ${value} ball`;
          },
        },
      },
    },
  };

  return (
    <div className="flex flex-col items-center">
      {isLoading && <p>Loading chart data...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!isLoading && !error && !chartData && <p>No data available</p>}
      {!isLoading && !error && chartData && (
        <div className="w-full max-w-md" style={{ height: '350px' }}>
          <Doughnut data={chartData} options={options} />
        </div>
      )}
    </div>
  );
};

export default ChartOne;
