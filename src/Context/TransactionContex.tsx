// hooks
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from 'react';
// components
import expenseReducer from './expenseReducer';
import useLocalStorage from '../utils/useLocalStorage';
// types
import { BudgetsType, CategoryType, ExpenseType } from '../utils/Types';
import { initStateType } from './expenseReducer';

type UseTransactionContextType = {
  state: initStateType;
  addTransaction: (expense: ExpenseType) => void;
  removeTransaction: (expense: ExpenseType) => void;
  getFilterMoney: () => ReturnWealth;
  addCategory: (category: CategoryType) => void;
  addBudget: (budget: BudgetsType) => void;
  removeBudget: (budget: BudgetsType) => void;
};

type ReturnWealth = {
  outcome: ExpenseType[];
  income: ExpenseType[];
  totalWealth: number;
};

const useTransactionContext = (): UseTransactionContextType => {
  const [transactions, setTransactions] = useLocalStorage<ExpenseType[]>(
    'transactions',
    []
  );
  const [category, setCategory] = useLocalStorage<CategoryType[]>('category', [
    {
      id: '1',
      icon: '🍔',
      name: 'Food & Drinks',
      type: 'Outcome',
      color: '#F24E1E',
    },
    { id: '2', icon: '☕️', name: 'Coffee', type: 'Outcome', color: '#FE5D26' },
    { id: '3', icon: '⛽️', name: 'Gas', type: 'Outcome', color: '#00BFB2' },
    { id: '4', icon: '🎮', name: 'Game', type: 'Outcome', color: '#1ABCFE' },
    { id: '5', icon: '🖥️', name: 'Tech', type: 'Outcome', color: '#EE4854' },
    { id: '6', icon: '💰', name: 'Salary', type: 'Income', color: '#0ACF83' },
    { id: '7', icon: '💼', name: 'Bussines', type: 'Income', color: '#E44D26' },
  ]);

  const [budgets, setBudgets] = useLocalStorage<BudgetsType[]>('budgets', []);

  const [state, dispatch] = useReducer(expenseReducer, {
    transactions,
    category,
    budgets,
  });

  //? actions
  const addTransaction = useCallback(
    (expense: ExpenseType) => {
      dispatch({ type: 'ADD_TRANSACTION', payload: expense });
    },
    [dispatch]
  );

  const removeTransaction = useCallback(
    (expense: ExpenseType) => {
      dispatch({ type: 'REMOVE_TRANSACTION', payload: expense });
    },
    [dispatch]
  );

  const getFilterMoney = () => {
    const outcome = useMemo(() => {
      return transactions.filter((expense) => expense.type === 'Outcome');
    }, [transactions]);

    const income = useMemo(() => {
      return transactions.filter((expense) => expense.type === 'Income');
    }, [transactions]);

    const totalWealth = useMemo(() => {
      let outcom = outcome.reduce((prev, acc) => {
        return acc.amount + prev;
      }, 0);

      let incom = income.reduce((prev, acc) => {
        return acc.amount + prev;
      }, 0);

      return incom - outcom;
    }, [income, outcome]);

    return { outcome, income, totalWealth };
  };

  const addCategory = useCallback(
    (category: CategoryType) => {
      dispatch({ type: 'ADD_CATEGORY', payload: category });
    },
    [dispatch]
  );

  const addBudget = (budget: BudgetsType) => {
    dispatch({ type: 'ADD_BUDGET', payload: budget });
  };

  const removeBudget = (budget: BudgetsType) => {
    dispatch({ type: 'REMOVE_BUDGET', payload: budget });
  };

  useEffect(() => {
    setTransactions(state.transactions);
    setCategory(state.category);
    setBudgets(state.budgets);
  }, [state.transactions, state.category, state.budgets]);

  return {
    state,
    addTransaction,
    removeTransaction,
    getFilterMoney,
    addCategory,
    addBudget,
    removeBudget,
  };
};

type ProviderType = {
  children: React.ReactNode;
};

const TransactionContext = createContext<UseTransactionContextType | undefined>(
  undefined
);

export const TransactionProvider = ({ children }: ProviderType) => {
  return (
    <TransactionContext.Provider value={useTransactionContext()}>
      {children}
    </TransactionContext.Provider>
  );
};

type UseTransactionHook = {
  state: initStateType;
  addTransaction: (expense: ExpenseType) => void;
  removeTransaction: (expense: ExpenseType) => void;
  getFilterMoney: () => ReturnWealth;
  addCategory: (category: CategoryType) => void;
  addBudget: (budget: BudgetsType) => void;
  removeBudget: (budget: BudgetsType) => void;
};

const useTransaction = (): UseTransactionHook => {
  const context = useContext(TransactionContext);
  if (!context) {
    throw new Error('useTransaction must be used within transaction context');
  }

  return context;
};

export default useTransaction;
