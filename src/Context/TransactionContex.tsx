import React, { createContext, useContext, useEffect, useReducer } from 'react';
import expenseReducer from './expenseReducer';
import { CategoryType, ExpenseType } from '../Types';
import useLocalStorage from '../useLocalStorage';

type initStateType = {
  transactions: ExpenseType[];
  category: CategoryType[];
};

const useTransactionContext = (): UseTransactionContextType => {
  const [transactions, setTransactions] = useLocalStorage<ExpenseType[]>(
    'transactions',
    []
  );
  const [category, setCategory] = useLocalStorage<CategoryType[]>('category', [
    { id: 1, icon: '🍔', name: 'Food & Drinks' },
    { id: 2, icon: '☕️', name: 'Coffee' },
    { id: 3, icon: '⛽️', name: 'Gas' },
    { id: 4, icon: '🎮', name: 'Game' },
    { id: 5, icon: '🖥️', name: 'Tech' },
  ]);

  const [state, dispatch] = useReducer(expenseReducer, {
    transactions,
    category,
  });

  //? actions
  const addTransaction = (expense: ExpenseType) => {
    dispatch({ type: 'ADD_TRANSACTION', payload: expense });
  };

  const removeTransaction = (expense: ExpenseType) => {
    dispatch({ type: 'REMOVE_TRANSACTION', payload: expense });
  };

  useEffect(() => {
    setTransactions(state.transactions);
    setCategory(state.category);
  }, [state.transactions, state.category]);

  return { state, addTransaction, removeTransaction };
};

type UseTransactionContextType = {
  state: initStateType;
  addTransaction: (expense: ExpenseType) => void;
  removeTransaction: (expense: ExpenseType) => void;
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
};

const useTransaction = (): UseTransactionHook => {
  const context = useContext(TransactionContext);
  if (!context) {
    throw new Error('useTransaction must be used within transaction context');
  }

  return context;
};

export default useTransaction;
