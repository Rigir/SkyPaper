import { Field, Form, Formik, ErrorMessage, FormikProps, FormikHelpers } from "formik";
import { GetTransportFormDataContext } from "../../utils/providers/TransportFormProvider";
import { transportSchema } from "../../utils/schemes/transport.schema";
import { ITransportForm } from "../../utils/interfaces/transport.interface";
import { FileField } from "./FileField";
import { CargoListField } from "./CargoListField"
import { ChangeEvent } from "react";

export default function index() {
    const transportForm = GetTransportFormDataContext();

    const initialFormValues: ITransportForm = {
        shipping_from: "",
        shipping_to: "",
        aircraft_type: {
            name: "",
            max_weight_in_kg: 0,
        },
        shipping_documents: [],
        transport_date: new Date().toISOString().split("T")[0],
        cargos: []
    };

    const handleSelectAircraftType = (event: ChangeEvent<HTMLSelectElement>, setFieldValue: FormikHelpers<ITransportForm>['setFieldValue']) => {
        const selectedValue = transportForm.aircraft_types.find(t => t.name === event.target.value)
        if (selectedValue) {
            setFieldValue("aircraft_type.max_weight_in_kg", selectedValue.max_weight_in_kg)
        }
    };

    const handleForm = async (values: ITransportForm) => {
        alert(`
            shipping_from: ${values.shipping_from},
            shipping_to: ${values.shipping_to},
            aircraft_type: {
                name: ${values.aircraft_type.name},
                max_weight_in_kg: ${values.aircraft_type.max_weight_in_kg},
            }, 
            transport_date: ${values.transport_date},
            shipping_documents: ${JSON.stringify(values.shipping_documents)},
            cargos: ${JSON.stringify(values.cargos)},
        `);
    };

    return (
        <div className="form-container">
            <Formik
                enableReinitialize={true}
                initialValues={initialFormValues}
                validationSchema={transportSchema}
                onSubmit={(values) => handleForm(values)}
            >
                {({ values, setFieldValue }: FormikProps<ITransportForm>) => (
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
                                    <Field name="shipping_to" type="text" />
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
                                    />
                                </div>
                                <div className="form-field-error-message">
                                    <ErrorMessage name="transport_date" />
                                </div>
                            </div>
                            <div>
                                <div className="form-field-container">
                                    <label htmlFor="aircraft_type">Aircraft Type</label>
                                    <Field as="select" id="aircraft_type" name="aircraft_type.name"
                                        onClick={(e: ChangeEvent<HTMLSelectElement>) => handleSelectAircraftType(e, setFieldValue)}
                                    >
                                        <option value="" disabled>Select an aircraft type</option>
                                        {transportForm.aircraft_types.map((type, i) => (
                                            <option key={i} value={type.name}>
                                                {type.name}
                                            </option>
                                        ))}
                                    </Field>
                                </div>
                                <div className="form-field-error-message">
                                    <ErrorMessage name="aircraft_type.name" />
                                    <ErrorMessage name="aircraft_type.max_weight_in_kg" />
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
                            <CargoListField values={values} transportForm={transportForm} />
                        </div>
                        <div className="form-submit-button">
                            <button type="submit">Submit</button>
                        </div>
                    </Form >
                )}
            </Formik >
        </div >
    );
}
