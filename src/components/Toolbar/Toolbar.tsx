import React from 'react';
import { NavLink } from 'react-router-dom';

const Toolbar: React.FC = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <div className="container-fluid">
                <span className="navbar-brand">TV Show Search</span>
                <div className="navbar-collapse collapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/" end>Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/search">Search</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Toolbar;
