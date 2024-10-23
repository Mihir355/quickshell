import React, { useState } from "react";
import "../styling/navbar.css";

const Navbar = ({ onGroupingSelect, onSortingSelect }) => {
  const [displayDropdown, setDisplayDropdown] = useState(false);
  const [groupingDropdown, setGroupingDropdown] = useState(false);
  const [orderingDropdown, setOrderingDropdown] = useState(false);

  return (
    <nav className="navbar">
      <button
        className="display-button"
        onClick={() => setDisplayDropdown(!displayDropdown)}
      >
        Display
      </button>
      {displayDropdown && (
        <div className="dropdown-menu">
          <div
            className="dropdown-item"
            onMouseEnter={() => setGroupingDropdown(true)}
            onMouseLeave={() => setGroupingDropdown(false)}
          >
            Grouping
            {groupingDropdown && (
              <div className="nested-dropdown">
                <div
                  className="dropdown-item"
                  onClick={() => onGroupingSelect("status")}
                >
                  By Status
                </div>
                <div
                  className="dropdown-item"
                  onClick={() => onGroupingSelect("user")}
                >
                  By User
                </div>
                <div
                  className="dropdown-item"
                  onClick={() => onGroupingSelect("priority")}
                >
                  By Priority
                </div>
              </div>
            )}
          </div>

          <div
            className="dropdown-item"
            onMouseEnter={() => setOrderingDropdown(true)}
            onMouseLeave={() => setOrderingDropdown(false)}
          >
            Ordering
            {orderingDropdown && (
              <div className="nested-dropdown">
                <div
                  className="dropdown-item"
                  onClick={() => onSortingSelect("priority")}
                >
                  By Priority
                </div>
                <div
                  className="dropdown-item"
                  onClick={() => onSortingSelect("title")}
                >
                  By Title
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
