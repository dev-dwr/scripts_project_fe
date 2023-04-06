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
          <Link href="/employeer/jobs/new">
            <button className="postAJobButton">
              <span>Post An Offer</span>
            </button>
          </Link>
          {user ? (
            <>
              <DropdownButton id="dropdown-basic-button" style={{ marginLeft: '20px' }} title={`Hello, ${user.first_name}`}>
                <Dropdown.Item href="/myjobs">My Jobs</Dropdown.Item>
                <Dropdown.Item href="/appliedjobs">Applied Jobs</Dropdown.Item>
                <Dropdown.Item href="/uploadcv">Upload CV</Dropdown.Item>
                <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
              </DropdownButton>
            </>
          ) : (
            !loading && (
              <Link href="/login">
                <button className="loginButtonHeader">
                  <span>Login</span>
                </button>
              </Link>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
