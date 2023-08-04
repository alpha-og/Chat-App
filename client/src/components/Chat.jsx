import React from "react";
import { AiOutlineSend } from "react-icons/ai";
import { CiMenuKebab } from "react-icons/ci";

const ChatHeader = () => {
    return (
        <div className="flex flex-row items-center p-2 border-b-2">
            <img
                src="https://cdn.pixabay.com/photo/2023/06/07/02/16/man-8046025_1280.jpg"
                alt="image"
                className="w-11 h-11 flex flex-row items-center rounded-full"
            />
            <div className="ml-2">
                <h1 className="text-md">Title</h1>
                <p className="text-sm text-gray-500">Meta Data</p>
            </div>
            <CiMenuKebab size={28} className="p-1 ml-auto" />
        </div>
    );
};

const ChatBody = () => {
    return (
        <div className="flex-grow px-5 overflow-scroll">
            <ChatBubble />
            <ChatBubble />
        </div>
    );
};

const ChatFooter = () => {
    return (
        <div className="flex flex-row items-center px-5 py-2 mb-1">
            <input
                type="text"
                name="message"
                placeholder="Hey, whatsup ..."
                className="flex-grow h-full p-1 bg-slate-100 rounded-md outline-none"
            />
            <AiOutlineSend
                size={28}
                className="w-10 h-10 p-1 ml-1 bg-slate-100 rounded-md"
            />
        </div>
    );
};

const ChatBubble = () => {
    return (
        <div className="w-full my-5">
            <div className="flex flex-col w-fit max-w-[50%] p-4 bg-blue-400 rounded-md">
                <div className="flex flex-row items-center">
                    <img
                        src="https://cdn.pixabay.com/photo/2023/06/07/02/16/man-8046025_1280.jpg"
                        alt="image"
                        className="w-8 h-8 flex flex-row items-center rounded-full"
                    />
                    <h1 className="text-sm ml-2">Name</h1>
                </div>
                <p className="my-2">
                    Some message goes here jdhskdjsahdkdjhkdskjs Lorem ipsum
                    dolor sit amet consectetur adipisicing elit. Culpa ipsum id
                    saepe cupiditate tempore dicta labore expedita eum quas.
                    Porro exercitationem voluptatem doloribus atque odit facilis
                    corrupti nam unde asperiores nemo officia consequuntur,
                    autem eos, voluptas perspiciatis. Delectus consequatur
                    provident nostrum deserunt consequuntur corporis iusto unde
                    aliquam ipsam molestias facere nulla architecto officia modi
                    dolores eius repellendus debitis saepe voluptate, accusamus
                    quaerat iste. Atque minima consequatur nobis, nesciunt
                    iusto, eligendi, at exercitationem omnis saepe odit sunt
                    necessitatibus molestias nulla beatae officiis. Quae beatae
                    blanditiis dolores autem natus quam, magni fuga quos velit
                    tenetur? Adipisci quis libero, rerum assumenda vero qui!
                </p>
                <small className="text-gray-500">Meta Data</small>
            </div>
        </div>
    );
};

const Chat = () => {
    return (
        <div className="flex flex-col w-full h-screen">
            <ChatHeader />
            <ChatBody />
            <ChatFooter />
        </div>
    );
};

export default Chat;
