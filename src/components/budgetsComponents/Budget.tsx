// types
import { BudgetsType, CategoryFilterType } from '../../utils/Types';
// utils
import { currencyFormater } from '../../utils/helperFunc';
import { getTotalFromBudget } from '../../utils/helperFunc';
import { MdAdd } from 'react-icons/md';

type BudgetProps = {
  budget: BudgetsType;
  category: CategoryFilterType[];
  removeBudget: (budget: BudgetsType) => void;
};

const Budget = ({ budget, category, removeBudget }: BudgetProps) => {
  const { name, limit, categories } = budget;

  // todo progress bar style and func to get position

  const { total, allTransaction } = getTotalFromBudget(categories, category);

  return (
    <article className="border-2 border-progress rounded-lg w-[320px] p-4 shadow-2xl shadow-descript dark:shadow-dark min-w-max">
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

      <div className="flex gap-2 mt-1">
        {categories.map((category, index) => {
          return (
            <p
              className="bg-descript/40 dark:bg-descript/60 rounded-lg px-1"
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

        <div className="w-full h-2 bg-blue-200 rounded-full mt-2">
          <div className="w-2/3 h-full text-center text-xs text-white bg-progress rounded-full"></div>
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
