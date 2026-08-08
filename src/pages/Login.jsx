import { useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function Login({ navigate }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();

    setLoading(true);
    setError("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    navigate("/dashboard");

    setLoading(false);
  };

  return (
    <div className="auth-page">

      <div className="auth-card">

        <button
          className="auth-logo"
          type="button"
          onClick={() => navigate("/")}
        >
          AB<span>Talks</span>
        </button>

        <div className="section-label">
          WELCOME BACK
        </div>

        <h1>Login</h1>

        <p className="auth-subtitle">
          Continue your 60-day coding challenge.
        </p>

        <form onSubmit={handleLogin}>

          <label>Email</label>

          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(event) =>
              setEmail(event.target.value)
            }
            required
          />

          <label>Password</label>

          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(event) =>
              setPassword(event.target.value)
            }
            required
          />

          {error && (
            <div className="auth-error">
              {error}
            </div>
          )}

          <button
            className="primary-button auth-submit"
            type="submit"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login →"}
          </button>

        </form>

        <p className="auth-switch">
          Don't have an account?{" "}

          <button
            type="button"
            onClick={() => navigate("/signup")}
          >
            Create account
          </button>
        </p>

      </div>

    </div>
  );
}