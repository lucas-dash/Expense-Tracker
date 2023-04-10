import { HiPlusSmall } from 'react-icons/hi2';
import { Link } from 'react-router-dom';
// types
import { ExpenseType, categoryColorType } from '../../Types';
// hooks
import Transaction from '../Transaction';

type AllExpenseProps = {
  allExpense: ExpenseType[];
  removeTransaction: (expense: ExpenseType) => void;
  categoryColor: categoryColorType[];
};

const AllExpense = ({
  allExpense,
  removeTransaction,
  categoryColor,
}: AllExpenseProps) => {
  return (
    <article className="w-full min-w-max bg-light rounded-xl p-4 mt-7 min-h-[170px] shadow-lg shadow-descript dark:shadow-darkBG">
      <div className="flex justify-between pb-2">
        <h2 className="text-dark font-bold">Last Transaction:</h2>
        <Link
          to={'/addExpense'}
          className="border-2 border-darkBG dark:border-dark dark:text-dark rounded-md px-1 py-0.5 flex items-center font-semibold hover:scale-x-105 transition-all duration-300 "
          aria-label="add expense"
        >
          add
          <HiPlusSmall size={20} className="inline-block font-bold" />
        </Link>
      </div>

      <ul>
        {allExpense.map((expense) => {
          return (
            <Transaction
              expense={expense}
              remove={removeTransaction}
              key={expense.id}
              categoryColor={categoryColor}
            />
          );
        })}
      </ul>
    </article>
  );
};
export default AllExpense;
