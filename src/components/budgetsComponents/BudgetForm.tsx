// icon
import { FaChevronDown } from 'react-icons/fa';
import { MdAdd } from 'react-icons/md';
// hooks
import { useEffect, useRef, useState } from 'react';
import useTransaction from '../../Context/TransactionContex';
// type
import { BudgetsType } from '../../utils/Types';
// utilities
import { v4 as uuidv4 } from 'uuid';

const BudgetForm = () => {
  const { state, addBudget } = useTransaction();

  // other state
  const checkboxReset = false;
  const [isOpenCategories, setIsOpenCategories] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // new budget useState
  const [name, setName] = useState('');
  const [limit, setLimit] = useState('');
  const [categories, setCategories] = useState<string[]>([]);

  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    if (target.checked) {
      setCategories((prev) => [...prev, target.value]);
    } else {
      setCategories((prev) => {
        if (prev.includes(target.value)) {
          return [...prev.filter((cat) => cat !== target.value)];
        }
        return prev;
      });
    }
  };

  useEffect(() => {
    console.log(categories);
  }, [categories]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (name && limit && categories.length > 0) {
      const newBudget: BudgetsType = {
        id: uuidv4(),
        name: name.trim(),
        limit: Number(limit),
        categories: categories,
      };

      addBudget(newBudget);

      setName('');
      setLimit('');
      setCategories([]);
    }
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpenCategories(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <section
      className={` border-darkBG border-2 dark:border-light rounded-xl bg-light/70 dark:bg-light/30 dark:text-dark p-4 w-2/4 min-w-max mx-auto mb-8 shadow-2xl shadow-descript dark:shadow-dark overflow-hidden ${
        showForm
          ? 'h-[295px] sm:h-64 transition-all duration-500'
          : 'h-16 transition-all duration-500 border-dashed'
      } ${isOpenCategories ? 'overflow-visible' : ''}`}
    >
      <form onSubmit={handleSubmit}>
        <div
          className="flex items-center gap-2 pb-3 cursor-pointer"
          onClick={() => setShowForm((prev) => !prev)}
        >
          <MdAdd
            size={25}
            className={` ${
              showForm
                ? 'rotate-45 transition-all duration-500'
                : 'transition-all duration-500 '
            }`}
          />
          <h3 className="font-bold text-xl">Create Budget</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
          <div className="flex flex-col">
            <label htmlFor="name">Name of Budget:</label>
            <input
              type="text"
              name="name"
              id="name"
              value={name}
              onChange={({ target }) => setName(target.value)}
              aria-label="Select name of your budget"
              required
              onFocus={() => setShowForm(true)}
              placeholder="e.g. Living"
              className="rounded-lg focus:outline-dark p-0.5 sm:w-auto border border-descript hover:bg-gray-50 placeholder:text-descript px-1 "
            />
          </div>

          {/* dropdown */}
          <div className="relative inline-block text-left" ref={dropdownRef}>
            <div>
              <span>Select Category:</span>
              <button
                type="button"
                onClick={() => setIsOpenCategories((prev) => !prev)}
                className="inline-flex justify-center items-center gap-1 w-full rounded-lg border border-descript shadow-sm p-0.5 bg-white text-base font-medium text-descript hover:bg-gray-50 focus:ring-dark focus:outline-offset-1 focus:ring-1"
                id="menu-button"
                aria-expanded="true"
                aria-haspopup="true"
              >
                categories
                <FaChevronDown
                  className={`text-dark transition-all duration-500 ease-out ${
                    isOpenCategories ? 'rotate-180' : ''
                  }`}
                />
              </button>
            </div>
            <div
              className={`origin-top-right absolute z-20 my-2 w-full rounded-lg shadow-2xl shadow-dark/60 bg-light ring-1 ring-dark ring-opacity-10 transition-all duration-500 pb-1 ${
                !isOpenCategories ? 'hidden' : ''
              }`}
            >
              <div
                className="py-1 grid grid-cols-2 gap-1"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="menu-button"
                tabIndex={-1}
              >
                {state.category.map((categ) => {
                  if (categ.type === 'Outcome') {
                    return (
                      <label
                        htmlFor={categ.name}
                        key={categ.id}
                        className="flex items-center mx-2 gap-2"
                      >
                        <input
                          type="checkbox"
                          name={categ.name}
                          id={categ.name}
                          className="h-max w-max"
                          onChange={(event) => handleChange(event)}
                          value={categ.name}
                          checked={
                            checkboxReset
                              ? false
                              : categories.includes(categ.name)
                          }
                        />
                        <span className=" text-sm text-gray-700">
                          {categ.name}
                        </span>
                      </label>
                    );
                  } else {
                    return null;
                  }
                })}
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:col-span-2">
            <label htmlFor="limit">Set your Limit:</label>
            <input
              type="number"
              name="limit"
              id="limit"
              min="0"
              inputMode="decimal"
              placeholder="1000 Kč"
              value={limit}
              onChange={({ target }) => setLimit(target.value)}
              className="rounded-lg focus:outline-dark p-0.5 px-1 border border-descript hover:bg-gray-50 placeholder:text-descript"
            />
          </div>

          <button
            type="submit"
            disabled={name && limit && categories.length > 0 ? false : true}
            className="border-2 border-darkBG rounded-md px-1 py-0.5 font-semibold hover:scale-x-105 hover:bg-dark transition-all duration-300 text-center dark:text-light hover:text-light mt-1.5 disabled:bg-descript disabled:opacity-60 sm:col-span-2 w-4/5 mx-auto"
          >
            Add
          </button>
        </div>
      </form>
    </section>
  );
};
export default BudgetForm;
