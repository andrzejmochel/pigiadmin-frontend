import React, {useState} from 'react';
import ordersApiService from "../../../../api/orders/orders.api.service";
import fileDownload from "js-file-download";
import toast from "react-hot-toast";

const UploadOrder = () => {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!selectedFile) {
            toast.error('Choose file');
            return;
        }

        const formData = new FormData();
        formData.append('file', selectedFile);

        try {
            const response =  await ordersApiService.uploadOrderXls(formData);
            fileDownload(response.data, response.filename);
        } catch (error) {
            toast.error('Error uploading file: ' + error);
            console.error('Error uploading file:', error);
        }
    };

    return (
        <div>
            <h2>Upload Order File</h2>
            <form onSubmit={handleSubmit} className="pigi-form">
                <input type="file" onChange={handleFileChange} />
                <button type="submit">Upload</button>
            </form>
        </div>
    );

}

export default UploadOrder;