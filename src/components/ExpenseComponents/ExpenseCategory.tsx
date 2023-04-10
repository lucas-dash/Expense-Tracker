// hooks
import Transaction from '../Transaction';
import { useMemo, useState } from 'react';
// types
import { ExpenseType, categoryColorType } from '../../Types';
// helper func
import { categoryFilter, currencyFormater } from '../../utils/helperFunc';

type ExpenseCategoryProps = {
  outcome: ExpenseType[];
  income: ExpenseType[];
  categoryColor: categoryColorType[];
};

const ExpenseCategory = ({
  outcome,
  income,
  categoryColor,
}: ExpenseCategoryProps) => {
  // ? true === Outcome / false === Income
  const [selectFlow, setSelectFlow] = useState(true);

  // filter value for category
  const [outcomeCategory, incomeCategory] = categoryFilter(income, outcome);

  // outcome summary
  const outcomeMoney = useMemo(
    () => outcome.reduce((prev, acc) => acc.amount + prev, 0),
    [outcome]
  );

  // income summary
  const incomeMoney = useMemo(() => {
    return income.reduce((prev, acc) => acc.amount + prev, 0);
  }, [income]);

  return (
    <section className="flex flex-col items-center mt-10">
      <h2 className="text-dark dark:text-light font-bold my-3">Category</h2>

      <article className="flex gap-5 w-max shadow-md shadow-gray-300 dark:shadow-darkBG rounded-2xl bg-gray-200 p-2">
        <div
          className={`flex flex-col items-center rounded-xl p-3 w-40 dark:shadow-darkBG cursor-pointer ${
            selectFlow ? 'active-Money' : ''
          }`}
          onClick={() => setSelectFlow(true)}
        >
          {/* outcome money summary */}
          <h3 className="font-bold text-xl text-outcome">
            {outcomeMoney !== 0
              ? '-' + currencyFormater(outcomeMoney)
              : currencyFormater(outcomeMoney)}
          </h3>
          <p className="text-gray-500 text-sm">Outcome</p>
        </div>

        <div
          className={`flex flex-col items-center rounded-xl p-3 w-40 dark:shadow-darkBG cursor-pointer ${
            !selectFlow ? 'active-Money' : ''
          }`}
          onClick={() => setSelectFlow(false)}
        >
          {/* income money summary  */}
          <h3 className="font-bold text-xl text-income">
            {currencyFormater(incomeMoney)}
          </h3>
          <p className="text-gray-500 text-sm">Income</p>
        </div>
      </article>

      {/* category summary */}
      <article className="w-full bg-light rounded-xl p-4 mt-7 min-h-[170px] shadow-lg shadow-descript dark:shadow-darkBG">
        <ul>
          {selectFlow
            ? outcomeCategory.map((category, index) => {
                return (
                  <Transaction
                    key={index}
                    filterCategory={category}
                    typeExpense="outcome"
                    categoryColor={categoryColor}
                  />
                );
              })
            : incomeCategory.map((category, index) => {
                return (
                  <Transaction
                    key={index}
                    filterCategory={category}
                    typeExpense="income"
                    categoryColor={categoryColor}
                  />
                );
              })}
        </ul>
      </article>
    </section>
  );
};
export default ExpenseCategory;
