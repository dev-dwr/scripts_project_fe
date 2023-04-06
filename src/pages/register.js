import Header from "../../layout/Header";
import React, { useContext, useEffect } from "react";
import AuthContext from "../../context/authContext";
import { useRouter } from "next/router";

export default function Register() {
  const router = useRouter();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");

  const { isAuth, error, loading, register, clearErrors } =
    useContext(AuthContext);

  useEffect(() => {
    if (error) {
      clearErrors();
    }
    if (isAuth && !loading) {
      router.push("/");
    }
  }, [isAuth, error, loading]);


  function submit(e) {
    e.preventDefault();
    register({ email, first_name: firstName, last_name: lastName, password });
  }

  return (
    <>
      <Header />
      <div className="modalMask">
        <div className="modalWrapper">
          <div className="right">
            <div className="rightContentWrapper">
              <div className="headerWrapper">
                <h2>Register</h2>
              </div>
              <form className="form" onSubmit={submit}>
                <div className="inputWrapper">
                  <div className="inputBox">
                    <input
                      type="text"
                      placeholder="Enter First Name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="inputBox">
                    <input
                      type="text"
                      placeholder="Enter Last name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="inputBox">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter Your Email"
                      required
                    />
                  </div>
                  <div className="inputBox">
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter Your Password"
                      required
                    />
                  </div>
                </div>
                <div className="registerButtonWrapper">
                  <button type="submit" className="registerButton">
                    Register
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
