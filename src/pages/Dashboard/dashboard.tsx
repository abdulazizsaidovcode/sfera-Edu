import StatisticCard from '@/components/custom/cards/statistic-card';
import React from 'react';

const Dashboard = () => {
  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatisticCard
          title="Students"
          firstNumber={100}
          iconVisible
          icon={<i className="fa-solid fa-user"></i>}
        />
        <StatisticCard
          title="Teachers"
          firstNumber={50}
          iconVisible
          icon={<i className="fa-solid fa-chalkboard-teacher"></i>}
        />
        <StatisticCard
          title="Courses"
          firstNumber={25}
          iconVisible
          icon={<i className="fa-solid fa-book"></i>}
        />
      </div>
    </div>
  );
};

export default Dashboard;
