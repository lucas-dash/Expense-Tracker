import { CategoryType, ExpenseType } from '../utils/Types';

type initStateType = {
  transactions: ExpenseType[];
  category: CategoryType[];
};

const ACTION = {
  ADD_TRANSACTION: 'ADD_TRANSACTION',
  REMOVE_TRANSACTION: 'REMOVE_TRANSACTION',
  EDIT_TRANSACTION: 'EDIT_TRANSACTION',
  ADD_CATEGORY: 'ADD_CATEGORY',
  REMOVE_CATEGORY: 'REMOVE_CATEGORY',
};

export type ReducerAction = {
  type: string;
  payload: ExpenseType;
};

const expenseReducer = (
  state: initStateType,
  action: ReducerAction
): initStateType => {
  switch (action.type) {
    case ACTION.ADD_TRANSACTION:
      return {
        ...state,
        transactions: [...state.transactions, action.payload],
      };

    case ACTION.REMOVE_TRANSACTION:
      return {
        ...state,
        transactions: state.transactions.filter(
          (transaction) => transaction.id !== action.payload.id
        ),
      };

    default:
      throw new Error('action is not match ' + action.type);
  }
};

export default expenseReducer;
