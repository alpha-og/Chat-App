const buttonCNC = document.querySelector("button#button-create_new_chat"); // CNC - Create New Chat

buttonCNC.addEventListener("click", addCreateChatDialogue);

function addCreateChatDialogue(){
    const ccdc = document.createElement("div"); //ccdc -  Create Chat Dialogue Container
    ccdc.className = "div-create_chat_dialogue_container";
    ccdc.innerHTML = "<div class='div-create_chat_dalogue'><h4>Create a new chat</h4><div class='div-chat_search_bar'><input type='text' name='chat_search' id='input-chat_search' /><button id='button-search_chat'><i data-lucide='search'></i></button></div><div class='div-chat_search_responses'><div class='div-chat_search_response'><div class='div-person_details'><img src='' alt='pfp' /><p>Name</p></div><button id='button-create_chat' class='button-icon_container'><i data-lucide='plus'></i></button></div></div></div>"
    ccdc.addEventListener('click', (e) => {
        if (e.target == ccdc){
            ccdc.style.backgroundColor = "rgba(0,0,0,0)";
            setTimeout(() => {
                ccdc.remove();
            }, 390);
        }
    })
    document.body.prepend(ccdc);
    setTimeout(() => {
        ccdc.style.backgroundColor = "rgba(0,0,0,0.4";
    }, 1);

    const buttonSearch = document.querySelector("button#button-search_chat");
    const inputField = document.querySelector("#input-chat_search");
    buttonSearch.addEventListener("click", () =>{
        const searchQuery = {query: String(inputField.value)};
        fetch("/home/search", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(searchQuery)
        })
        .then((res) => {return res.text()})
        .then(data => console.log(data))
        .catch((err) => console.log(err));

    })
}
