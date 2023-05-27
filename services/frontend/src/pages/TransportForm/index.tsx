import { Field, Form, Formik, ErrorMessage, FieldArray } from "formik";
import { useTransportFormData } from "../../utils/providers/TransportFormProvider";
import { transportSchema } from "../../utils/schemes/transport.schema";
import { ITransportForm } from "../../utils/interfaces/transport.interface";
import { FileField } from "./FileField";

export default function index() {
    const transportForm = useTransportFormData();

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


    // const handleSelectChange = (event: any) => {
    //     const nameOfAircraft = event.target.value;
    //     const selectedAircraftType = transportForm.aircraft_types.find(type => type.name === nameOfAircraft);
    //     const maxPayloadWeight = selectedAircraftType ? selectedAircraftType.max_payload_weight_in_kg : 0;
    //     initialFormValues.aircraft_type.name = nameOfAircraft;
    //     initialFormValues.aircraft_type.max_payload_weight_in_kg = maxPayloadWeight;
    // }

    return (
        <div className="addUserForm">
            <Formik
                enableReinitialize={true}
                initialValues={initialFormValues}
                validationSchema={transportSchema}
                onSubmit={(values) => handleForm(values)}
            >
                {({ values }) => (
                    <Form>
                        <div>
                            <div>
                                <label htmlFor="shipping_from">shipping from:</label>
                                <Field name="shipping_from" type="text" />
                            </div>
                            <ErrorMessage name="shipping_from" />
                        </div>
                        <div>
                            <div>
                                <label htmlFor="shipping_to">shipping to:</label>
                                <Field name="shipping_to" type="text" label="shipping to" />
                            </div>
                            <ErrorMessage name="shipping_to" />
                        </div>
                        <div>
                            <div>
                                <label htmlFor="aircraft_type">Aircraft Type</label>
                                <Field as="select" id="aircraft_type" name="aircraft_type">
                                    <option value="" disabled>Select an aircraft type</option>
                                    {transportForm.aircraft_types.map((type, i) => (
                                        <option key={i += 1} value={type.max_payload_weight_in_kg}>
                                            {type.name}
                                        </option>
                                    ))}
                                </Field>
                            </div>
                            <ErrorMessage name="aircraft_type" />
                        </div>
                        <div>
                            <label htmlFor="shipping_documents">Shipping documents</label>
                            <Field name="shipping_documents" component={FileField} />
                        </div>
                        <div>
                            <div>
                                <label htmlFor="transport_date">transport date:</label>
                                <Field
                                    name="transport_date"
                                    type="date"
                                    format="yyyy-MM-dd"
                                    label="transport date"
                                />
                            </div>
                            <ErrorMessage name="transport_date" />
                        </div>
                        <div>
                            <FieldArray name="cargos">
                                {({ push, remove, form }) => (
                                    <div>
                                        <h2>Cargo</h2>
                                        {values.cargos.map((_, index) => {
                                            const cargoName = `cargos[${index}].name`;
                                            const cargoWeight = `cargos[${index}].payload_weight_in_kg`;
                                            const cargoType = `cargos[${index}].type`;

                                            return (
                                                <div key={index}>
                                                    <p>{index}</p>
                                                    <div>
                                                        <label htmlFor={cargoName}>Name:</label>
                                                        <Field name={cargoName} type="text" />
                                                        <ErrorMessage name={cargoName} />
                                                    </div>
                                                    <div>
                                                        <label htmlFor={cargoWeight}>Weight:</label>
                                                        <Field name={cargoWeight} type="number" />
                                                        <ErrorMessage name={cargoWeight} />
                                                    </div>
                                                    <div>
                                                        <label htmlFor={cargoType}>Type:</label>
                                                        <Field as="select" id="type" name={cargoType}>
                                                            <option value="" disabled>Select an cargo type</option>
                                                            {transportForm.cargo_types.map((type: string, index: number) => (
                                                                <option key={index} value={type}>
                                                                    {type}
                                                                </option>
                                                            ))}
                                                        </Field>
                                                        <ErrorMessage name={cargoType} />
                                                    </div>
                                                    <button type="button" onClick={() => remove(index)}>
                                                        Remove
                                                    </button>
                                                </div>
                                            );
                                        })}

                                        {form.errors.cargos && typeof form.errors.cargos === 'string' && (
                                            <div>{form.errors.cargos}</div>
                                        )}
                                        <button type="button" onClick={() => push({ name: "", payload_weight_in_kg: 0, type: "" })}>
                                            Add Cargo
                                        </button>
                                    </div>
                                )}
                            </FieldArray>
                        </div>
                        <div>
                            <button type="submit">Submit</button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div >
    );
}
