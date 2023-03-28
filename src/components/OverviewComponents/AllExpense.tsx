import { useState } from 'react';
import { HiPlusSmall } from 'react-icons/hi2';
import ExpenseList from '../ExpenseList';

interface TrackerBalanceProps {
  addExpense: (value: (prev: boolean) => boolean) => void;
}

const AllExpense = ({ addExpense }: TrackerBalanceProps) => {
  return (
    <article className="w-full min-w-max bg-light rounded-xl p-4 mt-7 min-h-[170px] shadow-lg shadow-descript dark:shadow-darkBG">
      <div className="flex justify-between pb-2">
        <h2 className="text-dark font-bold">Last Transaction:</h2>
        <button
          className="border-2 border-darkBG dark:border-dark dark:text-dark rounded-md px-1 py-0.5 flex items-center font-semibold hover:scale-x-105 transition-all duration-300 "
          onClick={() => addExpense((prev) => !prev)}
          aria-label="add expense"
        >
          add
          <HiPlusSmall
            size={20}
            style={{ display: 'inline-block', fontWeight: 'bold' }}
          />
        </button>
      </div>

      <div>
        <ExpenseList />
        <ExpenseList />
      </div>
    </article>
  );
};
export default AllExpense;
