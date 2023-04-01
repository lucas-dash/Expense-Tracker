// router imports
import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom';

// components
import Root from './pages/Root';
import TrackerPage from './pages/TrackerPage';
import BudgetsPage from './pages/BudgetsPage';
import Overview from './pages/Overview';
import ExpenseForm from './components/ExpenseForm';
import { TransactionProvider } from './Context/TransactionContex';

// browser router setup
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route index element={<Overview />} />
      <Route path="tracker" element={<TrackerPage />}></Route>
      <Route path="budgets" element={<BudgetsPage />} />
      <Route path="addExpense" element={<ExpenseForm />} />
    </Route>
  )
);

const App = () => {
  return (
    <TransactionProvider>
      <RouterProvider router={router} />;
    </TransactionProvider>
  );
};
export default App;
