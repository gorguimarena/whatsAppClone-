import { newChats } from "../component/main/newChats";
import { chats } from "../component/main/chats";
import { main } from "../component/main/listdispaly";


function chatsToNewChat(){
    main.innerHTML = "";
    main.appendChild(newChats);
}

function newChatToChats(){
    main.innerHTML = "";
    main.appendChild(chats);
}

export { newChatToChats, chatsToNewChat};