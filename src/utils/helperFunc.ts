import { useCallback, useMemo } from 'react';
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

/**
 * @param first outcome category!
 * @param second income category!
 * @returns array of filtered expenses
 */

export const categoryFilter = (
  outcome: ExpenseType[],
  income: ExpenseType[]
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

/**
 *
 * @param budgetCategory category includes from budget form
 * @param outcomeCategory all outcome category
 * @returns total - sum of transaction, allTransaction - number of all transaction
 */

export const getTotalFromBudget = (
  budgetCategory: string[],
  outcomeCategory: CategoryFilterType[]
) => {
  const budgetTransaction = useMemo(() => {
    return outcomeCategory.filter((cat) => {
      return budgetCategory.some((category) =>
        cat.categoryName.includes(category)
      );
    });
  }, [outcomeCategory, budgetCategory]);

  const total = useMemo(() => {
    return budgetTransaction.reduce((acc, curr) => {
      return acc + curr.allExpense.reduce((a, b) => a + b, 0);
    }, 0);
  }, [budgetTransaction]);

  const allTransaction = useMemo(() => {
    return budgetTransaction.flatMap((item) => item.allExpense).length;
  }, [budgetTransaction]);

  return { total, allTransaction };
};
