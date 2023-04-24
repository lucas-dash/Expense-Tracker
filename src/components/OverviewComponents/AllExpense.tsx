import { HiPlusSmall } from 'react-icons/hi2';
import { Link } from 'react-router-dom';
// types
import { ExpenseType, categoryColorType } from '../../utils/Types';
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
    <article className="sm:w-4/5 mx-auto min-w-[270px] bg-light rounded-xl p-1 min-[350px]:p-4 mt-7 min-h-[170px] shadow-lg shadow-descript dark:shadow-darkBG max-h-[430px] overflow-scroll overflow-x-hidden max-w-[900px]">
      <div className="flex justify-between items-center pb-2">
        <h2 className="text-dark font-bold max-[350px]:pl-2">
          Last Transaction:
        </h2>
        <Link
          to={'/addExpense'}
          className="border-2 border-darkBG dark:border-dark dark:text-dark rounded-md px-1 py-0.5 flex items-center font-semibold hover:scale-x-105 transition-all duration-300 "
          aria-label="add expense"
        >
          add
          <HiPlusSmall size={20} className="inline-block font-bold" />
        </Link>
      </div>

      <ul className="flex flex-col gap-3">
        {allExpense.length <= 0 ? (
          <li className="text-center dark:text-dark">No Transaction yet.</li>
        ) : (
          allExpense.map((expense) => {
            return (
              <Transaction
                expense={expense}
                remove={removeTransaction}
                key={expense.id}
                categoryColor={categoryColor}
              />
            );
          })
        )}
      </ul>
    </article>
  );
};
export default AllExpense;
