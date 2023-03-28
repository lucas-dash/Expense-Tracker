// other imporst
import { HiPlusSmall } from 'react-icons/hi2';
import { v4 as uuidv4 } from 'uuid';
// hooks
import { useState, useRef } from 'react';
import useLocalStorage from '../useLocalStorage';

interface FormProps {
  hideForm: (value: (prev: boolean) => boolean) => void;
}

interface CategoryType {
  id: number;
  icon: string;
  name: string;
}

type ExpenseType = {
  id: string;
  type: string;
  category: string;
  amount: string;
  date: string;
  note?: string;
};
const expenseOption: [string, string] = ['Outcome', 'Income'];

const ExpenseForm = ({ hideForm }: FormProps) => {
  const [outcome, setOutcome] = useLocalStorage<ExpenseType[]>('outome', []);
  const [income, setIncome] = useLocalStorage<ExpenseType[]>('income', []);
  const [category, setCategory] = useLocalStorage<CategoryType[]>('category', [
    { id: 1, icon: '🍔', name: 'Food & Drinks' },
    { id: 2, icon: '☕️', name: 'Coffee' },
    { id: 3, icon: '⛽️', name: 'Gas' },
    { id: 4, icon: '🎮', name: 'Game' },
    { id: 5, icon: '🖥️', name: 'Tech' },
  ]);

  //! outcome or income
  const [optionExpense, setOptionExpense] = useState<string>('Outcome');
  //! refs
  const categoryRef = useRef<HTMLSelectElement>(null);
  const amountRef = useRef<HTMLInputElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);
  const noteRef = useRef<HTMLInputElement>(null);

  const handleOptionChange = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    setOptionExpense(target.value);
  };

  // ! submit
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (
      amountRef.current?.value &&
      categoryRef.current?.value &&
      dateRef.current?.value
    ) {
      const newExpense: ExpenseType = {
        id: uuidv4(),
        type: optionExpense,
        category: categoryRef.current?.value,
        amount: amountRef.current?.value,
        date: dateRef.current?.value,
        note: noteRef.current?.value,
      };

      // income or outcome
      if (optionExpense === 'Outcome') {
        setOutcome((prevOutcome): ExpenseType[] => {
          return [...prevOutcome, newExpense];
        });
      } else if (optionExpense === 'Income') {
        setIncome((prevIncome): ExpenseType[] => [...prevIncome, newExpense]);
      }

      categoryRef.current.value = '';
      amountRef.current.value = '';
      dateRef.current.value = '';
      if (noteRef.current?.value) {
        noteRef.current.value = '';
      }
    }
  }

  return (
    <article className="fixed inset-0 bottom-56 bg-transparent flex items-center justify-center">
      <form
        className="bg-gradient-to-br from-accent-200 to-accent-100 w-72 gap-5 p-5 
      rounded-xl"
        onSubmit={handleSubmit}
      >
        <label className="flex items-end justify-end h-3">
          <div
            className="transform rotate-45 translate-x-3 inline-block cursor-pointer hover:scale-125 transition-all duration-300"
            onClick={() => hideForm((prev) => !prev)}
          >
            <HiPlusSmall size={27} />
          </div>
        </label>

        <div className=" flex justify-around mb-3">
          {expenseOption.map((option, i) => {
            return (
              <label
                key={i}
                htmlFor={option}
                className={`cursor-pointer rounded-xl px-3 text-light font-medium border-2 border-light transition-all duration-200 ease-out ${
                  optionExpense === option
                    ? 'bg-light text-dark dark:text-dark'
                    : ''
                }`}
              >
                <input
                  type="radio"
                  name={option}
                  id={option}
                  value={option}
                  checked={option === optionExpense}
                  onChange={handleOptionChange}
                  className="hidden"
                />
                {option}
              </label>
            );
          })}
        </div>

        <div className="flex flex-col gap-1 text-dark">
          {/* amount input */}
          <div className="flex flex-col">
            <label htmlFor="amount" className="text-sm text-light">
              Set Amount:
            </label>
            <input
              type="number"
              name="amount"
              id="amount"
              min={0}
              ref={amountRef}
              placeholder="0$"
              // onChange={handleInputChange}
              required
              className="rounded-lg focus:outline-dark p-0.5 placeholder:text-dark"
            />
          </div>

          {/* option */}
          <div className="flex flex-col">
            <label htmlFor="category" className="text-sm text-light">
              Add Category:
            </label>
            <select
              name="category"
              id="category"
              ref={categoryRef}
              // onChange={handleSelectChange}
              required
            >
              <option value=""></option>
              {category.map((cat) => {
                return (
                  <option key={cat.id} value={cat.name}>
                    {cat.icon}
                    {cat.name}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="flex flex-col">
            <label htmlFor="amount" className="text-sm text-light">
              Set Date:
            </label>
            <input
              type="date"
              name="date"
              ref={dateRef}
              // onChange={handleInputChange}
              // defaultValue={}
              required
              className="p-0.5 rounded-lg focus:outline-dark"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="amount" className="text-sm text-light">
              Add Note:
            </label>
            <input
              type="text"
              name="note"
              ref={noteRef}
              // onChange={handleInputChange}
              placeholder="Add notes..."
              className="focus:outline-dark p-0.5 rounded-lg"
            />
          </div>

          <button
            type="submit"
            className="border-2 border-light dark:border-darkBG rounded-md px-1 py-0.5 font-semibold hover:scale-x-105 hover:bg-dark transition-all duration-300 text-center text-light mt-1.5"
          >
            add
          </button>
        </div>
      </form>
    </article>
  );
};
export default ExpenseForm;
