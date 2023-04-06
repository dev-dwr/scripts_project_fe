import Header from "../../layout/Header";
import React, { useContext, useEffect } from "react";
import AuthContext from "../../context/authContext";
import { useRouter } from "next/router";
export default function Login() {
  const router = useRouter();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const { isAuth, error, loading, login } = useContext(AuthContext);

  function submit(e) {
    e.preventDefault();
    login({ username: email, password: password });
    router.push("/")
  }

  useEffect(() => {
    if (error) {
      console.error(error);
    }
    if (isAuth && !loading) {
      router.push("/");
    }
  }, [isAuth, error, loading]);

  return (
    <>
      <Header />
      <div className="modalMask">
        <div className="modalWrapper">
          <div className="right">
            <div className="rightContentWrapper">
              <div className="headerWrapper">
                <h2>Login</h2>
              </div>
              <form className="form" onSubmit={submit}>
                <div className="inputWrapper">
                  <div className="inputBox">
                    <input
                      type="email"
                      placeholder="dawid@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="inputBox">
                    <input
                      type="password"
                      placeholder="*********"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="loginButtonWrapper">
                  <button type="submit" className="loginButton">
                    {loading ? "Auth..." : "Login"}
                  </button>
                </div>
                <p style={{ textDecoration: "none" }} className="signup">
                  <a href="/register">Create an account</a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
