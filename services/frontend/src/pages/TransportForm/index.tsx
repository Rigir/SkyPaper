import { Field, Form, Formik, ErrorMessage, FieldArray } from "formik";
import { GetTransportFormDataContext } from "../../utils/providers/TransportFormProvider";
import { transportSchema } from "../../utils/schemes/transport.schema";
import { ITransportForm } from "../../utils/interfaces/transport.interface";
import { FileField } from "./FileField";

export default function index() {
    const transportForm = GetTransportFormDataContext();

    const initialFormValues: ITransportForm = {
        shipping_from: "",
        shipping_to: "",
        aircraft_type: "",
        shipping_documents: [],
        transport_date: new Date().toISOString().split("T")[0],
        cargos: []
    };

    const handleForm = async (values: ITransportForm) => {
        console.log(values);
    };

    return (
        <div className="form-container">
            <Formik
                enableReinitialize={true}
                initialValues={initialFormValues}
                validationSchema={transportSchema}
                onSubmit={(values) => handleForm(values)}
            >
                {({ values }) => (
                    <Form>
                        <div className="form-transportation-data">
                            <div>
                                <div className="form-field-container">
                                    <label htmlFor="shipping_from">shipping from:</label>
                                    <Field name="shipping_from" type="text" />
                                </div>
                                <div className="form-field-error-message">
                                    <ErrorMessage name="shipping_from" />
                                </div>
                            </div>
                            <div>
                                <div className="form-field-container">
                                    <label htmlFor="shipping_to">shipping to:</label>
                                    <Field name="shipping_to" type="text" label="shipping to" />
                                </div>
                                <div className="form-field-error-message">
                                    <ErrorMessage name="shipping_to" />
                                </div>
                            </div>
                            <div>
                                <div className="form-field-container">
                                    <label htmlFor="transport_date">transport date:</label>
                                    <Field
                                        name="transport_date"
                                        type="date"
                                        format="yyyy-MM-dd"
                                        label="transport date"
                                    />
                                </div>
                                <div className="form-field-error-message">
                                    <ErrorMessage name="transport_date" />
                                </div>
                            </div>
                            <div>
                                <div className="form-field-container">
                                    <label htmlFor="aircraft_type">Aircraft Type</label>
                                    <Field as="select" id="aircraft_type" name="aircraft_type">
                                        <option value="" disabled>Select an aircraft type</option>
                                        {transportForm.aircraft_types.map((type, i) => (
                                            <option key={i += 1} value={type.max_weight_in_kg}>
                                                {type.name}
                                            </option>
                                        ))}
                                    </Field>
                                </div>
                                <div className="form-field-error-message">
                                    <ErrorMessage name="aircraft_type" />
                                </div>
                            </div>
                        </div>
                        <div className="form-shipping-documents">
                            <div className="form-field-container">
                                <label htmlFor="shipping_documents">Shipping documents</label>
                                <Field name="shipping_documents" component={FileField} />
                            </div>
                        </div>
                        <div className="form-cargo-list">
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
                                                (<div className="form-cargo-list-items">{
                                                    form.errors.cargos && typeof form.errors.cargos === 'string' ? (
                                                        <div className="form-cargo-list-item-placeholder error">{form.errors.cargos}</div>
                                                    ) : (<div className="form-cargo-list-item-placeholder" >List of items...</div>)
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
                                                                        <label htmlFor={cargoWeight}>Weight:</label>
                                                                        <Field name={cargoWeight} type="number" />

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
                                                    }
                                                    )
                                                }
                                                </div>
                                                )
                                            }
                                        </div>
                                    </div>)}
                            </FieldArray>
                        </div>
                        <div className="form-submit-button">
                            <button type="submit">Submit</button>
                        </div>
                    </Form >
                )
                }
            </Formik >
        </div >
    );
}
