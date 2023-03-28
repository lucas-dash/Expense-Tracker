const Balance = () => {
  return (
    <article className="flex gap-5 items-center justify-center flex-wrap">
      <div className="flex flex-col items-center bg-blend-soft-light bg-white rounded-xl p-3 w-40 shadow-md shadow-gray-300 dark:shadow-darkBG">
        <h3 className="font-bold text-xl text-dark">88 000 Kč</h3>
        <p className="text-gray-500 text-sm">Total wealth</p>
      </div>
      <div className="flex flex-col items-center bg-white  bg-blend-soft-light rounded-xl p-3 w-40 shadow-md shadow-gray-300 dark:shadow-darkBG">
        <h3 className="font-bold text-xl text-outcome"> - 8 200 Kč</h3>
        <p className="text-gray-500 text-sm">This month Expense</p>
      </div>
    </article>
  );
};
export default Balance;
