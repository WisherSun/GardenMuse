import { useEffect, useState } from "react";
import axios from "axios";

const supabaseUrl = "https://xoivskauhjutqpfhehqp.supabase.co";
const supabaseKey = "sb_publishable_TTadtabxfU7Zyk5tS1pavw_pjGZcmUe";

const headers = {
    apikey: supabaseKey,
    Authorization: `Bearer ${supabaseKey}`,
};

function FlowersAxios() {
    const [flowers, setFlowers] = useState([]);

    // додавання
    const [showForm, setShowForm] = useState(false);
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [discount, setDiscount] = useState(false);
    const [image, setImage] = useState("");
    const [newprice, setNewprice] = useState("");

    // редагування
    const [editingId, setEditingId] = useState(null);
    const [editName, setEditName] = useState("");
    const [editPrice, setEditPrice] = useState("");
    const [editDescription, setEditDescription] = useState("");
    const [editDiscount, setEditDiscount] = useState(false);
    const [editImage, setEditImage] = useState("");
    const [editNewprice, setEditNewprice] = useState("");

    useEffect(() => {
        async function loadFlowers() {
            try {
                const { data } = await axios.get(
                    `${supabaseUrl}/rest/v1/Flowers?select=*`,
                    { headers }
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
            await axios.delete(`${supabaseUrl}/rest/v1/Flowers?id=eq.${id}`, { headers });
            setFlowers(prev => prev.filter(f => f.id !== id));
        } catch (err) {
            console.error(err);
        }
    }

    async function addFlower(e) {
        e.preventDefault();
        try {
            const { data } = await axios.post(
                `${supabaseUrl}/rest/v1/Flowers`,
                {
                    name,
                    price: Number(price),
                    description,
                    discount,
                    image,
                    newprice: newprice === "" ? null : Number(newprice),
                },
                { headers: { ...headers, Prefer: "return=representation" } }
            );
            setFlowers(prev => [...prev, data[0]]);

            setName("");
            setPrice("");
            setDescription("");
            setDiscount(false);
            setImage("");
            setNewprice("");
            setShowForm(false);
        } catch (err) {
            console.error(err);
        }
    }

    function startEdit(f) {
        setEditingId(f.id);
        setEditName(f.name ?? "");
        setEditPrice(f.price ?? "");
        setEditDescription(f.description ?? "");
        setEditDiscount(f.discount ?? false);
        setEditImage(f.image ?? "");
        setEditNewprice(f.newprice ?? "");
    }

    async function saveEdit(e) {
        e.preventDefault();
        try {
            const { data } = await axios.patch(
                `${supabaseUrl}/rest/v1/Flowers?id=eq.${editingId}`,
                {
                    name: editName,
                    price: Number(editPrice),
                    description: editDescription,
                    discount: editDiscount,
                    image: editImage,
                    newprice: editNewprice === "" ? null : Number(editNewprice),
                },
                { headers: { ...headers, Prefer: "return=representation" } }
            );
            setFlowers(prev => prev.map(f => (f.id === editingId ? data[0] : f)));
            setEditingId(null);
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div>
            <h1>Наші квіти</h1>

            {flowers.map(f => (
                <div key={f.id}>
                    {editingId === f.id ? (
                        <form onSubmit={saveEdit}>
                            <input
                                placeholder="Назва"
                                value={editName}
                                onChange={e => setEditName(e.target.value)}
                                required
                            />
                            <input
                                type="number"
                                placeholder="Ціна"
                                value={editPrice}
                                onChange={e => setEditPrice(e.target.value)}
                            />
                            <input
                                placeholder="descr"
                                value={editDescription}
                                onChange={e => setEditDescription(e.target.value)}
                                required
                            />
                            <label>
                                <input
                                    type="checkbox"
                                    checked={editDiscount}
                                    onChange={e => setEditDiscount(e.target.checked)}
                                />
                                discount
                            </label>
                            <input
                                placeholder="image"
                                value={editImage}
                                onChange={e => setEditImage(e.target.value)}
                            />
                            <input
                                type="number"
                                placeholder="newprice"
                                value={editNewprice}
                                onChange={e => setEditNewprice(e.target.value)}
                            />
                            <button type="submit">Save</button>
                            <button type="button" onClick={() => setEditingId(null)}>
                                Cancel
                            </button>
                        </form>
                    ) : (
                        <>
                            <p>{f.name} {f.price}</p>
                            <button onClick={() => startEdit(f)}>edit</button>
                            <button onClick={() => deleteFlower(f.id)}>delete</button>
                        </>
                    )}
                </div>
            ))}

            <button onClick={() => setShowForm(!showForm)}>
                {showForm ? "Cancel" : "Add"}
            </button>

            {showForm && (
                <form onSubmit={addFlower}>
                    <input
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
                        placeholder="descr"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        required
                    />
                    <label>
                        <input
                            type="checkbox"
                            checked={discount}
                            onChange={e => setDiscount(e.target.checked)}
                        />
                        discount
                    </label>
                    <input
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

export default FlowersAxios;