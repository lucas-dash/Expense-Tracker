// hooks
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from 'react';
// components
import expenseReducer from './expenseReducer';
import useLocalStorage from '../useLocalStorage';
// types
import { CategoryType, ExpenseType, CategoryFilterType } from '../Types';

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
  categoryFilter: [CategoryFilterType[], CategoryFilterType[]];
};

const useTransactionContext = (): UseTransactionContextType => {
  const [transactions, setTransactions] = useLocalStorage<ExpenseType[]>(
    'transactions',
    []
  );
  const [category, setCategory] = useLocalStorage<CategoryType[]>('category', [
    { id: 1, icon: '🍔', name: 'Food & Drinks', type: 'Outcome' },
    { id: 2, icon: '☕️', name: 'Coffee', type: 'Outcome' },
    { id: 3, icon: '⛽️', name: 'Gas', type: 'Outcome' },
    { id: 4, icon: '🎮', name: 'Game', type: 'Outcome' },
    { id: 5, icon: '🖥️', name: 'Tech', type: 'Outcome' },
    { id: 6, icon: '💰', name: 'Salary', type: 'Income' },
    { id: 7, icon: '💼', name: 'Bussines', type: 'Income' },
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

  // todo useMemo or callback, optimalization
  // todo refactor

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

    const categoryFilter = useMemo(() => {
      const outcomeCategories: { [categoryName: string]: number[] } = {};
      const incomeCategories: { [categoryName: string]: number[] } = {};

      outcome.forEach((transaction) => {
        const { category, amount } = transaction;
        if (outcomeCategories[category]) {
          outcomeCategories[category].push(amount);
        } else {
          outcomeCategories[category] = [amount];
        }
      });

      income.forEach((transaction) => {
        const { category, amount } = transaction;
        if (incomeCategories[category]) {
          incomeCategories[category].push(amount);
        } else {
          incomeCategories[category] = [amount];
        }
      });

      const outcomeCategory: CategoryFilterType[] = Object.entries(
        outcomeCategories
      ).map(([categoryName, allExpense]) => ({
        categoryName,
        allExpense,
      }));

      const incomeCategory: CategoryFilterType[] = Object.entries(
        incomeCategories
      ).map(([categoryName, allExpense]) => ({
        categoryName,
        allExpense,
      }));

      return [outcomeCategory, incomeCategory] as [
        CategoryFilterType[],
        CategoryFilterType[]
      ];
    }, [income, outcome]);

    return { outcome, income, totalWealth, categoryFilter };
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
