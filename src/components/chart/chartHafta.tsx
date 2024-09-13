import { getStudentStatictik, getStudentWeek } from '@/context/logic/course';
import { useStatistik } from '@/context/logic/state-managment/statistik';
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

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const ChartWeek = () => {
  const [chartData, setChartData] = useState<any>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { setStatistikData } = useStatistik();

  const weekDays = [
    'Dushanba', 'Seshanba', 'Chorshanba', 'Payshanba', 'Juma', 'Shanba', 'Yakshanba',
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getStudentWeek((statData: any) => {
          // Ma'lumotlar to'g'riligini tekshirish
          const validData = statData.filter((item: any) => item.week >= 1 && item.week <= 7);

          const days = validData.map((item: { week: number }) => weekDays[item.week - 1]);
          const totalScores = validData.map((item: { count: number }) => item.count);

          setStatistikData(statData);
          
          setChartData({
            labels: days,
            datasets: [
              {
                label: 'Umumiy bal',
                data: totalScores,
                backgroundColor: [
                  '#FF6384', 
                  '#36A2EB', 
                  '#FFCE56', 
                  '#4BC0C0', 
                  '#9966FF', 
                  '#FF9F40', 
                  '#C9CBCF', 
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
  }, [setStatistikData]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context: any) {
            const label = context.label || '';
            const value = context.raw || '';
            return `${label}: ${value} ta`;
          },
        },
      },
    },
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
