"use client";

import { useState } from "react";

import Link from "next/link";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleLogin(event) {
        event.preventDefault();

        console.log("E-Mail:", email);
        console.log("Passwort:", password);
    }

    return (
        <main className="container">
            <div className="login-card">

                <h1 className="title">StudyHub</h1>

                <p className="subtitle">
                    Your Learning Platform for Students
                </p>

                <p className="description">
                    Welcome back! Login to continue.
                </p>

                <p className="description">
                    Don't have an account? <Link href="/signup">Sign Up</Link>
                </p>

                <form className="form" onSubmit={handleLogin}>

                    <input
                        type="email"
                        placeholder="E-Mail"
                        className="input"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        className="input"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button
                        className="login-button"
                        type="submit"
                    >
                        Login
                    </button>

                </form>

            </div>
        </main>
    );
}