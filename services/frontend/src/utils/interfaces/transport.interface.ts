export interface ITransportDetails {
    shipping_from: string,
    shipping_to: string,
    aircraft_type: string,
    shipping_documents: File[] | undefined,
    transport_date: Date | string
}

export interface ITransportForm extends ITransportDetails{}


