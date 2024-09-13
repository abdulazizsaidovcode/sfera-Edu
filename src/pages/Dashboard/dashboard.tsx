import ChartOne from '@/components/chart/chart';
import StatisticCard from '@/components/custom/cards/statistic-card';
import Tables from '@/components/custom/table';
import { TfiStatsUp } from "react-icons/tfi";
import { getStudentInfo, getStudentRating, getStudentStatictik } from '@/context/logic/course';
import { useScore } from '@/context/logic/state-managment/score';
import { useStatistik, useStudentRating } from '@/context/logic/state-managment/statistik';
import { useEffect, useState } from 'react';

export const dashboardThead = [
  { id: 1, name: 'T/r' },
  { id: 2, name: 'Familiya' },
  { id: 3, name: 'Ism' },
  { id: 4, name: 'Ball' },
];

const Dashboard = () => {
  const { studentRating, setStudentRating } = useStudentRating();
  const { statistikData, setStatistikData } = useStatistik();
  const {score,availableLessons,countAllLessons,countRatingStudents,ratingStudent} = useScore()
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getStudentRating(setStudentRating);
        await getStudentStatictik(setStatistikData);
        getStudentInfo(score)
      } catch (err) {
        setError('Malumot yuq');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [setStatistikData, setStudentRating]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mb-4 gap-4">
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
      {/* Statistic charts */}

      <div className="flex flex-col lg:flex-row w-full gap-4 shadow-lg">
        <div className="w-full lg:w-1/2 p-2">
          <span className="font-bold text-black mb-4 p-2 text-xl mt-3">Oylik Natijalar</span>
          <TfiStatsUp className="text-2xl font-bold text-red-900 inline-block mb-1 ml-2" />
          <div className="mb-3">
            {statistikData && statistikData.length > 0 ? (
              <ChartOne data={statistikData } />
            ) : (
              <p>Natijalar yo'q</p> // Display a message or fallback chart
            )}
          </div>
        </div>
        <div className="w-full lg:w-1/2 p-2">
          <span className="font-bold text-black mb-4 p-2 text-xl mt-3">Haftalik Natijalar</span>
          <TfiStatsUp className="text-2xl font-bold text-red-900 inline-block mb-1 ml-2" />
          <div className="mb-3">
            {statistikData && statistikData.length > 0 ? (
              <ChartOne data={statistikData} />
            ) : (
              <p>Natijalar yo'q</p> // Display a message or fallback chart
            )}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="mt-10">
        <Tables thead={dashboardThead}>
          {studentRating.length === 0 ? (
            <tr>
              <td colSpan={dashboardThead.length} className="text-center py-4">No data available</td>
            </tr>
          ) : (
            studentRating.map((student: any, index: any) => (
              <tr key={student.id || index} className="hover:bg-whiteGreen duration-100">
                <td className="border-b border-[#eee] min-w-[200px] p-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">{index + 1}</p>
                </td>
                <td className="border-b border-[#eee] min-w-[200px] p-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">{student.lastname ?? 'N/A'}</p>
                </td>
                <td className="border-b border-[#eee] min-w-[200px] p-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">{student.firstname ?? 'N/A'}</p>
                </td>
                <td className="border-b border-[#eee] min-w-[200px] p-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">{student.score ?? 'N/A'}</p>
                </td>
              </tr>
            ))
          )}
        </Tables>
      </div>
    </div>
  );
};

export default Dashboard;
