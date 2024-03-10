import React, {useState} from 'react';
import {useNotification} from "rc-notification";
import ordersApiService from "../../../../api/orders/orders.api.service";
import fileDownload from "js-file-download";

const UploadOrder = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [notification, notificationContext] = useNotification({closable: true})

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!selectedFile) {
            notification.open({
                content: 'Choose file'
            })
            return;
        }

        const formData = new FormData();
        formData.append('file', selectedFile);

        try {
            const response =  await ordersApiService.uploadOrderXls(formData);
            fileDownload(response.data, response.filename);
        } catch (error) {
            notification.open({
                content: 'Error uploading order'
            })
            console.error('Error uploading file:', error);
        }
    };

    return (
        <div>
            <h2>Upload Order File</h2>
            {notificationContext}
            <form onSubmit={handleSubmit} className="pigi-form">
                <input type="file" onChange={handleFileChange} />
                <button type="submit">Upload</button>
            </form>
        </div>
    );

}

export default UploadOrder;