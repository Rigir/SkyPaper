import { ICargoDetails } from "./cargo.interface"

export interface ITransportAircraftType {
    name: string,
    max_weight_in_kg: number,
}

export interface ITransportDTO {
    aircraft_types: ITransportAircraftType[]
}

export interface ITransportDetails {
    shipping_from: string,
    shipping_to: string,
    aircraft_type: ITransportAircraftType,
    shipping_documents: File[] | undefined,
    transport_date: Date | string
}

export interface ITransportForm extends ITransportDetails {
    cargos: ICargoDetails[]
}


