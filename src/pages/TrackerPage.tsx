import ExpenseCategory from '../components/ExpenseComponents/ExpenseCategory';
import TrackerBalance from '../components/ExpenseComponents/TrackerBalance';
// hooks
import useTransaction from '../Context/TransactionContex';

const TrackerPage = () => {
  const { state, getFilterMoney } = useTransaction();

  // todo today cashflow

  const { outcome, income, totalWealth } = getFilterMoney();

  const categoryColor = state.category.map((cate) => ({
    catName: cate.name,
    color: cate.color,
    icon: cate.icon,
  }));

  return (
    <main className="font-nunito  dark:text-light text-dark w-11/12 mx-auto pb-5">
      <TrackerBalance totalWealth={totalWealth} />
      <ExpenseCategory
        outcome={outcome}
        income={income}
        categoryColor={categoryColor}
      />
    </main>
  );
};
export default TrackerPage;
