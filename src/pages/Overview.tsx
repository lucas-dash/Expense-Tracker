// hooks
import { useState } from 'react';
// components
import ExpenseForm from '../components/ExpenseForm';
import AllExpense from '../components/OverviewComponents/AllExpense';
import Balance from '../components/OverviewComponents/Balance';

interface CategoryType {
  id: number;
  icon: string;
  name: string;
}

const Overview = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <main className="font-nunito w-11/12 mx-auto ">
      <h1 className="font-medium text-xl py-5">Good Morning!</h1>
      <section className="">
        <Balance />
        <AllExpense addExpense={setShowForm} />

        {showForm ? <ExpenseForm hideForm={setShowForm} /> : ''}
      </section>
    </main>
  );
};
export default Overview;
