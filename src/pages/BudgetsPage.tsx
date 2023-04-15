import Budget from '../components/budgetsComponents/Budget';
import BudgetForm from '../components/budgetsComponents/BudgetForm';

const BudgetsPage = () => {
  return (
    <main className="font-nunito w-11/12 mx-auto">
      <BudgetForm />
      <section className="flex flex-wrap gap-5 w-11/12 mx-auto justify-center">
        <Budget />
        <Budget />
        <Budget />
      </section>
    </main>
  );
};
export default BudgetsPage;
