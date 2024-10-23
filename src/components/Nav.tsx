import { NavLink } from 'react-router-dom';

const Nav = () => {
  return (
    <nav className="nav">
      <ul>
        <li className="nav-item">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
            end
          >
            Search Candidates
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to="/saved-candidates"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Saved Candidates
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
