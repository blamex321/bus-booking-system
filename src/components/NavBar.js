"use client";
import { Avatar, Dropdown, Navbar } from "flowbite-react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "./logout";
import LoginButton from "./login";

function NavBar() {
  const { user, isAuthenticated } = useAuth0();

  return (
    <Navbar fluid className=" text-black">
      <Navbar.Brand href="/" className="flex items-center space-x-2">
        <span className="text-xl font-semibold">Bus Reservation</span>
      </Navbar.Brand>
      <div className="flex md:order-2 items-center">
        {isAuthenticated ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={<Avatar alt="User settings" img={user.picture} rounded />}
          >
            <Dropdown.Header>
              <span className="block text-sm">{user.name}</span>
              <span className="block truncate text-sm font-medium">
                {user.email}
              </span>
            </Dropdown.Header>
            <Dropdown.Item>Dashboard</Dropdown.Item>
            <Dropdown.Item>Settings</Dropdown.Item>
            <Dropdown.Item>Earnings</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item>
              <LogoutButton />
            </Dropdown.Item>
          </Dropdown>
        ) : (
          <LoginButton />
        )}
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Link to="/" className="navbar-link" activeClassName="active">
          Home
        </Link>
        <Link to="/about" className="navbar-link" activeClassName="active">
          About
        </Link>
        <Link to="/services" className="navbar-link" activeClassName="active">
          Services
        </Link>
        <Link to="/pricing" className="navbar-link" activeClassName="active">
          Pricing
        </Link>
        <Link to="/contact" className="navbar-link" activeClassName="active">
          Contact
        </Link>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavBar;
