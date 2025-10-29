import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { menuTree } from './menuTree';
import './Sidebar.css';

function SidebarMenu({ items, level = 0 }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [openIndexes, setOpenIndexes] = useState({});

  const toggleOpen = (path) => {
    setOpenIndexes(prev => ({
      ...prev,
      [path]: !prev[path]
    }));
  };

  return (
    <ul className="menu-list">
      {items.map((item) => {
        const currentPath = level === 0 ? `/${item.title.toLowerCase()}` : `${item.link}`;
        const isOpen = openIndexes[currentPath];
        const isSelected = location.pathname.toLowerCase() === currentPath.toLowerCase();

        return (
          <li key={item.title} className="menu-item">
            <button
              className={`menu-button ${isSelected ? 'selected' : ''}`}
              onClick={() => {
                navigate(currentPath.toLowerCase());
                if (item.children?.length > 0) {
                  toggleOpen(currentPath);
                }
              }}
            >
              <span>{item.title}</span>
              {item.children?.length > 0 && (
                <span className={`arrow ${isOpen ? 'open' : ''}`}>
                  ▼
                </span>
              )}
            </button>
            {item.children?.length > 0 && isOpen && (
              <div className="submenu">
                <SidebarMenu
                  items={item.children}
                  level={level + 1}
                />
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
}

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <SidebarMenu items={menuTree} />
    </aside>
  );
}