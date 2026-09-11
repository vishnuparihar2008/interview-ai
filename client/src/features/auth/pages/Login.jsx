import "../auth.form.scss";
import { useNavigate, Link } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { useState } from "react";

const Login = () => {
  const { loading, handleLogin } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleLogin( {email, password } );
    navigate("/");
  };

  if (loading) {
    return (
      <main>
        <h1>LOADING...</h1>
      </main>
    );
  }

  return (
    <main>
      <div className="form-container">
        <h1>Login</h1>

        <form>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              type="email"
              name="email"
              id="email"
              placeholder="test@test.com"
            />
          </div>
          <div className="input-group">
            <label htmlFor="email">Password</label>
            <input
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type="password"
              name="password"
              id="password"
              placeholder="t3st_passw0rd"
            />
          </div>

          <button className="btn btn-primary" onClick={handleSubmit}>
            Login
          </button>
        </form>

        <p>
          Don't have an account <Link to={"/register"}>Register</Link>
        </p>
      </div>
    </main>
  );
};

export default Login;
