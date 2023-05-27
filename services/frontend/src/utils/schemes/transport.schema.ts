import { string, object, ObjectSchema, date, array, mixed, ValidationError} from 'yup';
import { ITransportForm } from '../interfaces/transport.interface.ts';
import { cargoSchema } from './cargo.schema.ts';

function isWeekend(date: Date): boolean {
    return [0, 6].includes(date.getDay());
}

export const transportSchema:ObjectSchema<ITransportForm> = object({
    shipping_from: string().required('Transport from is required'),
    shipping_to: string().required('Transport to is required'),
    aircraft_type: mixed<string | number>().required("Aircraft type is required"),
    shipping_documents: array<File>().optional(),
    transport_date: date().required('Transport date is required')
    .min(new Date().toISOString().split('T')[0], 'Date must be a future date')
    .test('is-not-weekend', 'Weekends are not allowed', (value) => !isWeekend(value)),
    cargos: array().of(cargoSchema).required().min(1, "At least one cargo must be added")
    .test('validate-cargo-weight', (cargos, testContext) => {
        const selected_type_max_weight = parseInt(testContext.parent.aircraft_type);
        if(selected_type_max_weight){
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
            if (acuredErrors.length !== 0){
                return new ValidationError(acuredErrors)
            }
        }
        return true
    }),
   
});