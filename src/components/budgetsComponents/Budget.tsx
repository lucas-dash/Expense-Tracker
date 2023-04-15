import useTransaction from '../../Context/TransactionContex';

const Budget = () => {
  const { state, getFilterMoney } = useTransaction();
  const { outcome } = getFilterMoney();
  // console.log(outcome);

  return (
    <article className="border-2 border-progress rounded-lg w-[320px] p-4 shadow-2xl shadow-descript dark:shadow-dark min-w-max">
      <p className="text-center pb-2">My first Budget</p>

      <div className="flex gap-2 mt-1">
        <p className="bg-descript/40 dark:bg-descript/60 rounded-lg px-1">
          Gas
        </p>
        <p className="bg-descript/40 dark:bg-descript/60 rounded-lg px-1">
          Game
        </p>
      </div>

      <div className="flex flex-col items-end">
        <p>0/200 Kč</p>

        <div className="w-full h-2 bg-blue-200 rounded-full mt-2">
          <div className="w-2/3 h-full text-center text-xs text-white bg-progress rounded-full"></div>
        </div>
      </div>
      <div>
        <p className="text-descript text-sm pt-1">2 trasaction</p>
      </div>
    </article>
  );
};
export default Budget;
