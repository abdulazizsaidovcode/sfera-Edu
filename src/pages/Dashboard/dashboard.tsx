import ChartOne from '@/components/chart/chart';
import StatisticCard from '@/components/custom/cards/statistic-card';
import { TfiStatsUp } from "react-icons/tfi";

const Dashboard = () => {
  return (
    <div className="container mx-auto px-4">
      {/* Statistik kartalar gridda */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatisticCard
          title="Students"
          firstNumber={100}
          iconVisible
          icon={<i className="fa-solid fa-user text-xl mr-2"></i>} // Icon next to the text and larger
        />
        <StatisticCard
          title="Teachers"
          firstNumber={50}
          iconVisible
          icon={<i className="fa-solid fa-chalkboard-teacher text-xl mr-2"></i>} // Icon next to the text and larger
        />
        <StatisticCard
          title="Courses"
          firstNumber={25}
          iconVisible
          icon={<i className="fa-solid fa-book text-xl mr-2"></i>} // Icon next to the text and larger
        />
      </div>
      {/* ChartOne komponenti */}
      <div className="mt-8 p-2 mb-4">
        <span className='font-bold text-black mb-4 p-2 text-xl mt-3 '>
          Yil davomida oylik statistika
        </span>
        <TfiStatsUp className="text-2xl font-bold text-red-900 inline-block mb-1 ml-2" /> 
        <div className='shadow-xl mb-3'>
          <ChartOne />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
