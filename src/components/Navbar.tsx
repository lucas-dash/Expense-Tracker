import { NavLink } from 'react-router-dom';

export const Navbar = () => {
  return (
    <nav className="h-14 font-Lato font-normal text-lg mb-5">
      <ul className="flex items-center justify-center h-full gap-8 sm:gap-14">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? 'font-medium before:w-full before:opacity-100 nav-active'
                : 'nav-active'
            }
          >
            Overview
          </NavLink>
        </li>
        <li>
          <NavLink
            to="tracker"
            className={({ isActive }) =>
              isActive
                ? 'font-medium before:w-full before:opacity-100 nav-active'
                : 'nav-active'
            }
          >
            Expense
          </NavLink>
        </li>
        <li>
          <NavLink
            to="budgets"
            className={({ isActive }) =>
              isActive
                ? 'font-medium before:w-full before:opacity-100 nav-active'
                : 'nav-active'
            }
          >
            Budget
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
