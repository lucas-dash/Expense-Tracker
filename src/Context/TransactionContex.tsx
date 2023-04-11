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
import { CategoryType, ExpenseType } from '../utils/Types';

type initStateType = {
  transactions: ExpenseType[];
  category: CategoryType[];
};

type UseTransactionContextType = {
  state: initStateType;
  addTransaction: (expense: ExpenseType) => void;
  removeTransaction: (expense: ExpenseType) => void;
  getFilterMoney: () => ReturnWealth;
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
      id: 1,
      icon: '🍔',
      name: 'Food & Drinks',
      type: 'Outcome',
      color: '#F24E1E',
    },
    { id: 2, icon: '☕️', name: 'Coffee', type: 'Outcome', color: '#E37400' },
    { id: 3, icon: '⛽️', name: 'Gas', type: 'Outcome', color: '#CC0000' },
    { id: 4, icon: '🎮', name: 'Game', type: 'Outcome', color: '#1ABCFE' },
    { id: 5, icon: '🖥️', name: 'Tech', type: 'Outcome', color: '#EE4854' },
    { id: 6, icon: '💰', name: 'Salary', type: 'Income', color: '#0ACF83' },
    { id: 7, icon: '💼', name: 'Bussines', type: 'Income', color: '#E44D26' },
  ]);

  const [state, dispatch] = useReducer(expenseReducer, {
    transactions,
    category,
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

  useEffect(() => {
    setTransactions(state.transactions);
    setCategory(state.category);
  }, [state.transactions, state.category]);

  return { state, addTransaction, removeTransaction, getFilterMoney };
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
};

const useTransaction = (): UseTransactionHook => {
  const context = useContext(TransactionContext);
  if (!context) {
    throw new Error('useTransaction must be used within transaction context');
  }

  return context;
};

export default useTransaction;
