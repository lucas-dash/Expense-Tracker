// components
import AllExpense from '../components/OverviewComponents/AllExpense';
import Balance from '../components/OverviewComponents/Balance';
// hooks
import useTransaction from '../Context/TransactionContex';
// utils
import { getWelcomeText } from '../utils/helperFunc';

const Overview = () => {
  const { state, removeTransaction, getFilterMoney } = useTransaction();

  const allExpense = state.transactions;

  const categoryColor = state.category.map((cate) => ({
    catName: cate.name,
    color: cate.color,
    icon: cate.icon,
  }));

  const { totalWealth, outcome } = getFilterMoney();
  const welcomeText = getWelcomeText();

  return (
    <main className="font-nunito w-11/12 mx-auto ">
      <h1 className="font-medium text-xl py-5 pl-4">{welcomeText}</h1>
      <section>
        <Balance totalWealth={totalWealth} outcome={outcome} />
        <AllExpense
          allExpense={allExpense}
          removeTransaction={removeTransaction}
          categoryColor={categoryColor}
        />
      </section>
    </main>
  );
};
export default Overview;
