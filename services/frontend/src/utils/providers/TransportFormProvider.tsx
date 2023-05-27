import { createContext, useContext, useEffect, useState } from "react";
import { getAircraftType } from "../services/transport.service";
import { getCargoType } from "../services/cargo.service";
import { ITransportDTO } from "../interfaces/transport.interface";
import { ICargoTypesDTO } from "../interfaces/cargo.interface";


export interface ITransportForm extends ITransportDTO, ICargoTypesDTO { }

const initialState: ITransportForm = {
    cargo_types: [],
    aircraft_types: []
};

const TransportFormDataContext = createContext(initialState);

export function TransportFormDataProvider({ children }: any) {
    const [loading, setLoading] = useState(true);
    const [transportFormData, setTransportFormData] = useState(initialState);

    const loadCargoTypes = async () => {
        try {
            const { data: { cargo_types } } = await getCargoType();
            setTransportFormData((prevFormData: ITransportForm) => ({
                ...prevFormData,
                cargo_types: cargo_types,
            }));
        } catch (err: any) {
            console.log({ type: "error", message: err.message });
        }
    }

    const loadAircraftTypes = async () => {
        try {
            const { data: { aircraft_types } } = await getAircraftType();
            setTransportFormData((prevFormData: ITransportForm) => ({
                ...prevFormData,
                aircraft_types: aircraft_types,
            }));
        } catch (err: any) {
            console.log({ type: "error", message: err.message });
        }
    }

    useEffect(() => {
        loadCargoTypes();
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
