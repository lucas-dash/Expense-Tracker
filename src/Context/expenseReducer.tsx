// Types
import { BudgetsType, CategoryType, ExpenseType } from '../utils/Types';
// toastify library
import { toast } from 'react-toastify';

export type initStateType = {
  transactions: ExpenseType[];
  category: CategoryType[];
  budgets: BudgetsType[];
};

const ACTION = {
  ADD_TRANSACTION: 'ADD_TRANSACTION',
  REMOVE_TRANSACTION: 'REMOVE_TRANSACTION',
  EDIT_TRANSACTION: 'EDIT_TRANSACTION',
  ADD_CATEGORY: 'ADD_CATEGORY',
  ADD_BUDGET: 'ADD_BUDGET',
  REMOVE_BUDGET: 'REMOVE_BUDGET',
};

export type ReducerAction = {
  type: string;
  payload: ExpenseType | BudgetsType | CategoryType;
};

const expenseReducer = (
  state: initStateType,
  action: ReducerAction
): initStateType => {
  switch (action.type) {
    case ACTION.ADD_TRANSACTION:
      if ('date' in action.payload) {
        toast.success('New transaction added!');
        return {
          ...state,
          transactions: [...state.transactions, action.payload],
        };
      }

    case ACTION.REMOVE_TRANSACTION:
      toast.success('Transaction has been deleted!');
      return {
        ...state,
        transactions: state.transactions.filter(
          (transaction) => transaction.id !== action.payload.id
        ),
      };

    case ACTION.ADD_CATEGORY:
      if ('icon' in action.payload) {
        toast.success('Category has been added!');
        return {
          ...state,
          category: [...state.category, action.payload],
        };
      }

    case ACTION.ADD_BUDGET:
      if ('limit' in action.payload) {
        toast.success('New Budget added!');
        return {
          ...state,
          budgets: [...state.budgets, action.payload],
        };
      }

    case ACTION.REMOVE_BUDGET:
      toast.success('Budget has been deleted!');
      return {
        ...state,
        budgets: state.budgets.filter(
          (budget) => budget.id !== action.payload.id
        ),
      };

    default:
      throw new Error('action is not match ' + action.type);
  }
};

export default expenseReducer;
