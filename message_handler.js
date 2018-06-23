import { sendMessage } from "./helpers.js";

var processMessage = (event) => {
	var message = event.message;
	var senderId = event.sender.id;

	if (message.quick_reply) {
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
		else if (payload == "no_responsive") {
			sendMessage(senderId, [
				{	
					text: "Are his/her eyes open?",
					quick_replies: [
						{
    					content_type: "text",
    					title: "Yes",
    					payload: "yes_eyes_open"
						},
						{
    					content_type: "text",
    					title: "No",
    					payload: "no_eyes_open"
						},
					]
				}
			])
		}
		else if (payload == "no_eyes_open") {
			sendMessage(senderId, [
				{	
					text: "These are the steps required to perform CPR..."
				},
				{
			    attachment: {
			      type: "image",
			      payload: {
			        attachment_id: "629905487377101",
			      }
			    }
				},
				{
					text: "Delivery of chest compressions. Note the overlapping hands placed on the center of the sternum, with the rescuer's arms extended. Chest compressions are to be delivered at a rate of at least 100 compressions per minute."					
				},
				{
					text: "..."
				},
				{
					text: "..."
				},
				{
					text: "Please send a photo of the accident scene or victim's ID to speed up processes."
				}
			])
		}
		else if (payload == "yes_correct") {
			sendMessage(senderId, [
				{
					text: "Thank you for your assistance. Help is on the way."	
				},
				{
					text: "Feel free to ask me any other questions."
				}
			])
		}
	}

	else if (message.attachments) {
		let attachment  = message.attachments[0];
		console.log("hit");
		// if location sent
		if (attachment.type == "location") {
			sendMessage(senderId, [
				{
					text: "Location sent to nearest hospital. An ambulance is on its way."
				},
				{
					text: "Please help me to assess the situation.",
				},
				{
					text: "Is he responsive?"
					quick_replies: [
						{
    					content_type: "text",
    					title: "Yes",
    					payload: "yes_responsive"
						},
						{
    					content_type: "text",
    					title: "No",
    					payload: "no_responsive"
						},
					]
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
- Unconscious\n",
				},
				{
					text: "Is this correct?"
					quick_replies: [
						{
    					content_type: "text",
    					title: "Yes",
    					payload: "yes_correct"
						},
						{
    					content_type: "text",
    					title: "No",
    					payload: "no_correct"
						},
						{
    					content_type: "text",
    					title: "Unsure",
    					payload: "unsure_correct"							
						}						
					]
				}
			])
		}
	}
	else{
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
}

export default processMessage