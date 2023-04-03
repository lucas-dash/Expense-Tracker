export type ExpenseType = {
  id: string;
  type: string;
  category: string;
  amount: number;
  date: string;
  note?: string;
};

export interface CategoryType {
  id: number;
  icon: string;
  name: string;
  type: string;
}

export type CategoryFilterType = {
  categoryName: string;
  allExpense: number[];
};
