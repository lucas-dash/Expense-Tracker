// Icons
import { TiDelete } from 'react-icons/ti';
// Types
import {
  ExpenseType,
  CategoryFilterType,
  categoryColorType,
} from '../utils/Types';
// uttils
import { currencyFormater } from '../utils/helperFunc';
// hooks
import { useMemo } from 'react';

type TransactionPropType = {
  categoryColor: categoryColorType[];
  expense?: ExpenseType;
  remove?: (expense: ExpenseType) => void;
  filterCategory?: CategoryFilterType;
  typeExpense?: string;
};

const Transaction = ({
  expense,
  remove,
  filterCategory,
  typeExpense,
  categoryColor,
}: TransactionPropType) => {
  {
    if (expense && remove) {
      const { amount, category, date, type, note } = expense;

      return (
        <li className="flex justify-between items-center gap-4 font-nunito odd:bg-descript/30 rounded-lg px-2">
          {categoryColor.map((cat, index) => {
            if (cat.catName === category) {
              return (
                <div className="flex gap-3 items-center" key={index}>
                  <span
                    className="w-7 h-7 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: cat.color }}
                  >
                    {cat.icon}
                  </span>
                  <div className="flex items-start flex-col justify-center">
                    <h4 className="md:text-lg dark:text-dark text-sm min-[330px]:text-base">
                      {/* <Link to="/EditTransaction/20"> {category}</Link> */}
                      {category}
                    </h4>
                    <p className="text-sm text-gray-500">{date}</p>
                    {note && <p className="text-gray-500">{note}</p>}
                  </div>
                </div>
              );
            }
          })}

          <div className="flex gap-1">
            <p
              className={`md:text-lg font-medium ${
                type === 'Outcome' ? 'text-outcome' : 'text-income'
              }`}
            >
              {type === 'Outcome'
                ? `-${currencyFormater(amount)}`
                : currencyFormater(amount)}
            </p>
            <button
              className="cursor-pointer text-darkBG"
              onClick={() => remove(expense)}
            >
              <TiDelete size={20} />
            </button>
          </div>
        </li>
      );
      //! sort transaction
    } else if (filterCategory && typeExpense) {
      const { categoryName, allExpense } = filterCategory;

      const totalInCategory = useMemo(
        () => allExpense.reduce((prev, acc) => acc + prev, 0),
        [allExpense]
      );

      return (
        <li className="flex justify-between items-center gap-4 font-nunito odd:bg-descript/30 rounded-xl px-2">
          {categoryColor.map((cat, index) => {
            if (filterCategory.categoryName === cat.catName) {
              return (
                <div className="flex gap-3 items-center" key={index}>
                  <span
                    className="w-7 h-7 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: cat.color }}
                  >
                    {cat.icon}
                  </span>
                  <div className="flex items-start flex-col justify-center">
                    <h4 className="md:text-lg dark:text-dark">
                      {categoryName}
                    </h4>
                    <p className="text-sm text-gray-500">
                      {allExpense.length} transaction
                    </p>
                  </div>
                </div>
              );
            }
          })}

          <div className="flex gap-1">
            <p
              className={`md:text-lg font-medium ${
                typeExpense === 'Outcome' ? 'text-outcome' : 'text-income'
              }`}
            >
              {typeExpense === 'Outcome'
                ? '-' + currencyFormater(totalInCategory)
                : currencyFormater(totalInCategory)}
            </p>
          </div>
        </li>
      );
    } else {
      return null;
    }
  }
};
export default Transaction;
