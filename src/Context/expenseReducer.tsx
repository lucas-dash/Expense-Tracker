import { ExpenseType } from '../Types';

type initStateType = {
  transactions: ExpenseType[];
};

const ACTION = {
  ADD_TRANSACTION: 'ADD_TRANSACTION',
  REMOVE_TRANSACTION: 'REMOVE_TRANSACTION',
  EDIT_TRANSACTION: 'EDIT_TRANSACTION',
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
