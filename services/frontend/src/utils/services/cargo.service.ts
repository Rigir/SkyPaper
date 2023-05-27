import axios from "axios";

export async function getCargoType(){
    return await axios.get("/cargo/types");
}