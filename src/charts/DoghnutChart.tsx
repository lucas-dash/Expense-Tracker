import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { CategoryFilterType, categoryColorType } from '../utils/Types';
import { useMemo } from 'react';

ChartJS.register(ArcElement, Tooltip, Legend);

type ChartType = {
  outcome?: CategoryFilterType[];
  income?: CategoryFilterType[];
  color: categoryColorType[];
};

const DoghnutChart = ({ outcome, income, color }: ChartType) => {
  const options = {
    plugins: {
      legend: {
        labels: {
          font: {
            size: 14,
          },
          color: '#AEABC2',
          usePointStyle: true,
        },
      },
    },
  };

  const chartOutColor = useMemo(() => {
    return outcome
      ?.map((expense) => {
        return color
          .filter((col) => col.catName === expense.categoryName)
          .flatMap((col) => col.color);
      })
      .flat();
  }, [outcome]);

  const outcomeData = {
    labels: outcome?.map((expense) => expense.categoryName),
    datasets: [
      {
        label: 'Outcome',
        data: outcome?.map((expense) =>
          expense.allExpense.reduce((acc, prev) => acc + prev, 0)
        ),
        backgroundColor: chartOutColor,
        borderColor: 'white',
      },
    ],
  };

  const chartIncoColor = useMemo(() => {
    return income
      ?.map((expense) => {
        return color
          .filter((col) => col.catName === expense.categoryName)
          .flatMap((col) => col.color);
      })
      .flat();
  }, [income]);

  const incomeData = {
    labels: income?.map((expense) => expense.categoryName),
    datasets: [
      {
        label: 'Income',
        data: income?.map((expense) =>
          expense.allExpense.reduce((acc, prev) => acc + prev, 0)
        ),
        backgroundColor: chartIncoColor,
        borderColor: 'white',
      },
    ],
  };

  return (
    <div className="h-64">
      {outcome ? (
        <Doughnut data={outcomeData} options={options} />
      ) : (
        <Doughnut data={incomeData} options={options} />
      )}
    </div>
  );
};
export default DoghnutChart;
