import React, { useState } from 'react';
import ApexCharts from 'react-apexcharts';

const ChartOne = () => {
  // Default qiymatlar
  const defaultData = [
    { name: 'January', incomeTotal: 1000 },
    { name: 'February', incomeTotal: 1500 },
    { name: 'March', incomeTotal: 1200 },
    { name: 'April', incomeTotal: 1700 },
    { name: 'May', incomeTotal: 900 },
    { name: 'May', incomeTotal: 900 },
    { name: 'May', incomeTotal: 900 },
    { name: 'May', incomeTotal: 900 },
    { name: 'May', incomeTotal: 900 },
    { name: 'May', incomeTotal: 900 },
    { name: 'May', incomeTotal: 900 },
    { name: 'May', incomeTotal: 900 },
    { name: 'May', incomeTotal: 900 },
  ];

  const [data] = useState(defaultData);
  const [isLoading] = useState(false); 

  const chartOptions = {
    chart: {
      type: 'bar',
      height: 300,
    },
    xaxis: {
      categories: data.map((item) => item.name),
    },
    plotOptions: {
      bar: {
        horizontal: false,
      },
    },
    dataLabels: {
      enabled: true,
    },
  };

  const chartSeries = [
    {
      name: 'Income Total',
      data: data.map((item) => item.incomeTotal),
    },
  ];

  return (
    <div>
      {isLoading ? (
        <p>Loading chart data...</p>
      ) : (
        <ApexCharts
          options={chartOptions}
          series={chartSeries}
          type="bar"
          height={280}  
         
        />
      )}
    </div>
  );
};

export default ChartOne;
