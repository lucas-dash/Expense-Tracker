import { useMemo } from 'react';
import { ExpenseType } from '../../Types';
import { currencyFormater } from '../../utils/helperFunc';

type BalanceProps = {
  totalWealth: number;
  outcome: ExpenseType[];
};

const Balance = ({ totalWealth, outcome }: BalanceProps) => {
  const outcomeMoney = useMemo(
    () => outcome.reduce((prev, acc) => acc.amount + prev, 0),
    [outcome]
  );
  return (
    <section className="flex gap-5 items-center justify-center flex-wrap">
      <div className="flex flex-col items-center bg-blend-soft-light bg-white rounded-xl p-3 w-40 shadow-md shadow-gray-300 dark:shadow-darkBG">
        <h3 className="font-bold text-xl text-dark">
          {currencyFormater(totalWealth)}
        </h3>
        <p className="text-gray-500 text-sm">Total wealth</p>
      </div>
      <div className="flex flex-col items-center bg-white  bg-blend-soft-light rounded-xl p-3 w-40 shadow-md shadow-gray-300 dark:shadow-darkBG">
        <h3 className="font-bold text-xl text-outcome">
          {'-' + currencyFormater(outcomeMoney)}
        </h3>
        <p className="text-gray-500 text-sm">Current Expense</p>
      </div>
    </section>
  );
};
export default Balance;
