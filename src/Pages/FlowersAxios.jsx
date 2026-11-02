import { useEffect, useState } from "react";
import axios from "axios";
import FlowerList from "../components/FlowerList";

const supabaseUrl = "https://xoivskauhjutqpfhehqp.supabase.co"
const supabaseKey = "sb_publishable_TTadtabxfU7Zyk5tS1pavw_pjGZcmUe"

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

    return (
        <div>
            <h1>Наші квіти</h1>

            {flowers.map(f => (
            <p key={f.id}>{f.name}</p>
        ))}

        </div>
    );
}

export default Flowers;