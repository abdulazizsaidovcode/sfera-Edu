import ChartOne from '@/components/chart/chart';
import StatisticCard from '@/components/custom/cards/statistic-card';
import Tables from '@/components/custom/table';
import { TfiStatsUp } from "react-icons/tfi";
import { getStudentInfo, getStudentRating } from '@/context/logic/course';
import { useScore } from '@/context/logic/state-managment/score';
import { useStudentRating } from '@/context/logic/state-managment/statistik';
import { useEffect, useState } from 'react';

export const dashboardThead = [
  { id: 1, name: 'T/r' },
  { id: 2, name: 'Familiya' },
  { id: 3, name: 'Ism' },
  { id: 4, name: 'Ball' },
];

const Dashboard = () => {
  const { availableLessons, countAllLessons, countRatingStudents, ratingStudent, score, setScoreData } = useScore();
  const { studentRating, setStudentRating } = useStudentRating();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getStudentInfo(setScoreData);
        await getStudentRating(setStudentRating);
      } catch (err) {
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [setScoreData, setStudentRating]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mx-auto px-4">
      {/* Statistik kartalar gridda */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
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

      <div className="flex flex-col lg:flex-row w-full gap-4 shadow-lg">
        <div className="w-full lg:w-1/2 p-2">
          <span className="font-bold text-black mb-4 p-2 text-xl mt-3">Oylik Natijalar</span>
          <TfiStatsUp className="text-2xl font-bold text-red-900 inline-block mb-1 ml-2" />
          <div className="mb-3">
            <ChartOne />
          </div>
        </div>
        <div className="w-full lg:w-1/2 p-2">
          <span className="font-bold text-black mb-4 p-2 text-xl mt-3">Haftalik Natijalar</span>
          <TfiStatsUp className="text-2xl font-bold text-red-900 inline-block mb-1 ml-2" />
          <div className="mb-3">
            <ChartOne />
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
            studentRating.map((student:any, index:any) => (
              <tr key={student.id || index} className="hover:bg-whiteGreen duration-100">
                <td className="border-b border-[#eee] min-w-[200px] p-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">{index + 1}</p>
                </td>
                <td className="border-b border-[#eee] min-w-[200px] p-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">{student.lastname}</p>
                </td>
                <td className="border-b border-[#eee] min-w-[200px] p-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">{student.firstname}</p>
                </td>
                <td className="border-b border-[#eee] min-w-[200px] p-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">{student.score}</p>
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
