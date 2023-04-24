// others
import { HiPlusSmall } from 'react-icons/hi2';
import { v4 as uuidv4 } from 'uuid';
// react library
import { useNavigate } from 'react-router';
import { useState } from 'react';
// types
import { CategoryType } from '../utils/Types';
import useTransaction from '../Context/TransactionContex';

const CategoryForm = () => {
  const navigate = useNavigate();

  const { addCategory } = useTransaction();

  const expenseOption: [string, string] = ['Outcome', 'Income'];
  const icons = [
    '🎬',
    '🎓',
    '⚽️',
    '❤️',
    '🍺',
    '✈️',
    '⚡️',
    '🏠',
    '🥐',
    '☕️',
    '🎧',
    '🕹️',
    '🛠️',
    '💵',
    '💪',
    '💳',
    '🚗',
    '🏦',
    '⛽️',
    '👟',
    '📱',
    '🎭',
  ];
  const colors = [
    '#FE5D26',
    '#FF74D4',
    '#1ABCFE',
    '#E84855',
    '#0ACF83',
    '#E44D26',
    '#00BFB2',
    '#FED766',
    '#3185FC',
    '#EFBCD5',
    '#403F4C',
    '#058C42',
    '#5448C8',
    '#84A59D',
    '#FDE74C',
    '#84DCCF',
    '#B81365',
    '#9C6615',
  ];

  const [name, setName] = useState('');
  const [categoryType, setCategoryType] = useState('Outcome');
  const [icon, setIcon] = useState('');
  const [color, setColor] = useState('');

  const handleOptionChange = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    setCategoryType(target.value);
  };
  const handleColorsChange = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    setColor(target.value);
  };

  const canAdd = name && categoryType && color && icon;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (canAdd) {
      const newCategory: CategoryType = {
        id: uuidv4(),
        icon,
        name,
        type: categoryType,
        color,
      };

      addCategory(newCategory);

      setName('');
      setColor('');
      setIcon('');
    }
  };

  return (
    <section className="flex items-center justify-center border-darkBG border-2 dark:border-light rounded-xl bg-light/70 dark:bg-light/40 p-5 w-2/4 min-w-[280px] max-w-sm mx-auto shadow-2xl shadow-descript dark:shadow-descript/20 overflow-hidden relative top-6">
      <div className="absolute right-2 top-2" onClick={() => navigate(-1)}>
        <HiPlusSmall
          size={30}
          className="rotate-45 cursor-pointer hover:scale-125 transition-all duration-300"
        />
      </div>

      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-3 text-dark">
          <div className="flex items-center justify-center">
            <div
              className={`h-12 w-12 rounded-full bg-blue-200 flex items-center justify-center text-xl `}
              style={{ backgroundColor: `${color ? color : ''}` }}
            >
              {icon ? icon : ''}
            </div>
          </div>
          {/* category name input */}
          <div className="flex flex-col">
            <label htmlFor="category">Set Name:</label>
            <input
              type="text"
              name="category"
              id="category"
              value={name}
              onChange={({ target }) => setName(target.value)}
              placeholder="Set name of category"
              aria-label="set name for category"
              required
              className="rounded-lg focus:outline-dark p-0.5 sm:w-auto border border-descript hover:bg-gray-50 placeholder:text-descript px-1"
            />
          </div>

          <div className=" flex justify-evenly items-center gap-3 w-4/5 mx-auto">
            {expenseOption.map((option, i) => {
              return (
                <label
                  key={i}
                  htmlFor={option}
                  className={`cursor-pointer rounded-xl px-3 font-medium border-2 border-dark dark:border-light transition-all duration-300 ease-out  shadow-md shadow-descript dark:shadow-none ${
                    categoryType === option
                      ? 'bg-dark dark:bg-light text-light dark:text-dark '
                      : 'text-descript'
                  }`}
                >
                  <input
                    type="radio"
                    name={option}
                    id={option}
                    value={option}
                    checked={option === categoryType}
                    onChange={handleOptionChange}
                    className="hidden"
                    aria-label={option}
                  />
                  {option}
                </label>
              );
            })}
          </div>

          <div className="flex flex-col">
            <label htmlFor="icon">Choose Icon:</label>
            <select
              name="icon"
              id="icon"
              value={icon}
              aria-label="Select icon category"
              onChange={({ target }) => setIcon(target.value)}
              required
              className="rounded-lg focus:outline-dark p-0.5 sm:w-auto border border-descript hover:bg-gray-50 placeholder:text-descript px-1"
            >
              <option value=""></option>
              {icons.map((icon, index) => {
                return (
                  <option key={index} value={icon} aria-label={icon}>
                    {icon}
                  </option>
                );
              })}
            </select>
          </div>

          <div>
            <span className="inline-block pb-1">Select Color:</span>

            <div className="flex justify-center flex-wrap gap-3 bg-darkBG rounded-2xl px-1.5 py-2 max-w-[240px] ">
              {colors.map((col, i) => {
                return (
                  <label
                    key={i}
                    htmlFor={col}
                    className={`cursor-pointer h-7 rounded-full px-3 font-medium border-2 border-light/0 shadow-dark ${
                      color === col
                        ? ' border-dark/100 scale-110 shadow-none'
                        : ''
                    }`}
                    style={{ backgroundColor: col }}
                  >
                    <input
                      type="radio"
                      id={col}
                      value={col}
                      required
                      checked={col === color}
                      onChange={handleColorsChange}
                      className="hidden"
                    />
                  </label>
                );
              })}
            </div>
          </div>

          <button
            disabled={canAdd ? false : true}
            type="submit"
            aria-label="add new Category"
            className="border-2 border-darkBG rounded-md px-1 py-0.5 font-semibold hover:scale-x-105 hover:bg-dark transition-all duration-300 text-center dark:text-light hover:text-light mt-1.5 disabled:bg-descript disabled:opacity-60 sm:col-span-2 w-4/5 mx-auto"
          >
            Add Category
          </button>
        </div>
      </form>
    </section>
  );
};
export default CategoryForm;
