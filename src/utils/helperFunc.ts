import { useMemo } from 'react';
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

export const formatDate = (dateString: string): string => {
  if (!dateString) {
    return (dateString = '');
  }
  const date = new Date(dateString);
  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
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

type checkColorProgressType = {
  width: string;
  color: string;
};
export const checkColorProgressBar = (
  current: number,
  max: number
): checkColorProgressType => {
  const percentage = Math.floor((current / max) * 100);
  if (percentage >= 100) {
    return { width: '100%', color: 'bg-outcome' };
  } else if (percentage <= 25) {
    return { width: `${percentage}%`, color: 'bg-income' };
  } else if (percentage <= 50) {
    return { width: `${percentage}%`, color: 'bg-yellow-500' };
  } else if (percentage <= 85) {
    return { width: `${percentage}%`, color: 'bg-progress' };
  } else {
    return { width: `${percentage}%`, color: 'bg-outcome' };
  }
};

export const getWelcomeText = () => {
  const timeNow = new Date().getHours();

  if (timeNow <= 11 && timeNow >= 6) {
    return 'Good Morning!';
  } else if (timeNow > 11 && timeNow <= 18) {
    return 'Good Afternoon!';
  } else if (timeNow > 18 && timeNow <= 24) {
    return 'Good Evening!';
  } else if (timeNow >= 0 && timeNow <= 5) {
    return 'Good night!';
  } else {
    return 'Have a Nice Day!';
  }
};
