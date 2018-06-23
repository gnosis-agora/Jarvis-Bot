import { sendMessage } from "./helpers.js";

var processMessage = (event) => {
	var message = event.message;
	var senderId = event.sender.id;

	if (message.text) {
		let prompts = ["hello","hi","yo","what up","hey","hey there","get started"];
	    let potentialStart = message.text.toLowerCase().replace(/[?.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
	    if (prompts.indexOf(potentialStart) != -1) {
	    	sendMessage(senderId,[{text: "Hello"}])
	    }
	}
}

export default processMessage