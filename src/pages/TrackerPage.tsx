import ExpenseCategory from '../components/ExpenseComponents/ExpenseCategory';
import TrackerBalance from '../components/ExpenseComponents/TrackerBalance';

const TrackerPage = () => {
  return (
    <main className="font-nunito  dark:text-light text-dark w-11/12 mx-auto">
      <TrackerBalance />
      <ExpenseCategory />
    </main>
  );
};
export default TrackerPage;
