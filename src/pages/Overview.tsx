// components
import BarChart from '../charts/BarChart';
import AllExpense from '../components/OverviewComponents/AllExpense';
import Balance from '../components/OverviewComponents/Balance';
// hooks
import useTransaction from '../Context/TransactionContex';
// utils
import { getWelcomeText, getTodayCashFlow } from '../utils/helperFunc';

const Overview = () => {
  const { state, removeTransaction, getFilterMoney } = useTransaction();

  const allExpense = state.transactions;

  const categoryColor = state.category.map((cate) => ({
    catName: cate.name,
    color: cate.color,
    icon: cate.icon,
  }));

  const { outcome, income } = getFilterMoney();

  const todayCashFlow = getTodayCashFlow(income, outcome);

  const welcomeText = getWelcomeText();

  return (
    <main className="font-nunito w-11/12 mx-auto pb-6">
      <h1 className="font-medium text-xl text-center pb-7 text-gray-500 dark:text-descript">
        {welcomeText}
      </h1>
      <section>
        <Balance cashFlow={todayCashFlow} outcome={outcome} />
        <BarChart income={income} outcome={outcome} />
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
