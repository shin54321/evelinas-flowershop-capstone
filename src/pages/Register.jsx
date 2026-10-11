
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./Register.css";

function Register() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();

        if (
            !name.trim() ||
            !email.trim() ||
            !password ||
            !confirmPassword
        ) {
            toast.error("Please complete all fields.");
            return;
        }

        if (password.length < 6) {
            toast.error("Password must be at least 6 characters.");
            return;
        }

        if (password !== confirmPassword) {
            toast.error("Passwords do not match.");
            return;
        }

        setIsSubmitting(true);

        try {
            // Demo-only registration.
            // Replace with your backend registration API.
            const savedUsers = JSON.parse(
                localStorage.getItem("evelina-users") || "[]"
            );

            const emailExists = savedUsers.some(
                (user) =>
                    user.email.toLowerCase() ===
                    email.trim().toLowerCase()
            );

            if (emailExists) {
                toast.error("An account with this email already exists.");
                return;
            }

            const newUser = {
                name: name.trim(),
                email: email.trim(),
                password,
            };

            localStorage.setItem(
                "evelina-users",
                JSON.stringify([...savedUsers, newUser])
            );

            toast.success("Account created! Please sign in.");

            navigate("/login");
        } catch (error) {
            console.error("Registration error:", error);
            toast.error("Unable to create your account. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <main className="register-page">
            <div className="register-wrapper">
                <section className="register-card">
                    <header className="register-header">
                        <div className="register-flower-icon">
                            <i className="bi bi-flower1"></i>
                        </div>

                        <h1>Create Account</h1>
                        <p>Join Evelina's Flowershop today</p>
                    </header>

                    <form
                        className="register-form"
                        onSubmit={handleSubmit}
                    >
                        <div className="register-field">
                            <label htmlFor="register-name">Full Name</label>
                            <input
                                id="register-name"
                                type="text"
                                className="form-control"
                                placeholder="Jane Doe"
                                value={name}
                                onChange={(event) =>
                                    setName(event.target.value)
                                }
                                autoComplete="name"
                                required
                            />
                        </div>

                        <div className="register-field">
                            <label htmlFor="register-email">
                                Email Address
                            </label>
                            <input
                                id="register-email"
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

                        <div className="register-field">
                            <label htmlFor="register-password">
                                Password
                            </label>

                            <div className="register-password-wrapper">
                                <input
                                    id="register-password"
                                    type={showPassword ? "text" : "password"}
                                    className="form-control"
                                    placeholder="At least 6 characters"
                                    value={password}
                                    onChange={(event) =>
                                        setPassword(event.target.value)
                                    }
                                    autoComplete="new-password"
                                    minLength={6}
                                    required
                                />

                                <button
                                    type="button"
                                    className="register-password-toggle"
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

                        <div className="register-field">
                            <label htmlFor="register-confirm-password">
                                Confirm Password
                            </label>

                            <div className="register-password-wrapper">
                                <input
                                    id="register-confirm-password"
                                    type={
                                        showConfirmPassword
                                            ? "text"
                                            : "password"
                                    }
                                    className="form-control"
                                    placeholder="Repeat your password"
                                    value={confirmPassword}
                                    onChange={(event) =>
                                        setConfirmPassword(event.target.value)
                                    }
                                    autoComplete="new-password"
                                    required
                                />

                                <button
                                    type="button"
                                    className="register-password-toggle"
                                    onClick={() =>
                                        setShowConfirmPassword(
                                            (previous) => !previous
                                        )
                                    }
                                    aria-label={
                                        showConfirmPassword
                                            ? "Hide confirm password"
                                            : "Show confirm password"
                                    }
                                >
                                    <i
                                        className={
                                            showConfirmPassword
                                                ? "bi bi-eye-slash"
                                                : "bi bi-eye"
                                        }
                                    ></i>
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="register-submit-button"
                            disabled={isSubmitting}
                        >
                            <i className="bi bi-person-plus me-2"></i>
                            {isSubmitting
                                ? "Creating Account..."
                                : "Create Account"}
                        </button>

                        <hr className="register-divider" />

                        <div className="register-links">
                            Already have an account?{" "}
                            <Link to="/login">Sign in</Link>
                        </div>
                    </form>
                </section>

                <div className="register-footer">
                    <Link to="/">
                        <i className="bi bi-arrow-left me-2"></i>
                        Back to Evelina's Flowershop
                    </Link>
                </div>
            </div>
        </main>
    );
}

export default Register;
