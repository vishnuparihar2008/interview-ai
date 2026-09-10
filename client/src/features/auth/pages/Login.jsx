import "../auth.form.scss";
import { Link } from "react-router";

const Login = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <main>
      <div className="form-container">
        <h1>Login</h1>

        <form>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              name="email"
              id="email"
              placeholder="test@test.com"
            />
          </div>
          <div className="input-group">
            <label htmlFor="email">Password</label>
            <input
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
