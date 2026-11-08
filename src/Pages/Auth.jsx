import { useState } from "react";
import { supabase } from "../supabaseClient";
import { addToCart } from "../cart";
import { useNavigate } from "react-router-dom";

function Auth() {
  const [isSignUp, setIsSignUp] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage("");

    if (isSignUp) {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) setMessage(error.message);
      else setMessage("Готово! Перевір пошту й підтвердь email.");
    } else {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        setMessage(error.message);
      } else {
        navigate("/aflowers");
      }
    }
  }

  return (
    <div>
      <h1>{isSignUp ? "Реєстрація" : "Вхід"}</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Пароль (мінімум 6 символів)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          minLength={6}
          required
        />
        <button type="submit">{isSignUp ? "Зареєструватись" : "Увійти"}</button>
      </form>

      {message && <p>{message}</p>}

      <button onClick={() => setIsSignUp(!isSignUp)}>
        {isSignUp ? "Вже є акаунт? Увійти" : "Немає акаунта? Зареєструватись"}
      </button>
    </div>
  );
}

export default Auth;
