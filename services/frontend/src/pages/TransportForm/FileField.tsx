import { ErrorMessage } from "formik";
import { useDropzone } from "react-dropzone";
import { useState } from "react";

export function FileField({ field, form }: { field: any; form: any }) {
    const [acceptedFiles, setAcceptedFiles] = useState<File[]>([]);

    const { getRootProps, getInputProps } = useDropzone({
        accept: {
            "image/jpeg": [".jpeg", ".jpg"],
            "image/png": [".png"],
            "application/pdf": [".pdf"],
            "application/msword": [".doc"],
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".dox"],
        },
        multiple: true,
        onDrop: (newFiles) => {
            newFiles.forEach((file: File) => {
                if (!acceptedFiles.find((f: File) => f.name === file.name)) {
                    const updatedFiles = [...acceptedFiles, ...newFiles];
                    setAcceptedFiles(updatedFiles);
                    form.setFieldValue(field.name, updatedFiles);
                }
            });
        },
    });

    const handleRemoveFile = (fileName: string) => {
        const updatedFiles = acceptedFiles.filter((file: File) => file.name !== fileName);
        setAcceptedFiles(updatedFiles);
        form.setFieldValue(field.name, updatedFiles);
    };

    return (
        <div>
            <div {...getRootProps()}>
                <input {...getInputProps()} />
                <p>Drag and drop files here, or click to select files </p>
                <span>Allowed formats ".jpg", ".png", ".pdf", ".doc", ".docx"</span>
            </div>
            <ErrorMessage name={field.name} />
            <ul>
                {acceptedFiles.map((file: File) => (
                    <li key={file.name}>
                        {file.name}
                        <button type="button" onClick={() => handleRemoveFile(file.name)}>Remove</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
