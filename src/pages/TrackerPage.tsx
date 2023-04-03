import useTransaction from '../Context/TransactionContex';
import ExpenseCategory from '../components/ExpenseComponents/ExpenseCategory';
import TrackerBalance from '../components/ExpenseComponents/TrackerBalance';

const TrackerPage = () => {
  const { getFilterMoney } = useTransaction();
  const { outcome, income, totalWealth, categoryFilter } = getFilterMoney();

  return (
    <main className="font-nunito  dark:text-light text-dark w-11/12 mx-auto">
      <TrackerBalance totalWealth={totalWealth} />
      <ExpenseCategory categoryFilter={categoryFilter} />
    </main>
  );
};
export default TrackerPage;
