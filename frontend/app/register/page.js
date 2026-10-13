"use client";

import { useState } from "react";
import Link from "next/link";

export default function RegisterForm() {
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
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`,
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
      <section className="register-card">
        <div className="heading">
          <span className="badge">HOME-LAB</span>

          <h1>Account erstellen</h1>

          <p>Registriere deinen ersten Benutzer im Spring-Boot-Backend.</p>
          <Link href="/login">Schon einen Account? Melde dich hier an.</Link>
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
            {isLoading ? "Wird registriert..." : "Registrieren"}
          </button>
        </form>

        {message && <div className="message">{message}</div>}
      </section>{" "}
    </div>
  );
}
