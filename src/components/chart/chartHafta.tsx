import { getStudentStatictik, getStudentWeek } from '@/context/logic/course';
import { useStatistik, useWeek } from '@/context/logic/state-managment/statistik';
import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2'; // Import Doughnut chart
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement, // Import for pie/doughnut chart
} from 'chart.js';

// Register the necessary components for Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const ChartWeek = () => {
  const [chartData, setChartData] = useState<any>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const {setWeekStudent} = useWeek()

  

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getStudentWeek((statData: any) => {
          const months = statData.map((item: { weekDay: string }) => item.weekDay);
          const totalScores = statData.map((item: { count: number }) => item.count);

          setWeekStudent(statData);

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
  }, [setWeekStudent]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        callbacks: {
          label: function(context:any) {
            const label = context.label || '';
            const value = context.raw || '';
            return `${label}: ${value} ta`; 
          }
        }
      }
    }
  };

  return (
    <div className="flex flex-col items-center">
      {isLoading && <p>Loading chart data...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!isLoading && !error && (
        <div className="w-full max-w-md" style={{ height: '350px' }}>
          <Doughnut data={chartData} options={options} />
        </div>
      )}
    </div>
  );
};

export default ChartWeek;
