import { string, object, ObjectSchema, date, array, number, ValidationError } from 'yup';
import { ITransportForm } from '../interfaces/transport.interface.ts';
import { cargoSchema } from './cargo.schema.ts';

function isWeekend(date: Date): boolean {
    return [0, 6].includes(date.getDay());
}

export const transportSchema: ObjectSchema<ITransportForm> = object({
    shipping_from: string().required('Transport from is required'),
    shipping_to: string().required('Transport to is required'),
    aircraft_type: object({
        name: string().required('Aircraft type is required'),
        max_weight_in_kg: number().min(0, 'Weight must be greater than or equal to 0').required('Max weight is required'),
    }).required("Aircraft type is required"),
    shipping_documents: array<File>().optional(),
    transport_date: date().required('Transport date is required')
        .min(new Date().toISOString().split('T')[0], 'Date must be set in the future')
        .test('is-not-weekend', 'Weekends are not allowed', (value) => !isWeekend(value)),
    cargos: array().of(cargoSchema).required().min(1, "At least one cargo must be added")
        .test('validate-cargo-weight', (cargos, testContext) => {
            const selected_type_max_weight = testContext.parent.aircraft_type.max_weight_in_kg;
            if (selected_type_max_weight) {
                const acuredErrors: ValidationError[] = cargos.reduce((errors: ValidationError[], cargo: { weight_in_kg: number }, index) => {
                    if (cargo.weight_in_kg > selected_type_max_weight) {
                        errors.push(new ValidationError(
                            `Maximum payload weight is ${selected_type_max_weight} kg`,
                            cargo.weight_in_kg,
                            `cargos[${index}].weight_in_kg`
                        ));
                    }
                    return errors;
                }, []);
                if (acuredErrors.length !== 0) {
                    return new ValidationError(acuredErrors)
                }
            }
            return true
        }),

});