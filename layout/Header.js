import React from "react";
import Link from "next/link";
import { useContext } from "react";
import AuthContext from "../context/authContext";
import { Dropdown, DropdownButton } from "react-bootstrap";

const Header = () => {
  const { loading, user, logout } = useContext(AuthContext);

  return (
    <div className="navWrapper">
      <div className="navContainer">
        <Link style={{ textDecoration: "none" }} href="/">
          <span>Scripts Project</span>
        </Link>
        <div className="btnsWrapper">
          <Link href="/offer/newoffer">
            <button className="postAJobButton">
              <span>Post An Offer</span>
            </button>
          </Link>
          {user && user ? (
            <>
              <DropdownButton id="dropdown-basic-button" style={{ marginLeft: '20px' }} title={`Hello, ${user.first_name}`}>
                <Dropdown.Item href="offer/myoffers">My Jobs</Dropdown.Item>
                <Dropdown.Item href="/applied">Applied Jobs</Dropdown.Item>
                <Dropdown.Item href="/uploadcv">Upload CV</Dropdown.Item>
                <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
              </DropdownButton>
            </>
          ) : (
            // !loading && (
              <Link href="/login">
                <button className="loginButtonHeader">
                  <span>Login</span>
                </button>
              </Link>
            // )
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
