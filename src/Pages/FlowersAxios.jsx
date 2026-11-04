import { useEffect, useState } from "react";
import axios from "axios";
import FlowerList from "../components/FlowerList";

const supabaseUrl = "https://xoivskauhjutqpfhehqp.supabase.co"
const supabaseKey = "sb_publishable_TTadtabxfU7Zyk5tS1pavw_pjGZcmUe"

const headers = {
    apikey: supabaseKey,
    Authorization: `Bearer ${supabaseKey}`,
}

function Flowers() {
    const [flowers, setFlowers] = useState([]);

    const [showForm, setShowForm] = useState(false);
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [discount, setDiscount] = useState("");
    const [image, setImage] = useState("");
    const [newprice, setNewprice] = useState("");


    useEffect(() => {
        async function loadFlowers() {
            try {
                const { data } = await axios.get(
                    `${supabaseUrl}/rest/v1/Flowers?select=*`,
                    {
                        headers: {
                            apikey: supabaseKey,
                            Authorization: `Bearer ${supabaseKey}`,
                        },
                    }
                );
                setFlowers(data);
            } catch (err) {
                console.error(err);
            }
        }

        loadFlowers();
    }, []);

    async function deleteFlower(id) {
        try {
            await axios.delete(
                `${supabaseUrl}/rest/v1/Flowers?id=eq.${id}`,
                { headers }
            );
            // прибираємо видалену квітку зі стану, щоб вона зникла зі сторінки
            setFlowers(prev => prev.filter(f => f.id !== id));
        } catch (err) {
            console.error(err);
        }
    }

    async function addFlower(e) {
        e.preventDefault(); // щоб сторінка не перезавантажилась

        try {
            const { data } = await axios.post(
                `${supabaseUrl}/rest/v1/Flowers`,
                { name, 
                 price: Number(price),
                description,
                discount,
                image,
                newprice
             },
                {
                    headers: {
                        ...headers,
                        Prefer: "return=representation",
                    },
                }
            );
            // data це масив з одним новим рядком (разом з id)
            setFlowers(prev => [...prev, data[0]]);

            // очищаємо форму і ховаємо її
            setName("");
            setPrice("");
            setDescription("");
            setDiscount("");
            setImage("");
            setNewprice("");
            setShowForm(false);
        } catch (err) {
            console.error(err);
        }
    }



    return (
        <div>
            <h1>Наші квіти</h1>

            {flowers.map(f => (
                <div>
            <p key={f.id}>{f.name}</p>
            <button onClick={() => deleteFlower(f.id)}>delete</button>
            </div>
        ))}

        <button onClick={() => setShowForm(!showForm)}>
                {showForm ? "Cancel" : "Add"}
            </button>

            {showForm && (
                <form onSubmit={addFlower}>
                    <input
                        type="text"
                        placeholder="Назва"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        required
                    />
                    <input
                        type="number"
                        placeholder="Ціна"
                        value={price}
                        onChange={e => setPrice(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="descr"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        required
                    />


                    <input
                        type="bool"
                        placeholder="discount"
                        value={discount}
                        onChange={e => setDiscount(e.target.value)}
                    />
                
                    <input
                        type="text"
                        placeholder="image"
                        value={image}
                        onChange={e => setImage(e.target.value)}
                    />

                    <input
                        type="number"
                        placeholder="newprice"
                        value={newprice}
                        onChange={e => setNewprice(e.target.value)}
                    />
                    <button type="submit">Save</button>
                </form>
            )}
            <p>changing from GitHub</p>
        </div>
    );
}

export default Flowers;
