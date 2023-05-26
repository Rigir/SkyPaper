import { createContext, useContext, useEffect, useState } from "react";
import { getAircraftType } from "../services/transport.service";

const initialState: any = {};
const TransportFormDataContext = createContext(initialState);

export function TransportFormDataProvider({ children }: any) {
    const [loading, setLoading] = useState(true);
    const [transportFormData, setTransportFormData] = useState(initialState);

    const loadAircraftTypes = async () => {
        try {
            const { data } = await getAircraftType();
            setTransportFormData((prevFormData: any) => ({
                ...prevFormData,
                aircraftType: data.types,
            }));
        } catch (err: any) {
            console.log({ type: "error", message: err.message });
        }
    }

    useEffect(() => {
        loadAircraftTypes();
        setLoading(false);
    }, []);

    return (
        <TransportFormDataContext.Provider value={transportFormData}>
            {!loading ? children : ''}
        </TransportFormDataContext.Provider >
    )
}

export function useTransportFormData() {
    const context = useContext(TransportFormDataContext);
    if (!context) throw new Error("useTransportDataForm must be used in TransportFormDataProvider");

    return context;
}
