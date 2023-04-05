import ExpenseCategory from '../components/ExpenseComponents/ExpenseCategory';
import TrackerBalance from '../components/ExpenseComponents/TrackerBalance';
// hooks
import useTransaction from '../Context/TransactionContex';

const TrackerPage = () => {
  const { getFilterMoney } = useTransaction();

  const { outcome, income, totalWealth } = getFilterMoney();

  return (
    <main className="font-nunito  dark:text-light text-dark w-11/12 mx-auto">
      <TrackerBalance totalWealth={totalWealth} />
      <ExpenseCategory outcome={outcome} income={income} />
    </main>
  );
};
export default TrackerPage;
