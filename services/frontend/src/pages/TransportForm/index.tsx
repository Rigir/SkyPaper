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
    };

    const handleForm = async (values: any) => {
        console.log(values);
    };


    return (
        <div className="addUserForm">
            <Formik
                initialValues={initialFormValues}
                validationSchema={transportSchema}
                onSubmit={(values) => handleForm(values)}
            >
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
                                <option value="" disabled>
                                    {" "}
                                    Select an aircraft type{" "}
                                </option>
                                {Object.keys(transportForm.aircraftType).map((aircraftType) => (
                                    <option key={aircraftType} value={aircraftType}>
                                        {aircraftType}
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
                        <button type="submit">Submit</button>
                    </div>
                </Form>
            </Formik>
        </div>
    );
}
