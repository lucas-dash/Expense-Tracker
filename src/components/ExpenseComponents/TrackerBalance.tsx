import { HiPlusSmall } from 'react-icons/hi2';

interface TrackerBalanceProps {
  addExpense: (value: (prev: boolean) => boolean) => void;
}

const TrackerBalance = ({ addExpense }: TrackerBalanceProps) => {
  return (
    <section className="flex flex-col items-center gap-5">
      <h1 className="text-base text-gray-500 dark:text-descript md:text-lg">
        This month balance
      </h1>

      <article className="flex gap-5">
        <div className="flex flex-col items-center bg-blend-soft-light bg-white rounded-xl p-3 w-40 shadow-md shadow-gray-300 dark:shadow-darkBG">
          <h3 className="font-bold text-xl text-dark">88 000 Kč</h3>
          <p className="text-gray-500 text-sm">Total wealth</p>
        </div>
        <div className="flex flex-col items-center bg-white  bg-blend-soft-light rounded-xl p-3 w-40 shadow-md shadow-gray-300 dark:shadow-darkBG">
          <h3 className="font-bold text-xl text-dark">10 200 Kč</h3>
          <p className="text-gray-500 text-sm">Cash flow</p>
        </div>
      </article>

      <div className="flex gap-5">
        <button
          className="action-button"
          aria-label="add expense"
          onClick={() => addExpense((prev) => !prev)}
        >
          add expense
          <HiPlusSmall size={20} className="inline-block font-bold" />
        </button>

        <button
          className="action-button"
          aria-label="add category"
          // onClick={() => addCategory((prev) => !prev)}
        >
          add Category
          <HiPlusSmall size={20} className="inline-block font-bold" />
        </button>
      </div>
    </section>
  );
};
export default TrackerBalance;
