import React,{useState} from "react";
import { useForm } from "react-hook-form";
import Modal from "react-bootstrap/Modal";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";

const Modalcomments = (props) => {
    const currentclass = useSelector((state) => state.schoolClasses.selectedClass)
    const dispatch = useDispatch()
    const router = useRouter();
    const { open, onClose, evidenceIds,itemCount } = props;
    const [contents, setContents] = useState('')
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = () => {
        onClose();
        const finaldata = {
            comment: {
                content: contents,
                type: 0,
                response: '',
                evidence_ids: evidenceIds,
                school_class_id: currentclass.id,
            },
        }
        dispatch.classesPage.addCommentbyEvidenceID({
            params: finaldata,
        }).then((response) => {
            
            setContents('');
            // router.reload();
        })
    }

    return (
        <Modal
            show={open ? true : false}
            dialogClassName="custom-modal width650"
        >
            <div className="modal-header">
                <h4 className="modal-title">Comment</h4>
            </div>
            <div className="modal-body">
                <form onSubmit={handleSubmit(onSubmit)}>

                    <div className="comments-box">
                        <label>Enter your comment for {itemCount} selected.</label>
                        <textarea
                            {...register("comment", { required: true })}
                            type="text"
                            placeholder="Enter Your Comment"
                            onChange={(e) => setContents(e.target.value)}
                            className="form-control"></textarea>
                        {errors.comment && errors.comment.type === "required" && (
                            <span role="alert" className="errorMsg text-danger">This field is required</span>
                        )}
                    </div>

                    <div className="modal-buttons d-flex justify-content-end align-items-center p-4">
                        <button type="button" className="smallbtn btn-black btn-close" onClick={() => onClose()}>Cancel</button>
                        <button type="submit" className="smallbtn btn btn-save">Send</button>
                    </div>
                </form>
            </div>

        </Modal>
    )
}

export default Modalcomments;