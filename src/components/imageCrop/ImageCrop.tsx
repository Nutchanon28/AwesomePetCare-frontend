import React, { useState, useRef } from "react";

import ReactCrop, {
    centerCrop,
    makeAspectCrop,
    Crop,
    PixelCrop,
} from "react-image-crop";

import { canvasPreview } from "./canvasPreview";
import { useDebounceEffect } from "../../hooks/useDebounceEffect";

import "react-image-crop/dist/ReactCrop.css";

import useAxiosPrivate from "../../hooks/useAxiosPrivate";

interface ImageCropProps {
    imgSrc: string;
    onSubmit: (blob: Blob) => void;
}

const ImageCrop: React.FC<ImageCropProps> = ({ imgSrc, onSubmit }) => {
    const [scale, setScale] = useState(1);
    const [rotate, setRotate] = useState(0);
    const [aspect, setAspect] = useState<number | undefined>(1);
    const [crop, setCrop] = useState<Crop>();
    const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
    const imgRef = useRef<HTMLImageElement>(null);
    const previewCanvasRef = useRef<HTMLCanvasElement>(null);
    const hiddenAnchorRef = useRef<HTMLAnchorElement>(null);
    const blobUrlRef = useRef("");
    const axiosPrivate = useAxiosPrivate();

    // This is to demonstate how to make and center a % aspect crop
    // which is a bit trickier so we use some helper functions.
    function centerAspectCrop(
        mediaWidth: number,
        mediaHeight: number,
        aspect: number
    ) {
        return centerCrop(
            makeAspectCrop(
                {
                    unit: "%",
                    width: 90,
                },
                aspect,
                mediaWidth,
                mediaHeight
            ),
            mediaWidth,
            mediaHeight
        );
    }

    function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
        if (aspect) {
            const { width, height } = e.currentTarget;
            setCrop(centerAspectCrop(width, height, aspect));
        }
    }

    function onDownloadCropClick() {
        if (!previewCanvasRef.current) {
            throw new Error("Crop canvas does not exist");
        }

        previewCanvasRef.current.toBlob(async (blob) => {
            if (!blob) {
                throw new Error("Failed to create blob");
            }
            if (blobUrlRef.current) {
                URL.revokeObjectURL(blobUrlRef.current);
            }
            blobUrlRef.current = URL.createObjectURL(blob);
            hiddenAnchorRef.current!.href = blobUrlRef.current;
            hiddenAnchorRef.current!.click();

            // const formData = new FormData();
            // if (blob) formData.append("avatar", blob);
            // try {
            //     const response = await axiosPrivate.put(
            //         "/profile/avatar",
            //         formData,
            //         { headers: { "Content-Type": "multipart/form-data" } }
            //     );
            //     console.log(response);
            // } catch (error) {
            //     console.log(error);
            // }
            onSubmit(blob);
        });
    }

    useDebounceEffect(
        async () => {
            if (
                completedCrop?.width &&
                completedCrop?.height &&
                imgRef.current &&
                previewCanvasRef.current
            ) {
                // We use canvasPreview as it's much faster than imgPreview.
                canvasPreview(
                    imgRef.current,
                    previewCanvasRef.current,
                    completedCrop,
                    scale,
                    rotate
                );
            }
        },
        100,
        [completedCrop, scale, rotate]
    );

    return (
        <div>
            <div>
                <label htmlFor="scale-input">Scale: </label>
                <input
                    id="scale-input"
                    type="number"
                    step="0.1"
                    value={scale}
                    disabled={!imgSrc}
                    onChange={(e) => setScale(Number(e.target.value))}
                />
            </div>
            <div>
                <label htmlFor="rotate-input">Rotate: </label>
                <input
                    id="rotate-input"
                    type="number"
                    value={rotate}
                    disabled={!imgSrc}
                    onChange={(e) =>
                        setRotate(
                            Math.min(
                                180,
                                Math.max(-180, Number(e.target.value))
                            )
                        )
                    }
                />
            </div>
            {!!imgSrc && (
                <ReactCrop
                    crop={crop}
                    onChange={(_, percentCrop) => setCrop(percentCrop)}
                    onComplete={(c) => setCompletedCrop(c)}
                    aspect={aspect}
                >
                    <img
                        ref={imgRef}
                        alt="Crop me"
                        src={imgSrc}
                        style={{
                            transform: `scale(${scale}) rotate(${rotate}deg)`,
                            maxHeight: "60vh" // 500px, 600px also works
                        }}
                        onLoad={onImageLoad}
                    />
                </ReactCrop>
            )}
            {!!completedCrop && (
                <>
                    <div>
                        <canvas
                            ref={previewCanvasRef}
                            style={{
                                border: "1px solid black",
                                objectFit: "contain",
                                width: completedCrop.width,
                                height: completedCrop.height,
                                display: "none",
                            }}
                        />
                    </div>
                    <div>
                        <button onClick={onDownloadCropClick}>
                            Download Crop
                        </button>
                        <a
                            ref={hiddenAnchorRef}
                            download
                            style={{
                                position: "absolute",
                                top: "-200vh",
                                visibility: "hidden",
                            }}
                        >
                            Hidden download
                        </a>
                    </div>
                </>
            )}
        </div>
    );
};

export default ImageCrop;
