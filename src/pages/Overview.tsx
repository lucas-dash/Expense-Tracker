// components
import AllExpense from '../components/OverviewComponents/AllExpense';
import Balance from '../components/OverviewComponents/Balance';
// hooks
import useTransaction from '../Context/TransactionContex';

const Overview = () => {
  const { state, removeTransaction, getFilterMoney } = useTransaction();

  const allExpense = state.transactions;

  const { totalWealth, outcome } = getFilterMoney();
  return (
    <main className="font-nunito w-11/12 mx-auto ">
      <h1 className="font-medium text-xl py-5">Good Morning!</h1>
      <section>
        <Balance totalWealth={totalWealth} outcome={outcome} />
        <AllExpense
          allExpense={allExpense}
          removeTransaction={removeTransaction}
        />
      </section>
    </main>
  );
};
export default Overview;
