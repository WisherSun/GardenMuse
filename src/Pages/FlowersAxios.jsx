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

    return (
        <div>
            <h1>Наші квіти</h1>

            {flowers.map(f => (
                <div>
            <p key={f.id}>{f.name}</p>
            <button onClick={() => deleteFlower(f.id)}>delete</button>
            </div>
        ))}

        </div>
    );
}

export default Flowers;