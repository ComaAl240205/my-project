"use client";

import { useState } from "react";
import Link from "next/link";

export default function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleSignup(event) {
        event.preventDefault();

        console.log("E-Mail:", email);
        console.log("Passwort:", password);
    }

    return (
        <main className="container">
            <div className="login-card">

                <h1 className="title">StudyHub</h1>

                <p className="subtitle">
                    Create your account
                </p>

                <p className="description">
                    Join StudyHub and start learning.
                </p>

                <p className="description">
                    Already have an account? <Link href="/login">Login</Link>
                </p>

                <form className="form" onSubmit={handleSignup}>

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
                        Sign Up
                    </button>

                </form>

            </div>
        </main>
    );
}