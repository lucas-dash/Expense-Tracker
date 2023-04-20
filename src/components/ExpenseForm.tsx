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
    <section className="flex items-center justify-center border-darkBG border-2 dark:border-light rounded-xl bg-light/70 dark:bg-light/30 dark:text-dark p-5 w-2/4 min-w-[280px] max-w-sm mx-auto shadow-2xl shadow-descript dark:shadow-descript/20 overflow-hidden relative top-6">
      <form className=" w-full " onSubmit={handleSubmit}>
        <div className="absolute right-2 top-2" onClick={() => navigate(-1)}>
          <HiPlusSmall
            size={30}
            className="rotate-45 cursor-pointer hover:scale-125 transition-all duration-300"
          />
        </div>

        <div className=" flex justify-evenly gap-3 mb-3 w-4/5 mx-auto">
          {expenseOption.map((option, i) => {
            return (
              <label
                key={i}
                htmlFor={option}
                className={`cursor-pointer rounded-xl px-3 font-medium border-2 border-dark dark:border-light transition-all duration-300 ease-out shadow-xl shadow-descript dark:shadow-none ${
                  transactionType === option
                    ? 'bg-dark dark:bg-light text-light dark:text-dark '
                    : 'text-descript'
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
            <label htmlFor="amount">Set Amount:</label>
            <input
              type="number"
              name="amount"
              id="amount"
              step={0.5}
              min={0}
              value={amount}
              onChange={({ target }) => setAmout(target.value)}
              placeholder="0 Kč"
              aria-label="set your amount of money"
              required
              className="rounded-lg focus:outline-dark p-0.5 sm:w-auto border border-descript hover:bg-gray-50 placeholder:text-descript px-1"
            />
          </div>

          {/* option */}
          <div className="flex flex-col">
            <label htmlFor="category">Add Category:</label>
            <select
              name="category"
              id="category"
              value={categoryName}
              aria-label="Select expense category"
              onChange={({ target }) => setCategoryName(target.value)}
              required
              className="rounded-lg focus:outline-dark p-0.5 sm:w-auto border border-descript hover:bg-gray-50 placeholder:text-descript px-1"
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
            <label htmlFor="amount">Set Date:</label>
            <div className="flex gap-2 pb-2">
              <button
                type="button"
                onClick={() => setDate(today)}
                className="text-sm dark:text-light font-medium border-2 border-dark dark:border-light rounded-2xl p-0.5 px-1 hover:scale-105 hover:shadow-lg transition-all duration-200 ease-in-out"
              >
                Today
              </button>
              <button
                type="button"
                onClick={() => setDate(yesterday)}
                className="text-sm dark:text-light font-medium border-2 border-dark dark:border-light rounded-2xl p-0.5 px-1 hover:scale-105 hover:shadow-lg transition-all duration-200 ease-in-out"
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
              className="rounded-lg focus:outline-dark p-0.5 sm:w-auto border border-descript hover:bg-gray-50 placeholder:text-descript px-1"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="amount">Add Note:</label>
            <input
              type="text"
              name="note"
              value={note}
              aria-label="optional select note"
              onChange={({ target }) => setNote(target.value)}
              placeholder="Add notes..."
              className="rounded-lg focus:outline-dark p-0.5 sm:w-auto border border-descript hover:bg-gray-50 placeholder:text-descript px-1"
            />
          </div>

          <button
            disabled={amount && categoryName && date ? false : true}
            type="submit"
            aria-label="add transaction"
            className="border-2 border-darkBG rounded-md px-1 py-0.5 font-semibold hover:scale-x-105 hover:bg-dark transition-all duration-300 text-center dark:text-light hover:text-light mt-1.5 disabled:bg-descript disabled:opacity-60 sm:col-span-2 w-4/5 mx-auto"
          >
            add
          </button>
        </div>
      </form>
    </section>
  );
};
export default ExpenseForm;
