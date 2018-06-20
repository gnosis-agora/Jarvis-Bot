import rp from "request-promise";

// sends messages to user
const wait = time => new Promise((resolve) => setTimeout(resolve, time));

export const sendMessage = (recipientId, messages, delay=1500, index=0) => {
  if (messages === undefined || !messages) {
    return;
  }
  if (index < messages.length) {
    var option1 = {
      url: "https://graph.facebook.com/v2.6/me/messages",
      qs: {access_token: process.env.PAGE_ACCESS_TOKEN},
      method: "POST",
      json: {
        recipient: {id: recipientId},
        sender_action: "typing_on" // typing display
      }
    };

    var option2 = {
      url: "https://graph.facebook.com/v2.6/me/messages",
      qs: {access_token: process.env.PAGE_ACCESS_TOKEN},
      method: "POST",
      json: {
        recipient: {id: recipientId},
        sender_action: "typing_off" // typing display
      }
    };

    var option3 = {
      url: "https://graph.facebook.com/v2.6/me/messages",
      qs: {access_token: process.env.PAGE_ACCESS_TOKEN},
      method: "POST",
      json: {
        recipient: {id: recipientId},
        message: messages[index],
      }
    }

    rp(option1) // rp stands for the request-promise package
      .then(res => {
        // expect response from Facebook notifying success
      })
      .then(() => {
        // wait for a few seconds to simulate typing
        return wait(delay);
      })
      .then(() => {
        // send message
        return rp(option2);
      })
      .then(() => {
        return rp(option3);
      })
      .then((res) => {
        // expect response from Facebook notifying success
        sendMessage(recipientId,messages,delay,index+1); // send next message
      })
      .catch(err => {
        console.log("error: " + JSON.stringify(err.error));
      })  
  }
  else {
    return;
  }  
}