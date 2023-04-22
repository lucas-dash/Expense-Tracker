export type ExpenseType = {
  id: string;
  type: string;
  category: string;
  amount: number;
  date: string;
  note: string;
};

export type CategoryType = {
  id: string;
  icon: string;
  name: string;
  type: string;
  color: string;
};

export type CategoryFilterType = {
  id: string;
  categoryName: string;
  allExpense: number[];
};

export type categoryColorType = {
  catName: string;
  color: string;
  icon: string;
};

export type BudgetsType = {
  id: string;
  name: string;
  limit: number;
  categories: string[];
};
