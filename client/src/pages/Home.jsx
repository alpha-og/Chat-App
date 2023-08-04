// react imports
import React from "react";
// file imports
import { CiMenuKebab } from "react-icons/ci";
import { Chat, ChatPreview } from "../components/components";

const ChatListHeader = () => {
    return (
        <div className=" flex flex-row items-center p-2 border-b-2">
            <img
                src="https://cdn.pixabay.com/photo/2023/06/07/02/16/man-8046025_1280.jpg"
                alt="image"
                className="w-11 h-11 flex flex-row items-center rounded-full"
            />
            <div className="ml-2">
                <h1 className="text-md">Name</h1>
            </div>
            <CiMenuKebab size={28} className="p-1 ml-auto" />
        </div>
    );
};

const ChatList = () => {
    return (
        <div className="border-r-2 flex flex-col">
            <ChatListHeader />
            <ChatPreview />
            <ChatPreview />
            <ChatPreview />
        </div>
    );
};

const Home = () => {
    return (
        <div className="flex flex-row">
            <ChatList />
            <Chat />
        </div>
    );
};

export default Home;
