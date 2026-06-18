import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
console.log("FlowerList loaded")

function FlowerList() {

    const [flowers, setFlowers] = useState([]);
    

    useEffect(() => {

        async function getFlowers() {

            const { data, error } = await supabase
                .from("Flowers")
                .select("*");


            if (error) {
                console.log(error);
                return;
            }

            setFlowers(data);
        }


        getFlowers();

    }, []);



    return (
        <div style={{
            display: "flex",
            gap: "30px",
            flexWrap: "wrap",
            justifyContent: "center"
        }}>

            {
                flowers.map(flower => (

                    <div
                        key={flower.id}
                        style={{
                            width: "300px",
                            borderRadius: "10px",
                            boxShadow: "0 5px 15px rgba(0,0,0,0.15)",
                            overflow: "hidden",
                            paddingBottom: "20px"
                        }}
                    >

                        <img
                            src={flower.image}
                            alt={flower.name}
                            style={{
                                width: "100%",
                                height: "250px",
                                objectFit: "cover"
                            }}
                        />


                        <div style={{padding:"15px"}}>

                            <h2>
                                {flower.name}
                            </h2>


                            <p>
                                {flower.description}
                            </p>


                            {
                                flower.discount
                                ?
                                <div>
                                    <span style={{
                                        textDecoration:"line-through",
                                        color:"gray"
                                    }}>
                                        {flower.price} грн
                                    </span>

                                    <p>
                                        <b>
                                            {flower.newprice} грн
                                        </b>
                                    </p>
                                </div>

                                :

                                <h3>
                                    {flower.price} грн
                                </h3>
                            }


                        </div>

                    </div>

                ))
            }

        </div>
    );
}


export default FlowerList;