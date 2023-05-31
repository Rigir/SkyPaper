import { ErrorMessage, Field, FieldArray } from "formik";
import { ITransportForm } from "../../utils/interfaces/transport.interface";
import { ITransportFormDTO } from "../../utils/providers/TransportFormProvider";


export function CargoListField({ values, transportForm }: { values: ITransportForm, transportForm: ITransportFormDTO }) {

    return (
        <FieldArray name="cargos">
            {({ push, remove, form }) => (
                <div >
                    <div>
                        <div className="form-cargo-list-header">
                            <h1>Cargo list:</h1>
                            <div>
                                <button type="button" onClick={() => push({ name: "", weight_in_kg: 0, type: "" })}>
                                    Add Cargo
                                </button>
                            </div>
                        </div>
                    </div>
                    <div>
                        {!values.cargos.length ?
                            (<div className="form-cargo-list-items">
                                {
                                    form.errors.cargos && typeof form.errors.cargos === 'string' ?
                                        (<div className="form-cargo-list-item-placeholder error">{form.errors.cargos}</div>) :
                                        (<div className="form-cargo-list-item-placeholder" >List of cargos...</div>)
                                }
                            </div>) :
                            (<div className="form-cargo-list-items">{
                                values.cargos.map((_, index: number) => {
                                    const cargoName = `cargos[${index}].name`;
                                    const cargoWeight = `cargos[${index}].weight_in_kg`;
                                    const cargoType = `cargos[${index}].type`;

                                    return (
                                        <div key={index} className="form-cargo-list-item">
                                            <div>
                                                <div className="form-field-container">
                                                    <label htmlFor={cargoName}>Name:</label>
                                                    <Field name={cargoName} type="text" />
                                                </div>
                                                <div className="form-field-error-message">
                                                    <ErrorMessage name={cargoName} />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="form-field-container">
                                                    <label htmlFor={cargoWeight}>Weight (kg):</label>
                                                    <Field name={cargoWeight} type="number" min="0" />

                                                </div>
                                                <div className="form-field-error-message">
                                                    <ErrorMessage name={cargoWeight} />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="form-field-container">
                                                    <label htmlFor={cargoType}>Type:</label>
                                                    <Field as="select" id="type" name={cargoType}>
                                                        <option value="" disabled>Select an cargo type</option>
                                                        {transportForm.cargo_types.map((type: string, index: number) => (
                                                            <option key={index} value={type}>
                                                                {type}
                                                            </option>
                                                        ))}
                                                    </Field>
                                                </div>
                                                <div className="form-field-error-message">
                                                    <ErrorMessage name={cargoType} />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="form-field-container">
                                                    <button type="button" onClick={() => remove(index)}>
                                                        Remove
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                            )}
                    </div>
                </div>
            )}
        </FieldArray>
    );
}
