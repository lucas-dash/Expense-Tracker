import ExpenseList from '../ExpenseList';

const ExpenseCategory = () => {
  return (
    <section className="flex flex-col items-center mt-10">
      <h2 className="text-dark dark:text-light font-bold my-3">Category</h2>
      <article className="flex gap-5 w-max shadow-md shadow-gray-300 dark:shadow-darkBG rounded-2xl bg-gray-200 p-2 ">
        <div className="flex flex-col items-center bg-blend-soft-light  rounded-xl p-3 w-40 dark:shadow-darkBG cursor-pointer bg-light">
          <h3 className="font-bold text-xl text-outcome">- 28 000 Kč</h3>
          <p className="text-gray-500 text-sm">Outcome</p>
        </div>

        <div className="flex flex-col items-center bg-blend-soft-light rounded-xl p-3 w-40  dark:shadow-darkBG cursor-pointer">
          <h3 className="font-bold text-xl text-income">10 200 Kč</h3>
          <p className="text-gray-500 text-sm">Income</p>
        </div>
      </article>
      {/* category summary */}
      <article className="w-full bg-light rounded-xl p-4 mt-7 min-h-[170px] shadow-lg shadow-descript dark:shadow-darkBG">
        <ExpenseList />
      </article>
    </section>
  );
};
export default ExpenseCategory;
