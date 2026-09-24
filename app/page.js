
import "./globals.css";


import "./globals.css";
import Link from "next/link";

export default function Home() {
    return (
        <main className="container">
            <div className="login-card">
                <h1 className="title">StudyHub</h1>

                <p className="subtitle">
                    Your Learning Platform for Students
                </p>

                <p className="description">
                    Learn together, organize your school work and improve your skills.
                </p>

                <div className="home-buttons">
                    <Link href="/login">
                        <button>Login</button>
                    </Link>

                    <Link href="/signup">
                        <button>Sign Up</button>
                    </Link>
                </div>
            </div>
        </main>
    );
}