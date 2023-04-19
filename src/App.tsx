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

//toastify library
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// browser router setup
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route index element={<Overview />} />
      <Route path="tracker" element={<TrackerPage />} />
      <Route path="budgets" element={<BudgetsPage />} />
      <Route path="addExpense" element={<ExpenseForm />} />
    </Route>
  )
);

const App = () => {
  return (
    <TransactionProvider>
      <RouterProvider router={router} />
      <ToastContainer />
    </TransactionProvider>
  );
};
export default App;
