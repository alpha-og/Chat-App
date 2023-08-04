import React from "react";

const ChatPreview = () => {
    return (
        <div className=" flex flex-row items-center md:w-[24rem] w-[20rem] p-2 border-b-2 ease-in-out duration-300">
            <img
                src="https://cdn.pixabay.com/photo/2023/07/29/22/10/birds-8157789_1280.jpg"
                alt="image"
                className="flex flex-row items-center w-11 h-11 rounded-full"
            />
            <div className="md:w-[20rem] w-[15rem] ml-2 ease-in-out duration-300">
                <h1 className=" text-md">Title</h1>
                <p className="  text-sm text-gray-500 truncate">
                    Chat contents djjd djksdjksks skdjskdjsdjsd
                </p>
            </div>
        </div>
    );
};

export default ChatPreview;
