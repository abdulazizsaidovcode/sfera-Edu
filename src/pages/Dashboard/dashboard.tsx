
import StatisticCard from '@/components/custom/cards/statistic-card';
import { TfiStatsUp } from "react-icons/tfi";
import {  getStudentStatictik, getStudentWeek } from '@/context/logic/course';
import { useEffect } from 'react';
import { useStatistik, useStudentYear, useWeek} from '@/context/logic/state-managment/statistik';
import ChartWeek from '@/components/chart/chartHafta';
import { useGet } from '@/context/logic/global_functions/useGetOption';
import { getStudentScore } from '@/context/api/url';
import { config } from '@/context/api/token';
import ChartOne from '@/components/chart/chart';


export const dashboardThead = [
  { id: 1, name: 'T/r' },
  { id: 2, name: 'Familiya' },
  { id: 3, name: 'Ism' },
  { id: 4, name: 'Ball' },
];

const Dashboard = () => {
  // const { scoreData, setScoreData } = useScore();
  // const { statistikData, setStatistikData } = useStatistik();
  const dashboardThead = ['#', 'Last Name', 'First Name', 'Score'];
  const { data, getData, loading } = useGet(getStudentScore, config)
  // const { phoneNumber,lastname,firstname,score,setTableStudent} = useStatistik();
  const {setWeekStudent} =useWeek();
  const {setYearData} = useStudentYear()

  useEffect(() => {
    getData();
    getStudentStatictik(setWeekStudent);
    getStudentWeek(setWeekStudent)
    getStudentStatictik(setYearData)
  }, []);
  if (loading) {
    return <div>Loading...</div>;
  }


  return (
    <div className="container mx-auto px-4">
      {/* Statistic Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mb-5 gap-4">
        <StatisticCard
          title="Darslar"
          firstNumber={data?.availableLessons}
          secondNumber={data?.countAllLessons}
          twoNumbers={true}
          iconVisible={true}
          icon={<i className="fa-solid fa-book text-xl mr-2"></i>}
        />
        <StatisticCard
          title="Studentlar"
          firstNumber={data?.ratingStudent === 0 ? 0 : data?.ratingStudent}
          secondNumber={data?.countRatingStudents == 0 ? 0 : data?.countRatingStudents}
          twoNumbers={true}
          iconVisible={true}
          icon={<i className="fa-solid fa-user text-xl mr-2"></i>}
        />
        <StatisticCard
          title="Natija"
          firstNumber={data?.score || 0}
          iconVisible={true}
          icon={<i className="fa-solid fa-star text-xl mr-2"></i>}
        />
      </div>

      {/* Statistic Charts */}
      <div className="flex flex-col lg:flex-row w-full gap-4">
          <div className="w-full lg:w-1/2 p-2 shadow-lg rounded-xl bg-[#FFF5E0]">
            <span className="font-bold text-black mb-4 p-2 text-xl mt-3">Oylik Natijalar</span>
            <TfiStatsUp className="text-2xl font-bold text-red-900 inline-block mb-1 ml-2" />
            <div className="mb-3">
              <ChartOne />
            </div>
          </div>
        <div className="w-full lg:w-1/2 p-2 shadow-lg rounded-xl bg-[#FFF5E0]">
          <span className="font-bold text-black mb-4 p-2 text-xl mt-3">Haftalik Natijalar</span>
          <TfiStatsUp className="text-2xl font-bold text-red-900 inline-block mb-1 ml-2" />
          <div className="mb-3">
            <ChartWeek />
          </div>
        </div>
      </div>

      {/* Statistika kartalari uchun joy */}
      <div className="mt-10">
        {/* <Tables thead={dashboardThead}>
          {dashboardThead.length === 0 ? (
            <tr>
              <td colSpan={dashboardThead.length} className="text-center py-4">No data available</td>
            </tr>
          ) : (
            tableData.map((student: any, index: any) => (
              <tr key={student.id || index} className="hover:bg-gray duration-100">
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
        </Tables> */}
      </div>
    </div>
  );
};

export default Dashboard;