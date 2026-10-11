
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./Login.css";

function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!email.trim() || !password) {
            toast.error("Please enter your email and password.");
            return;
        }

        setIsSubmitting(true);

        try {
            // Demo-only authentication.
            // Replace this with your backend login API.
            const savedUsers = JSON.parse(
                localStorage.getItem("evelina-users") || "[]"
            );

            const user = savedUsers.find(
                (item) =>
                    item.email.toLowerCase() === email.trim().toLowerCase() &&
                    item.password === password
            );

            if (!user) {
                toast.error("Invalid email or password.");
                return;
            }

            const loggedInUser = {
                name: user.name,
                email: user.email,
            };

            localStorage.setItem(
                "evelina-current-user",
                JSON.stringify(loggedInUser)
            );

            toast.success("Welcome back!");

            navigate("/");
        } catch (error) {
            console.error("Login error:", error);
            toast.error("Unable to sign in. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <main className="login-page">
            <div className="login-wrapper">
                <section className="login-card">
                    <header className="login-header">
                        <div className="login-flower-icon">
                            <i className="bi bi-flower1"></i>
                        </div>

                        <h1>Welcome Back</h1>
                        <p>Sign in to Evelina's Flowershop</p>
                    </header>

                      <form className="login-form" onSubmit={handleSubmit}>
                        <div className="login-field">
                            <label htmlFor="login-email">
                                Email Address
                            </label>

                            <input
                                id="login-email"
                                type="email"
                                className="form-control"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(event) =>
                                    setEmail(event.target.value)
                                }
                                autoComplete="email"
                                required
                            />
                        </div>

                        <div className="login-field">
                            <label htmlFor="login-password">
                                Password
                            </label>

                            <div className="login-password-wrapper">
                                <input
                                    id="login-password"
                                    type={showPassword ? "text" : "password"}
                                    className="form-control"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(event) =>
                                        setPassword(event.target.value)
                                    }
                                    autoComplete="current-password"
                                    required
                                />

                                <button
                                    type="button"
                                    className="login-password-toggle"
                                    onClick={() =>
                                        setShowPassword((previous) => !previous)
                                    }
                                    aria-label={
                                        showPassword
                                            ? "Hide password"
                                            : "Show password"
                                    }
                                >
                                    <i
                                        className={
                                            showPassword
                                                ? "bi bi-eye-slash"
                                                : "bi bi-eye"
                                        }
                                    ></i>
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="login-submit-button"
                            disabled={isSubmitting}
                        >
                            <i className="bi bi-box-arrow-in-right me-2"></i>
                            {isSubmitting ? "Signing In..." : "Sign In"}
                        </button>

                        <hr className="login-divider" />

                        <div className="login-links">
                            <p>
                                Don't have an account?{" "}
                                <Link to="/register">Create one</Link>
                            </p>

                            <Link
                                to="/forgot-password"
                                className="login-forgot-link"
                            >
                                Forgot your password?
                            </Link>
                        </div>
                    </form>
                </section>

                <div className="login-footer">
                    <Link to="/">
                        <i className="bi bi-arrow-left me-2"></i>
                        Back to Evelina's Flowershop
                    </Link>
                </div>
            </div>
        </main>
    );
}

export default Login;
