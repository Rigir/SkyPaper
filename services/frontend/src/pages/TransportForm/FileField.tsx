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
        <div className="file-field">
            <div {...getRootProps()} className="drop-area">
                <input {...getInputProps()} />
                <div>Drag and drop files here, or click to select files. </div>
                <div>".jpg", ".png", ".pdf", ".doc", ".docx"</div>
            </div>
            <div className="form-field-error-message">
                <ErrorMessage name={field.name} />
            </div>
            <div className="accepted-files">
                {acceptedFiles.map((file: File) => (
                    <div key={file.name}>
                        <span>{file.name}</span>
                        <button type="button" onClick={() => handleRemoveFile(file.name)} />
                    </div>
                ))}
            </div>
        </div>
    );
}
