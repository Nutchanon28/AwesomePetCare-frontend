import React, { useState, useEffect, useRef } from "react";
import "../../css/imageCrop/ImageCrop.css";

import ReactCrop, {
    centerCrop,
    makeAspectCrop,
    Crop,
    PixelCrop,
} from "react-image-crop";

import { canvasPreview } from "./canvasPreview";
import { useDebounceEffect } from "../../hooks/useDebounceEffect";

import "react-image-crop/dist/ReactCrop.css";

import { FaSearchPlus, FaSearchMinus } from "react-icons/fa";
import { MdRotateLeft, MdRotateRight } from "react-icons/md";

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
    const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

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

    function onClick() {
        if (!previewCanvasRef.current) {
            throw new Error("Crop canvas does not exist");
        }

        previewCanvasRef.current.toBlob(async (blob) => {
            if (!blob) {
                throw new Error("Failed to create blob");
            }

            onSubmit(blob);
        });
    }

    const handleMouseDown = (direction: "left" | "right") => {
        const increment = direction === "left" ? -1 : 1;
        setRotate((prevRotate) =>
            Math.min(180, Math.max(-180, prevRotate + increment))
        );

        const id = setInterval(() => {
            setRotate((prevRotate) =>
                Math.min(180, Math.max(-180, prevRotate + increment))
            );
        }, 100);

        setIntervalId(id);
    };

    const handleMouseUp = () => {
        if (intervalId) {
            clearInterval(intervalId);
            setIntervalId(null);
        }
    };

    useEffect(() => {
        return () => {
            if (intervalId) {
                clearInterval(intervalId);
                setIntervalId(null);
            }
        };
    }, [intervalId]);

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
            <div style={{ display: "none" }}>
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
            <div style={{ display: "none" }}>
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
            <div>
                <FaSearchPlus onClick={() => setScale(scale + 0.1)} />
                <FaSearchMinus onClick={() => setScale(scale - 0.1)} />
                <MdRotateLeft
                    onMouseDown={() => handleMouseDown("left")}
                    onMouseUp={handleMouseUp}
                />
                <MdRotateRight
                    onMouseDown={() => handleMouseDown("right")}
                    onMouseUp={handleMouseUp}
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
                            maxHeight: "60vh", // 500px, 600px also works
                            maxWidth: "60vw",
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
                        <button onClick={onClick}>save</button>
                    </div>
                </>
            )}
        </div>
    );
};

export default ImageCrop;
