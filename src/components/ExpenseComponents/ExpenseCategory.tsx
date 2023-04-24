// hooks
import Transaction from '../Transaction';
import { useMemo, useState } from 'react';
// types
import { ExpenseType, categoryColorType } from '../../utils/Types';
// helper func
import { categoryFilter, currencyFormater } from '../../utils/helperFunc';
import DoghnutChart from '../../charts/DoghnutChart';

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

  //? filter value for category
  const [outcomeCategory, incomeCategory] = categoryFilter(outcome, income);

  //? outcome summary
  const outcomeMoney = useMemo(
    () => outcome.reduce((prev, acc) => acc.amount + prev, 0),
    [outcome]
  );

  //? income summary
  const incomeMoney = useMemo(() => {
    return income.reduce((prev, acc) => acc.amount + prev, 0);
  }, [income]);

  return (
    <section className="flex flex-col items-center mt-10">
      <h2 className="text-gray-500 dark:text-descript font-medium sm:text-lg my-4 pb-2">
        Category
      </h2>

      <article className="pb-5">
        {selectFlow ? (
          outcomeCategory.length <= 0 ? (
            ''
          ) : (
            <DoghnutChart outcome={outcomeCategory} color={categoryColor} />
          )
        ) : incomeCategory.length <= 0 ? (
          ''
        ) : (
          <DoghnutChart income={incomeCategory} color={categoryColor} />
        )}
      </article>

      <article className="flex flex-col min-[350px]:flex-row sm:gap-5 shadow-md shadow-gray-300 dark:shadow-darkBG rounded-2xl bg-gray-200 p-2 min-w-max">
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
      <section className="w-full bg-light rounded-xl p-4 mt-7 min-h-[170px] shadow-lg shadow-descript dark:shadow-darkBG overflow-x-hidden max-w-[900px]">
        <ul className="flex flex-col gap-2">
          {selectFlow ? (
            outcomeCategory.length <= 0 ? (
              <li className="text-center dark:text-dark">
                No Transaction yet.
              </li>
            ) : (
              outcomeCategory.map((category) => {
                return (
                  <Transaction
                    key={category.id}
                    filterCategory={category}
                    typeExpense="Outcome"
                    categoryColor={categoryColor}
                  />
                );
              })
            )
          ) : incomeCategory.length <= 0 ? (
            <li className="text-center dark:text-dark">No Transaction yet.</li>
          ) : (
            incomeCategory.map((category) => {
              return (
                <Transaction
                  key={category.id}
                  filterCategory={category}
                  typeExpense="Income"
                  categoryColor={categoryColor}
                />
              );
            })
          )}
        </ul>
      </section>
    </section>
  );
};
export default ExpenseCategory;
