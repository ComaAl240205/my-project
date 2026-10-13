"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginForm() {
    const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    setIsLoading(true);
    setMessage("");
    setErrors({});

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        if (data.error) {
          setMessage(data.error);
        } else {
          setErrors(data);
        }

        return;
      }
      

      setMessage(data.message);
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error(error);

      setMessage("Backend nicht erreichbar. Prüfe, ob Spring Boot läuft.");
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <div className="page">
      <section className="login-card">
        <div className="heading">
          <span className="badge">HOME-LAB</span>

          <h1>Login</h1>

          <p>Melde dich mit deinem Benutzerkonto an.</p>
          <Link href="/register">
            Noch keinen Account? Registriere dich hier.
          </Link>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">E-Mail-Adresse</label>

            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="alex@example.com"
              autoComplete="email"
              required
            />

            {errors.email?.map((error, index) => (
              <p key={index} className="field-error">
                {error}
              </p>
            ))}
          </div>

          <div className="form-group">
            <label htmlFor="password">Passwort</label>

            <input
              id="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Mindestens 8 Zeichen"
              autoComplete="new-password"
              minLength={8}
              maxLength={72}
              required
            />

            {errors.password?.map((error, index) => (
              <p key={index} className="field-error">
                {error}
              </p>
            ))}
          </div>

          <button type="submit" disabled={isLoading}>
            {isLoading ? "Wird angemeldet..." : "Anmelden"}
          </button>
        </form>

        {message && <div className="message">{message}</div>}
      </section>{" "}
    </div>
  );
}
