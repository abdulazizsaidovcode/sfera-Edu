import { getStatistikTeacher } from '@/context/logic/course';
import { useStudentYear } from '@/context/logic/state-managment/statistik';
import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2'; 
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';


ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ChartTeacher = () => {
  const [chartData, setChartData] = useState<any>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { setYearData } = useStudentYear();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getStatistikTeacher((statData: any) => {
          const monthsOfYear = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
          ];
          const monthMap = new Map(monthsOfYear.map((month) => [month, 0]));
            statData.forEach((item: { month: string; totalScore: number; groupName: string }) => {
            if (monthMap.has(item.month)) {
              monthMap.set(item.month, item.totalScore);
            }
          });

          // Extract months and scores
          const months = [...monthMap.keys()];
          const totalScores = [...monthMap.values()];

          // Extract unique groupNames
          const groupNames = [...new Set(statData.map((item: { groupName: string }) => item.groupName))];

          setYearData(statData);

          setChartData({
            labels: months,
            datasets: groupNames.map((groupName) => ({
              label: groupName,
              data: totalScores,
              backgroundColor: 'rgba(75,192,192,0.6)',
              borderColor: 'rgba(75,192,192,1)',
              borderWidth: .1,
            })),
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
            const label = context.dataset.label || '';
            const value = context.raw || '';
            return `${label}: ${value} ball`;
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: '', 
        },
        ticks: {
          autoSkip: false, 
        },
      },
      y: {
        title: {
          display: true,
          text: '',
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="flex w-full items-center shadow-xl">
      {isLoading && <p>Loading chart data...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!isLoading && !error && !chartData && <p>No data available</p>}
      {!isLoading && !error && chartData && (
        <div className="w-full shadow-xl" style={{ height: '350px' }} onClick={()=>{
          
        }}>
          <Bar data={chartData} options={options} />
        </div>
      )}
    </div>
  );
};

export default ChartTeacher;
