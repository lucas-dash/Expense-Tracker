import { BudgetsType, CategoryType, ExpenseType } from '../utils/Types';

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
  REMOVE_CATEGORY: 'REMOVE_CATEGORY',
  ADD_BUDGET: 'ADD_BUDGET',
  REMOVE_BUDGET: 'REMOVE_BUDGET',
};

export type ReducerAction = {
  type: string;
  payload: ExpenseType | BudgetsType;
};

const expenseReducer = (
  state: initStateType,
  action: ReducerAction
): initStateType => {
  switch (action.type) {
    case ACTION.ADD_TRANSACTION:
      if ('date' in action.payload) {
        return {
          ...state,
          transactions: [...state.transactions, action.payload],
        };
      }

    case ACTION.REMOVE_TRANSACTION:
      return {
        ...state,
        transactions: state.transactions.filter(
          (transaction) => transaction.id !== action.payload.id
        ),
      };
    case ACTION.ADD_BUDGET:
      if ('limit' in action.payload) {
        return {
          ...state,
          budgets: [...state.budgets, action.payload],
        };
      }

    case ACTION.REMOVE_BUDGET:
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
