'use client'
import Webcam from "react-webcam";
import React, { useState, useEffect } from 'react'
import Button from '@/components/Button'
import { useUser } from '@/context/Context.js'


const videoConstraints = {
    width: 360,
    height: 360,
    facingMode: "user"
};


export default function WebCamp({ takePhoto }) {
    const { image1, setImage1, image2, setImage2, image3, setImage3, webcamRef1, webcamRef2, webcamRef3, } = useUser()

    const height = 360
    const width = 360

    const captureHandler = (e) => {

        const file = e.target.files[0];

        const reader = new FileReader();
        reader.onloadend = () => {
            console.log(reader.result);
            switch (e.target.name) {
                case 'Capture1':
                    return setImage1(reader.result)
                case 'Capture2':
                    return setImage1(reader.result)
                case 'Capture3':
                    return setImage1(reader.result)
            }        };
        reader.readAsDataURL(file);
    };
    const capture1 = React.useCallback(
        () => {
            const imageSrc = webcamRef1.current.getScreenshot();
            setImage1(imageSrc)
        },
        [webcamRef1]
    );
    const capture2 = React.useCallback(
        () => {
            const imageSrc = webcamRef2.current.getScreenshot();
            setImage2(imageSrc)
        },
        [webcamRef2]
    );
    const capture3 = React.useCallback(
        () => {
            const imageSrc = webcamRef3.current.getScreenshot();
            setImage3(imageSrc)
        },
        [webcamRef3]
    );

    switch (takePhoto) {
        case 'Capture1':
            return <div className="relative">
                <label htmlFor="Capture1" className="block relative min-h-[360px] rounded-[20px] overflow-hidden border-[3px]" >
                    {image1 && <img src={image1} className="absolute h-full w-full z-20 object-contain" alt="" />}
                    <div className="absolute h-full w-full flex justify-center items-center text-white text-center z-50">Click para subir foto <br/>desde galería</div>
                    <Webcam
                        audio={false}
                        height={height}
                        ref={webcamRef1}
                        screenshotFormat="image/webp"
                        width={width}
                        videoConstraints={videoConstraints}
                        mirrored={true}
                    />
                    <input type="file" id="Capture1" name="Capture1" className="hidden" onChange={captureHandler} accept="image/*" />
                </label>
                <button
                    className="absolute bottom-[-20px] left-0 right-0 mx-auto flex justify-center items-center bg-[#FFF500] block h-[60px] w-[60px] hover:bg-transparent border-[1px] border-gray-50 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-full text-center border-[3px] z-30"
                    onClick={capture1}>
                    <span className="  w-[30px] h-[30px] rounded-full bg-gray-800 hover:bg-[#FFF500] inline-block"></span>
                </button>
                {image1 && <button type="button" className="absolute top-3 right-2.5 text-gray-900  bg-[#FFF500] hover:text-gray-900 rounded-lg text-[14px] w-8 h-8 ml-auto inline-flex justify-center items-center  dark:hover:text-white z-50" onClick={(e) => { e.stopPropagation(); setImage1(null) }}>
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                    </svg>
                    <span className="sr-only">Close modal</span>
                </button>}
            </div>
        case 'Capture2':
            return <div className="relative">
                <label htmlFor="Capture2" className="block relative min-h-[360px] rounded-[20px] overflow-hidden border-[3px] ">
                    {image2 && <img src={image2} className="absolute h-full w-full z-20 object-contain" alt="" />}
                    <div className="absolute h-full w-full flex justify-center items-center text-white text-center z-50">Click para subir foto <br/>desde galería</div>
                    <Webcam
                        audio={false}
                        height={height}
                        ref={webcamRef2}
                        screenshotFormat="image/webp"
                        width={width}
                        videoConstraints={videoConstraints}
                        mirrored={true}
                    />
                    <input type="file" id="Capture3" name="Capture3" className="hidden" onChange={captureHandler} accept="image/*" />
                </label>
                <button
                    className="absolute bottom-[-20px] left-0 right-0 mx-auto flex justify-center items-center bg-[#FFF500] block h-[60px] w-[60px] hover:bg-transparent border-[1px] border-gray-50 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-full text-center border-[3px] z-30"
                    onClick={capture2}>
                    <span className="  w-[30px] h-[30px] rounded-full bg-gray-800 inline-block"></span>
                </button>
                {image2 && <button type="button" className="absolute top-3 right-2.5 text-gray-900  bg-[#FFF500] hover:text-gray-900 rounded-lg text-[14px] w-8 h-8 ml-auto inline-flex justify-center items-center  dark:hover:text-white z-50" onClick={() => {e.stopPropagation(); setImage2(null)}}>
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                    </svg>
                    <span className="sr-only">Close modal</span>
                </button>}
            </div>
        case 'Capture3':
            return <div className="relative">
                <label htmlFor="Capture3" className="block relative min-h-[360px] rounded-[20px] overflow-hidden border-[3px]">
                    {image3 && <img src={image3} className="absolute h-full w-full z-20 object-contain" alt="" />}
                    <div className="absolute h-full w-full flex justify-center items-center text-white text-center z-50">Click para subir foto <br/>desde galería</div>

                    <Webcam
                        audio={false}
                        height={height}
                        ref={webcamRef3}
                        screenshotFormat="image/webp"
                        width={width}
                        videoConstraints={videoConstraints}
                        mirrored={true}

                    />
                    <input type="file" id="Capture3" name="Capture3" className="hidden" onChange={captureHandler} accept="image/*" />
                </label>
                <button
                    className="absolute bottom-[-20px] left-0 right-0 mx-auto flex justify-center items-center bg-[#FFF500] block h-[60px] w-[60px] hover:bg-transparent border-[1px] border-gray-50 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-full text-center border-[3px] z-30"
                    onClick={capture3}>
                    <span className="  w-[30px] h-[30px] rounded-full bg-gray-800 inline-block"></span>
                </button>
                {image3 && <button type="button" className="absolute top-3 right-2.5 text-gray-900  bg-[#FFF500] hover:text-gray-900 rounded-lg text-[14px] w-8 h-8 ml-auto inline-flex justify-center items-center  dark:hover:text-white z-50" onClick={() => { e.stopPropagation(); setImage3(null)}}>
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                    </svg>
                    <span className="sr-only">Close modal</span>
                </button>}
            </div>


        default:
    }
}



// style={{
//     backgroundImage: `url(${image})`,
//     backgroundAttachment: 'fixed',
//     backgroundPosition: 'center',
//     backgroundSize: 'contain',
// }}