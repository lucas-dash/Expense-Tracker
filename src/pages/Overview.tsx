// components
import AllExpense from '../components/OverviewComponents/AllExpense';
import Balance from '../components/OverviewComponents/Balance';

const Overview = () => {
  return (
    <main className="font-nunito w-11/12 mx-auto ">
      <h1 className="font-medium text-xl py-5">Good Morning!</h1>
      <section>
        <Balance />
        <AllExpense />
      </section>
    </main>
  );
};
export default Overview;
