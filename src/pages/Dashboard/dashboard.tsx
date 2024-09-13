import ChartOne from '@/components/chart/chart';
import StatisticCard from '@/components/custom/cards/statistic-card';
import Tables from '@/components/custom/table';
import { getStudentStatistic } from '@/context/api/url';
import { getStudentInfo, getStudentStatictik } from '@/context/logic/course';
import { useScore } from '@/context/logic/state-managment/score';
import { useStatistik } from '@/context/logic/state-managment/statistik';
import { useEffect, useState } from 'react';
import { TfiStatsUp } from "react-icons/tfi";

// Sample data for the table
export const dashboardTbody = [
  {id: 1, tr: '1', thead1: 'Row 1 Data 1', thead2: 'Row 1 Data 2', thead3: 'Row 1 Data 3', thead4: 'Row 1 Data 4'},
  {id: 2, tr: '2', thead1: 'Row 2 Data 1', thead2: 'Row 2 Data 2', thead3: 'Row 2 Data 3', thead4: 'Row 2 Data 4'},
  {id: 3, tr: '3', thead1: 'Row 3 Data 1', thead2: 'Row 3 Data 2', thead3: 'Row 3 Data 3', thead4: 'Row 3 Data 4'},
  {id: 4, tr: '4', thead1: 'Row 4 Data 1', thead2: 'Row 4 Data 2', thead3: 'Row 4 Data 3', thead4: 'Row 4 Data 4'}
];

export const dashboardThead = [
  {id: 5, name: 'T/r'},
  {id: 1, name: 'thead 1'},
  {id: 2, name: 'thead 2'},
  {id: 3, name: 'thead 3'},
  {id: 4, name: 'thead 4'}
];

const Dashboard = () => {
  const { availableLessons, countAllLessons, countRatingStudents, ratingStudent, score, setScoreData } = useScore();
  const { month, totalScore, setStatistikData } = useStatistik();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getStudentInfo(setScoreData);
        await getStudentStatictik(setStatistikData);
      } catch (err) {
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [setScoreData, setStatistikData]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mx-auto px-4">
      {/* Statistik kartalar gridda */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatisticCard
          title="Darslar"
          firstNumber={availableLessons}
          secondNumber={countAllLessons}
          twoNumbers
          iconVisible
          icon={<i className="fa-solid fa-user text-xl mr-2"></i>}
        />
        <StatisticCard
          title="Studentlar"
          firstNumber={countRatingStudents}
          secondNumber={ratingStudent}
          twoNumbers
          iconVisible
          icon={<i className="fa-solid fa-chalkboard-teacher text-xl mr-2"></i>}
        />
        <StatisticCard
          title="Natija"
          firstNumber={score}
          iconVisible
          icon={<i className="fa-solid fa-book text-xl mr-2"></i>}
        />
      </div>

      {/* ChartOne komponenti */}
      <div className="mt-8 p-2 mb-4">
        <span className='font-bold text-black mb-4 p-2 text-xl mt-3'>
          Yil davomida oylik statistika
        </span>
        <TfiStatsUp className="text-2xl font-bold text-red-900 inline-block mb-1 ml-2" />
        <div className='shadow-xl mb-3'>
          <ChartOne />
        </div>
      </div>

      <div className="mt-10">
        <Tables thead={dashboardThead}>
          {dashboardTbody.map((sts) => (
            <tr key={sts.id} className="hover:bg-whiteGreen duration-100">
              <td className="border-b border-[#eee] min-w-[200px] p-5 dark:border-strokedark">
                <p className="text-black dark:text-white">{sts.tr}</p>
              </td>
              <td className="border-b border-[#eee] min-w-[200px] p-5 dark:border-strokedark">
                <p className="text-black dark:text-white">{sts.thead1}</p>
              </td>
              <td className="border-b border-[#eee] min-w-[200px] p-5 dark:border-strokedark">
                <p className="text-black dark:text-white">{sts.thead2}</p>
              </td>
              <td className="border-b border-[#eee] min-w-[200px] p-5 dark:border-strokedark">
                <p className="text-black dark:text-white">{sts.thead3}</p>
              </td>
              <td className="border-b border-[#eee] min-w-[200px] p-5 dark:border-strokedark">
                <p className="text-black dark:text-white">{sts.thead4}</p>
              </td>
            </tr>
          ))}
        </Tables>
      </div>
    </div>
  );
};

export default Dashboard;
