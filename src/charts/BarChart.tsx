import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';

import { Bar } from 'react-chartjs-2';
import { ExpenseType } from '../utils/Types';
import { useMemo } from 'react';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

type BarChartProps = {
  income: ExpenseType[];
  outcome: ExpenseType[];
};

const BarChart = ({ income, outcome }: BarChartProps) => {
  const incomeAmount = useMemo(() => {
    return income.reduce((acc, prev) => prev.amount + acc, 0);
  }, [income]);

  const outcomeAmount = useMemo(() => {
    return outcome.reduce((acc, prev) => prev.amount + acc, 0);
  }, [outcome]);

  const options = {
    scales: {
      y: {
        ticks: {
          color: '#AEABC2', // change text color here
          font: {
            size: 14,
          },
        },
      },
      x: {
        ticks: {
          color: '#AEABC2',
          font: {
            size: 14,
          },
        },
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: '#AEABC2',
          font: {
            size: 14,
          },
        },
      },
    },
  };

  const expenseData = {
    labels: ['Expenses'],
    datasets: [
      {
        label: 'Income',
        data: [incomeAmount],
        backgroundColor: '#31B447',
        borderRadius: 7,
      },
      {
        label: 'Outcome',
        data: [outcomeAmount],
        backgroundColor: '#EA3138',
        borderRadius: 7,
      },
    ],
  };

  return (
    <div className="h-64 mt-7 flex items-center justify-center">
      <Bar data={expenseData} options={options} />
    </div>
  );
};
export default BarChart;
