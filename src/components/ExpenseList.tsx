import { TiDelete } from 'react-icons/ti';

const ExpenseList = () => {
  return (
    <div className="flex justify-between items-center gap-4 font-nunito">
      <div className="flex gap-3 items-center">
        <span className="w-7 h-7 rounded-full bg-accent-200"></span>
        <div className="flex items-center flex-col">
          {/* name */}
          <h4 className="md:text-lg dark:text-dark">Food & drinks</h4>
          {/* count of transaction */}
          <p className="text-sm text-descript">2 transaction</p>
        </div>
      </div>

      {/* if + green if - red */}
      <div className="flex gap-1">
        <p className="md:text-lg dark:text-dark">-3902 Kč</p>
        <button className="cursor-pointer text-darkBG">
          <TiDelete size={20} />
        </button>
      </div>
    </div>
  );
};
export default ExpenseList;
