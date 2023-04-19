// types
import { BudgetsType, CategoryFilterType } from '../../utils/Types';
// utils
import {
  currencyFormater,
  checkColorProgressBar,
} from '../../utils/helperFunc';
import { getTotalFromBudget } from '../../utils/helperFunc';
import { MdAdd } from 'react-icons/md';

type BudgetProps = {
  budget: BudgetsType;
  category: CategoryFilterType[];
  removeBudget: (budget: BudgetsType) => void;
};

const Budget = ({ budget, category, removeBudget }: BudgetProps) => {
  const { name, limit, categories } = budget;

  const { total, allTransaction } = getTotalFromBudget(categories, category);

  const { width, color } = checkColorProgressBar(total, limit);

  return (
    <article className="border-2 border-darkBG dark:border-progress rounded-lg w-[320px] p-4 shadow-2xl shadow-descript dark:shadow-dark min-w-[262px]">
      <div className="flex justify-between pb-2">
        <p className="text-center font-medium text-lg flex-1">{name}</p>
        <MdAdd
          className="rotate-45 cursor-pointer"
          size={23}
          aria-label="delete Budget"
          title="delete Budget"
          onClick={() => removeBudget(budget)}
        />
      </div>

      <div className="flex items-center gap-2 my-1 w-full flex-wrap">
        {categories.map((category, index) => {
          return (
            <p
              className="bg-descript/40 dark:bg-descript/50 rounded-lg px-1 text-center"
              key={index}
            >
              {category}
            </p>
          );
        })}
      </div>
      <div className="flex flex-col items-end">
        <p>
          {currencyFormater(total)} / {currencyFormater(limit)}
        </p>

        {/* progress bar */}
        <div className="w-full h-2 bg-blue-200 rounded-full mt-2">
          <div
            className={`h-full text-center text-xs text-white rounded-full ${color}`}
            style={{ width: width }}
          ></div>
        </div>
      </div>
      <div>
        <p className="text-descript text-sm pt-1">
          {allTransaction} Transaction
        </p>
      </div>
    </article>
  );
};
export default Budget;
