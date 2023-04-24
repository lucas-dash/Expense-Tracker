import { HiPlusSmall } from 'react-icons/hi2';
import { Link } from 'react-router-dom';
import { currencyFormater } from '../../utils/helperFunc';

type TrackerBalanceProps = {
  totalWealth: number;
};

const TrackerBalance = ({ totalWealth }: TrackerBalanceProps) => {
  return (
    <section className="flex flex-col items-center gap-5">
      <h1 className="text-base text-gray-500 dark:text-descript sm:text-lg">
        Your balance
      </h1>

      <article>
        <div className="flex flex-col items-center bg-blend-soft-light bg-white rounded-xl p-3 w-40 shadow-md shadow-gray-300 dark:shadow-darkBG">
          {/* all money */}
          <h3 className="font-bold text-xl text-dark">
            {currencyFormater(totalWealth)}
          </h3>
          <p className="text-gray-500 text-sm">Total wealth</p>
        </div>
      </article>

      <div className="flex gap-5">
        <Link
          to={'/addExpense'}
          className="action-button"
          aria-label="add expense"
          type="button"
        >
          add expense
          <HiPlusSmall size={20} className="inline-block font-bold" />
        </Link>

        <Link
          to={'/addCategory'}
          className="action-button"
          aria-label="add category"
          type="button"
        >
          add Category
          <HiPlusSmall size={20} className="inline-block font-bold" />
        </Link>
      </div>
    </section>
  );
};
export default TrackerBalance;
