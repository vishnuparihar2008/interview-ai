import "../auth.form.scss";
import { Link } from "react-router";

const Register = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <main>
      <div className="form-container">
        <h1>Register</h1>

        <form>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="test"
            />
          </div>
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
            Register
          </button>
        </form>
        <p>
          Already have an account <Link to={"/login"}>Login</Link>
        </p>
      </div>
    </main>
  );
};

export default Register;
