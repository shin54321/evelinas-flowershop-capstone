
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "./ForgotPassword.css";

function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!email.trim()) {
            toast.error("Please enter your email address.");
            return;
        }

        setIsSubmitting(true);

        try {
            /*
             * Connect this to your PHP backend when available.
             * Example endpoint: /api/forgot-password.php
             *
             * A real implementation should send a password-reset
             * link using a secure, time-limited token.
             */

            // Demo behavior only: no email is actually sent.
            await new Promise((resolve) => setTimeout(resolve, 500));

            setSubmitted(true);
            toast.success("If an account exists, reset instructions will be sent.");
        } catch (error) {
            console.error("Forgot password error:", error);
            toast.error("Something went wrong. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <main className="forgot-password-page">
            <div className="forgot-password-wrapper">
                <section className="forgot-password-card">
                    <header className="forgot-password-header">
                        <Link
                            to="/login"
                            className="forgot-password-back"
                        >
                            <i className="bi bi-arrow-left me-2"></i>
                            Back
                        </Link>

                        <div className="forgot-password-icon">
                            <i className="bi bi-flower1"></i>
                        </div>

                        <h1>Forgot Password?</h1>
                        <p>Let's help you get back to your account</p>
                    </header>

                    <div className="forgot-password-form">
                        {!submitted ? (
                            <>
                                <div className="forgot-password-message">
                                    <i className="bi bi-envelope-heart"></i>
                                    <p>
                                        Enter the email address associated
                                        with your account. If an account
                                        exists, you'll receive instructions
                                        to reset your password.
                                    </p>
                                </div>

                                <form onSubmit={handleSubmit}>
                                    <div className="forgot-password-field">
                                        <label htmlFor="forgot-email">
                                            Email Address
                                        </label>

                                        <input
                                            id="forgot-email"
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

                                    <button
                                        type="submit"
                                        className="forgot-password-submit"
                                        disabled={isSubmitting}
                                    >
                                        <i className="bi bi-envelope me-2"></i>
                                        {isSubmitting
                                            ? "Please wait..."
                                            : "Send Reset Instructions"}
                                    </button>
                                </form>
                            </>
                        ) : (
                            <div className="forgot-password-success">
                                <div className="forgot-password-success-icon">
                                    <i className="bi bi-check-lg"></i>
                                </div>

                                <h2>Check Your Email</h2>

                                <p>
                                    If an account exists for{" "}
                                    <strong>{email}</strong>, you can receive
                                    instructions to reset your password.
                                </p>

                                <button
                                    type="button"
                                    className="forgot-password-submit"
                                    onClick={() => {
                                        setSubmitted(false);
                                        setEmail("");
                                    }}
                                >
                                    Try Another Email
                                </button>
                            </div>
                        )}

                        <hr className="forgot-password-divider" />

                        <div className="forgot-password-links">
                            Remember your password?{" "}
                            <Link to="/login">Sign in</Link>
                        </div>
                    </div>
                </section>

                <div className="forgot-password-footer">
                    <Link to="/">
                        <i className="bi bi-arrow-left me-2"></i>
                        Back to Evelina's Flowershop
                    </Link>
                </div>
            </div>
        </main>
    );
}

export default ForgotPassword;
