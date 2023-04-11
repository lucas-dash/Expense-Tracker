import { CategoryFilterType, ExpenseType } from './Types';
import { v4 as uuidv4 } from 'uuid';

export const currencyFormater = (num: number = 0) => {
  const formatter = new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: 'CZK',
    minimumFractionDigits: 0,
  });

  return formatter.format(num);
};

export const categoryFilter = (
  income: ExpenseType[],
  outcome: ExpenseType[]
) => {
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
    id: uuidv4(),
    categoryName,
    allExpense,
  }));

  const incomeCategory: CategoryFilterType[] = Object.entries(
    incomeCategories
  ).map(([categoryName, allExpense]) => ({
    id: uuidv4(),
    categoryName,
    allExpense,
  }));

  return [outcomeCategory, incomeCategory] as [
    CategoryFilterType[],
    CategoryFilterType[]
  ];
};
