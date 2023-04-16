// context
import useTransaction from '../Context/TransactionContex';
// components
import Budget from '../components/budgetsComponents/Budget';
import BudgetForm from '../components/budgetsComponents/BudgetForm';
// utils
import { categoryFilter } from '../utils/helperFunc';

const BudgetsPage = () => {
  const { state, getFilterMoney, removeBudget } = useTransaction();
  const { outcome, income } = getFilterMoney();

  const [outcomeCategory] = categoryFilter(outcome, income);

  return (
    <main className="font-nunito w-11/12 mx-auto pb-5">
      <BudgetForm />

      <section className="flex flex-wrap gap-5 w-11/12 mx-auto justify-center">
        {state.budgets.map((budget) => {
          return (
            <Budget
              key={budget.id}
              budget={budget}
              category={outcomeCategory}
              removeBudget={removeBudget}
            />
          );
        })}
      </section>
    </main>
  );
};
export default BudgetsPage;
