import axios from "axios";

export async function getAircraftType() {
    return await axios.get("/transport/aircraft/types");
}