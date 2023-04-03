import { TiDelete } from 'react-icons/ti';
import { CategoryType, ExpenseType, CategoryFilterType } from '../Types';

type TransactionPropType = {
  expense?: ExpenseType;
  remove?: (expense: ExpenseType) => void;
  filterCategory?: CategoryFilterType;
};

const Transaction = ({
  expense,
  remove,
  filterCategory,
}: TransactionPropType) => {
  // todo formate Date and amount
  // todo upcoming transaction
  // todo minus or plus on category
  // todo income or outcome category

  {
    if (expense && remove) {
      const { amount, category, date, type, note } = expense;

      return (
        <li className="flex justify-between items-center gap-4 font-nunito">
          <div className="flex gap-3 items-center">
            <span className="w-7 h-7 rounded-full bg-accent-200"></span>
            <div className="flex items-start flex-col justify-center">
              {/* name */}
              <h4 className="md:text-lg dark:text-dark">{category}</h4>
              {/* <h4 className="md:text-lg dark:text-dark">Food & drinks</h4> */}
              {/* count of transaction */}
              {/* only in category, in expense date */}
              <p className="text-sm text-descript">{date}</p>
              {/* <p className="text-sm text-descript">2 transaction</p> */}
            </div>
          </div>

          <div className="flex gap-1">
            {/* if + green if - red */}
            {/* category: all money in the category */}
            <p className="md:text-lg dark:text-dark">
              {type === 'Outcome' ? `-${amount}` : amount} Kč
            </p>
            {/* <p className="md:text-lg dark:text-dark">-3902 Kč</p> */}
            {/* show if is transaction */}
            <button
              className="cursor-pointer text-darkBG"
              onClick={() => remove(expense)}
            >
              <TiDelete size={20} />
            </button>
          </div>
        </li>
      );
    } else if (filterCategory) {
      const { categoryName, allExpense } = filterCategory;

      const totalInCategory = allExpense.reduce((prev, acc) => acc + prev, 0);

      return (
        <li className="flex justify-between items-center gap-4 font-nunito">
          <div className="flex gap-3 items-center">
            <span className="w-7 h-7 rounded-full bg-accent-200"></span>
            <div className="flex items-start flex-col justify-center">
              {/* name */}
              <h4 className="md:text-lg dark:text-dark">{categoryName}</h4>
              {/* count of transaction */}
              <p className="text-sm text-descript">{allExpense.length}</p>
            </div>
          </div>

          <div className="flex gap-1">
            {/* if + green if - red */}
            {/* category: all money in the category */}
            <p className="md:text-lg dark:text-dark">{totalInCategory} Kč</p>
          </div>
        </li>
      );
    } else {
      return null;
    }
  }
};
export default Transaction;
