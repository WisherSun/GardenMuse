import { useState } from "react";
import { supabase } from "../supabaseClient";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleLogin() {
        console.log("Кнопка натиснута");
    const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) {
        console.log(error);
        alert(error.message);
    } else {

        const { data } = await supabase.auth.getUser();

        console.log(data.user);

        alert("Успішний вхід!");
    }
}
    

    return (
        <div>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <button onClick={handleLogin}>
                Увійти
            </button>
        </div>
    );
}

export default Login;