import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { useAuth } from "../AuthContext";
import { changeQty, removeFromCart } from "../cart";

function Cabinet() {
  const { user, loading } = useAuth();
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (!user) return;

    async function load() {
      const { data, error } = await supabase
        .from("cart")
        .select("id, quantity, Flowers(name, price, image)");
      if (error) console.error(error);
      else setItems(data);
    }
    load();
  }, [user]);

  async function handleQty(id, qty) {
    if (qty < 1) return;
    const { error } = await changeQty(id, qty);
    if (!error) {
      setItems((prev) =>
        prev.map((i) => (i.id === id ? { ...i, quantity: qty } : i)),
      );
    }
  }

  async function handleRemove(id) {
    const { error } = await removeFromCart(id);
    if (!error) setItems((prev) => prev.filter((i) => i.id !== id));
  }

  if (loading) return <p>Завантаження...</p>;
  if (!user) return <Navigate to="/auth" />;

  const total = items.reduce((sum, i) => sum + i.Flowers.price * i.quantity, 0);

  return (
    <div>
      <h1>Мій кошик</h1>
      <p>{user.email}</p>

      {items.length === 0 && <p>Кошик порожній</p>}

      {items.map((i) => (
        <div key={i.id}>
          <p>
            {i.Flowers.name}: {i.Flowers.price} × {i.quantity}
          </p>
          <button onClick={() => handleQty(i.id, i.quantity - 1)}>−</button>
          <button onClick={() => handleQty(i.id, i.quantity + 1)}>+</button>
          <button onClick={() => handleRemove(i.id)}>Видалити</button>
        </div>
      ))}

      <h3>Разом: {total}</h3>
    </div>
  );
}

export default Cabinet;
