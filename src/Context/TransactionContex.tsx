import React, { createContext, useContext, useReducer } from 'react';
import expenseReducer from './expenseReducer';
import { ExpenseType } from '../Types';

type initStateType = {
  transactions: ExpenseType[];
};

export const initialState: initStateType = {
  transactions: [
    {
      id: '72a881ef-99ad-4df6-b2a2-7e9600f28397',
      type: 'OutcomEE',
      category: 'Food & Drinks',
      amount: 200,
      date: '2024-02-01',
      note: '',
    },
  ],
};

const useTransactionContext = (initState: initStateType) => {
  const [state, dispatch] = useReducer(expenseReducer, initState);

  //? actions
  const addTransaction = (expense: ExpenseType) => {
    dispatch({ type: 'ADD_TRANSACTION', payload: expense });
  };

  const removeTransaction = (expense: ExpenseType) => {
    dispatch({ type: 'REMOVE_TRANSACTION', payload: expense });
  };

  return { state, addTransaction, removeTransaction };
};

type UseTransactionContextType = ReturnType<typeof useTransactionContext>;

const initContextState: UseTransactionContextType = {
  state: initialState,
  addTransaction: () => {},
  removeTransaction: () => {},
};

type ProviderType = {
  children: React.ReactNode;
};

export const TransactionContext =
  createContext<UseTransactionContextType>(initContextState);

export const TransactionProvider = ({ children }: ProviderType) => {
  return (
    <TransactionContext.Provider value={useTransactionContext(initialState)}>
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
  if (context === undefined) {
    throw new Error('useTransaction must be used within transaction context');
  }

  return context;
};

export default useTransaction;
