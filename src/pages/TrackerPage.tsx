import { useState } from 'react';

import ExpenseForm from '../components/ExpenseForm';
import ExpenseCategory from '../components/ExpenseComponents/ExpenseCategory';
import TrackerBalance from '../components/ExpenseComponents/TrackerBalance';

const TrackerPage = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <main className="font-nunito  dark:text-light text-dark w-11/12 mx-auto">
      <TrackerBalance addExpense={setShowForm} />

      <ExpenseCategory />

      {showForm ? <ExpenseForm hideForm={setShowForm} /> : ''}
    </main>
  );
};
export default TrackerPage;
