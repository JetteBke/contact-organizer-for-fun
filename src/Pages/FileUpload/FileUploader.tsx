import React, {useState} from "react";
import './FileUploader.css'
import {uploadFile} from "./FileUploadService";

export const FileUploader: React.FC = () => {

    const [successMessage, setSuccessMessage] = useState(false)
    const [failureMessage, setFailureMessage] = useState(false)
    const [noFileMessage, setNoFileMessage] = useState(false)
    const [file, setFile] = React.useState<FileList | null>()

    const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFile(event.target.files)
    }

    const onFileUpload = async () => {
        setFailureMessage(false)
        setSuccessMessage(false)
        setNoFileMessage(false)
        if (file) {
            let formData = new FormData()
            formData.append("file", file[0])
            const success = await uploadFile(formData)
            setFailureMessage(!success)
            setSuccessMessage(success)
            return
        }
        setNoFileMessage(true)
    }

    return (
        <>
            <div className='container'>
                <h1 className='title'>Datei hochladen</h1>
                <div className='file-input-area'>
                    <p>Nur CSV Dateien werden akzeptiert. <br/>
                        Die Kontaktdaten aus der hochgeladenen Datei werden direkt in der Datenbank gespeichert,
                        vorausgesetzt das Format ist in Ordnung.</p>
                    <div className='file-input-form'>
                        <label htmlFor='file-uploader' className='file-input-title'>Datei Input</label>
                        <input
                            id='file-uploader'
                            type='file'
                            onChange={onFileChange}
                        />
                    </div>
                    {successMessage && <p className='success-message'>Datei wurde erfolgreich hochgeladen</p>}
                    {failureMessage && <p className='failure-message'>Datei konnte nicht hochgeladen werden</p>}
                    {noFileMessage && <p className='failure-message'>Keine Datei ausgew??hlt</p>}
                    <button className='file-uploader-button' onClick={onFileUpload}>Jetzt hinzuf??gen</button>
                </div>
            </div>
        </>
    )
}