import { string, object, ObjectSchema, date, array } from 'yup';
import { ITransportForm } from '../interfaces/transport.interface.ts';

function isWeekend(date: Date): boolean {
    return [0, 6].includes(date.getDay());
}

export const transportSchema:ObjectSchema<ITransportForm> = object({
    shipping_from: string().required('Transport from is required'),
    shipping_to: string().required('Transport to is required'),
    aircraft_type: string().required('Aircraft type is required'),
    shipping_documents: array<File>().optional(),
    transport_date: date().required('Transport date is required')
    .min(new Date().toISOString().split('T')[0], 'Date must be a future date')
    .test('is-not-weekend', 'Weekends are not allowed', (value) => !isWeekend(value)),
});