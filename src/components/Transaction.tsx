import { TiDelete } from 'react-icons/ti';
import { ExpenseType, CategoryFilterType, categoryColorType } from '../Types';
import { currencyFormater } from '../utils/helperFunc';
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
        <li className="flex justify-between items-center gap-4 font-nunito">
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
                    <h4 className="md:text-lg dark:text-dark">{category}</h4>
                    <p className="text-sm text-descript">{date}</p>
                  </div>
                </div>
              );
            }
          })}

          <div className="flex gap-1">
            <p className="md:text-lg dark:text-dark font-medium">
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
    } else if (filterCategory && typeExpense) {
      const { categoryName, allExpense } = filterCategory;

      const totalInCategory = useMemo(
        () => allExpense.reduce((prev, acc) => acc + prev, 0),
        [allExpense]
      );

      return (
        <li className="flex justify-between items-center gap-4 font-nunito">
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
                    <p className="text-sm text-descript">
                      {allExpense.length} transaction
                    </p>
                  </div>
                </div>
              );
            }
          })}

          <div className="flex gap-1">
            <p className="md:text-lg dark:text-dark font-medium">
              {typeExpense === 'outcome'
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
