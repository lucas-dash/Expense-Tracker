import { useEffect, useRef, useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import useTransaction from '../../Context/TransactionContex';

const BudgetForm = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { state } = useTransaction();
  console.log(state.category);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <section className=" border-darkBG border-2 dark:border-light rounded-xl bg-light/70 dark:bg-light/30 dark:text-dark p-5 w-2/4 min-w-max mx-auto mb-8 shadow-2xl shadow-descript dark:shadow-dark">
      <form>
        <h3 className="font-bold text-xl pb-3">Create Budget</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-5">
          <div className="flex flex-col">
            <label htmlFor="name">Name of Budget:</label>
            <input
              type="text"
              name="name"
              id="name"
              aria-label="Select name of your budget"
              autoFocus
              required
              placeholder="e.g. Living"
              className="rounded-lg focus:outline-dark p-0.5 w-56 sm:w-auto border border-descript hover:bg-gray-50 placeholder:text-descript px-1"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="amount">Add amount:</label>
            <input
              type="number"
              min="0"
              id="amount"
              name="amount"
              placeholder="50 Kč"
              required
              aria-label="add max value of budget"
              className="focus:outline-dark p-0.5 px-1 rounded-lg border border-descript hover:bg-gray-50 placeholder:text-descript"
            />
          </div>

          {/* dropdown */}
          <div className="relative inline-block text-left" ref={dropdownRef}>
            <div>
              <span>Select Category:</span>
              <button
                type="button"
                onClick={() => setIsOpen((prev) => !prev)}
                className="inline-flex justify-center items-center gap-1 w-full rounded-lg border border-descript shadow-sm p-0.5 bg-white text-base font-medium text-descript hover:bg-gray-50 focus:ring-dark focus:outline-offset-1 focus:ring-1"
                id="menu-button"
                aria-expanded="true"
                aria-haspopup="true"
              >
                categories
                <FaChevronDown
                  className={`text-dark transition-all duration-500 ease-out ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>
            </div>
            <div
              className={`origin-top-right absolute z-20 my-2 w-full rounded-lg shadow-2xl shadow-dark/60 bg-light ring-1 ring-dark ring-opacity-10 transition-all duration-500 pb-1 ${
                !isOpen ? 'hidden' : ''
              }`}
            >
              <div
                className="py-1 grid grid-cols-2"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="menu-button"
                tabIndex={-1}
              >
                <label
                  htmlFor="Food & Drinks"
                  className="inline-flex items-center mx-2"
                >
                  <input
                    type="checkbox"
                    name="options[]"
                    id="Food & Drinks"
                    className="h-4 w-4"
                    value="Food & Drinks"
                  />
                  <span className="ml-2 text-gray-700">Food & Drinks</span>
                </label>
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            <label htmlFor="limit">Set your Limit:</label>
            <input
              type="number"
              name="limit"
              id="limit"
              min="0"
              placeholder="1000 Kč"
              className="rounded-lg focus:outline-dark p-0.5 px-1 border border-descript hover:bg-gray-50 placeholder:text-descript"
            />
          </div>

          <button
            type="submit"
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
