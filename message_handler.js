import { sendMessage } from "./helpers.js";

var processMessage = (event) => {
	var message = event.message;
	var senderId = event.sender.id;

	if (message.text) {
		let prompts = ["hello","hi","yo","what up","hey","hey there","get started","help"];
	    let potentialStart = message.text.toLowerCase().replace(/[?.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
	    if (prompts.indexOf(potentialStart) != -1) {
	    	sendMessage(senderId,[
	    		{
	    			text: "Hello, What is your emergency?",
	    			quick_replies: [
	    				{
	    					content_type: "text",
	              title: "Fainted",
	              payload: "fainted"
	    				},
	    				{
	    					content_type: "text",
	    					title: "Murder",
	    					payload: "murder"
	    				},
	    				{
	    					content_type: "text",
	    					title: "Suicide",
	    					payload: "suicide"
	    				},
	    				{
	    					content_type: "text",
	    					title: "Fire",
	    					payload: "fire"
	    				},
	    			]
	    		}])
	    }
	}
	else if (message.quick_reply) {
		let payload = message.quick_reply.payload;

		if (payload == "fainted") {
			sendMessage(senderId, [
				{
					text: "Please send your current location to me",
					quick_replies: [
						{
							content_type: "location"
						}
					]
				}	
			])
		}
	}

	else if (message.attachments) {
		let attachment  = message.attachments
		// if location sent
		if (attachment.type == "location") {
			sendMessage(senderId, [
				{
					text: "Location received. An ambulance is on its way."
				},
				{
					text: "In the meantime, can you send me a photo of the accident/crime scene?"
				}
			])
		}
		else if (attachment.type == "image") {
			sendMessage(senderId, [
				{
					text: "Please wait while I analyse the situation..."
				},
				{
					text: "From the image, I can tell that the victim is:\n\
					- Chinese male\n\
					- Aged 21-28\n\
					- Unconscious\n\
					Was the victim experiencing shortness of breath before collapsing?",
					quick_replies: [
						{
    					content_type: "text",
    					title: "Yes",
    					payload: "yes_heart_attack"
						},
						{
    					content_type: "text",
    					title: "No",
    					payload: "no_heart_attack"
						},
						{
    					content_type: "text",
    					title: "Unsure",
    					payload: "no_heart_attack"							
						}						
					]
				}
			])
		}
	}
}

export default processMessage