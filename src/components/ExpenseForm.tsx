// other imporst
import { HiPlusSmall } from 'react-icons/hi2';
import { v4 as uuidv4 } from 'uuid';
// hooks
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import useTransaction from '../Context/TransactionContex';
// types
import { ExpenseType } from '../utils/Types';
import { formatDate } from '../utils/helperFunc';

const expenseOption: [string, string] = ['Outcome', 'Income'];

const ExpenseForm = () => {
  const { state, addTransaction } = useTransaction();
  const navigate = useNavigate();

  //! state
  const [amount, setAmout] = useState('');
  const [categoryName, setCategoryName] = useState('');
  const [date, setDate] = useState('');
  const [note, setNote] = useState('');

  //! outcome or income
  const [transactionType, setTransactionType] = useState<string>('Outcome');

  const handleOptionChange = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    setTransactionType(target.value);
  };

  // ! submit
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (amount && date && categoryName) {
      const newExpense: ExpenseType = {
        id: uuidv4(),
        type: transactionType,
        amount: Number(amount),
        category: categoryName,
        date: formatDate(date),
        note: note.trim(),
      };

      addTransaction(newExpense);

      setAmout('');
      setCategoryName('');
      setDate('');
      setNote('');
    }
  }

  //? date formater
  const today = new Date().toISOString().substr(0, 10);

  const yesterdayFormat = new Date(today);
  yesterdayFormat.setDate(yesterdayFormat.getDate() - 1);

  const yesterday = yesterdayFormat.toISOString().substr(0, 10);

  return (
    <article className="bg-transparent flex items-center justify-center">
      <form
        className="bg-gradient-to-br from-accent-200 to-accent-100 w-4/5 max-w-sm gap-5 p-6 
      rounded-xl"
        onSubmit={handleSubmit}
      >
        <label className="flex items-end justify-end h-3">
          <div
            className="transform rotate-45 translate-x-3 inline-block cursor-pointer hover:scale-125 transition-all duration-300"
            onClick={() => navigate(-1)}
          >
            <HiPlusSmall size={27} />
          </div>
        </label>

        <div className=" flex justify-evenly mb-3">
          {expenseOption.map((option, i) => {
            return (
              <label
                key={i}
                htmlFor={option}
                className={`cursor-pointer rounded-xl px-3 font-medium border-2 border-light transition-all duration-200 ease-out ${
                  transactionType === option
                    ? 'bg-light text-dark'
                    : 'text-light'
                }`}
              >
                <input
                  type="radio"
                  name={option}
                  id={option}
                  value={option}
                  checked={option === transactionType}
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
              value={amount}
              onChange={({ target }) => setAmout(target.value)}
              placeholder="0 Kč"
              aria-label="set your amount of money"
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
              value={categoryName}
              aria-label="Select expense category"
              onChange={({ target }) => setCategoryName(target.value)}
              required
              className="rounded-lg focus:outline-dark p-0.5 placeholder:text-dark"
            >
              <option value=""></option>
              {state.category.map((cat) => {
                if (transactionType === cat.type) {
                  return (
                    <option key={cat.id} value={cat.name} aria-label={cat.name}>
                      {cat.icon}
                      {cat.name}
                    </option>
                  );
                }
              })}
            </select>
          </div>

          <div className="flex flex-col">
            {/* button today, yesterday */}
            <label htmlFor="amount" className="text-sm text-light">
              Set Date:
            </label>
            <div className="flex gap-2 py-2">
              <button
                type="button"
                onClick={() => setDate(today)}
                className="text-light text-sm font-medium border-2 border-light rounded-2xl p-0.5 px-1 hover:scale-105 hover:shadow-lg transition-all duration-200 ease-in-out"
              >
                Today
              </button>
              <button
                type="button"
                onClick={() => setDate(yesterday)}
                className="text-light text-sm font-medium border-2 border-light rounded-2xl p-0.5 px-1 hover:scale-105 hover:shadow-lg transition-all duration-200 ease-in-out"
              >
                Yesterday
              </button>
            </div>

            <input
              type="date"
              name="date"
              value={date}
              aria-label="set date"
              onChange={({ target }) => setDate(target.value)}
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
              value={note}
              aria-label="optional select note"
              onChange={({ target }) => setNote(target.value)}
              placeholder="Add notes..."
              className="focus:outline-dark p-0.5 rounded-lg"
            />
          </div>

          <button
            disabled={amount && categoryName && date ? false : true}
            type="submit"
            aria-label="add transaction"
            className="border-2 border-light dark:border-darkBG rounded-md px-1 py-0.5 font-semibold hover:scale-x-105 hover:bg-dark transition-all duration-300 text-center text-light mt-1.5 disabled:bg-descript disabled:opacity-60"
          >
            add
          </button>
        </div>
      </form>
    </article>
  );
};
export default ExpenseForm;
