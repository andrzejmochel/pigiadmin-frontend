import React, {useRef} from "react";
import {Editor} from "@tinymce/tinymce-react";
import {TINY_MCE_API_KEY} from "../../../../../../Env";

const SendPaymentsForm = ({onSubmit}) => {
    const editorRef = useRef(null);
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(editorRef.current.getContent())
    };

    return (
        <div>
            <h2>Send payment email/s</h2>
            <form onSubmit={handleSubmit} className="pigi-form">
                <div className="form-group">
                    <Editor
                        apiKey={TINY_MCE_API_KEY}
                        onInit={(evt, editor) => editorRef.current = editor}
                        init={{
                            height: 500,
                            menubar: false,
                            plugins: [
                                'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                                'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                                'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                            ],
                            toolbar: 'undo redo | blocks | ' +
                                'bold italic forecolor | alignleft aligncenter ' +
                                'alignright alignjustify | bullist numlist outdent indent | ' +
                                'removeformat | help',
                            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                        }}
                    ></Editor>
                </div>
                <div className="button-group">
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default SendPaymentsForm;