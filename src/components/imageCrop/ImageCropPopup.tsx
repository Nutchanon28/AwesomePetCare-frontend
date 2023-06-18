import React, { useEffect } from "react";
import "../../css/imageCrop/ImageCropPopup.css";
import ImageCrop from "./ImageCrop";

interface PopupProps {
    onClose: () => void;
    onSubmit: (blob: Blob) => void;
    imgSrc: string;
}

const Popup: React.FC<PopupProps> = ({ onClose, onSubmit, imgSrc }) => {
    useEffect(() => {
        const closePopup = () => {
            onClose();
        };

        const closeButton = document.getElementById("closeButton");
        closeButton?.addEventListener("click", closePopup);

        return () => {
            closeButton?.removeEventListener("click", closePopup);
        };
    }, [onClose]);

    return (
        <>
            <div id="overlay"></div>
            <div id="popup">
                <h1>Popup Title</h1>
                <ImageCrop imgSrc={imgSrc} onSubmit={onSubmit}/>
                <button id="closeButton">Close</button>
            </div>
        </>
    );
};

export default Popup;
