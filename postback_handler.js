import { sendMessage } from "./helpers.js";

var processPostback = (event) => {
  let senderId = event.sender.id;
  let payload = event.postback.payload;
  if (payload === "Greeting") {
    // Get user's first name from the User Profile API
    // and include it in the greeting
    request({
      url: "https://graph.facebook.com/v2.6/" + senderId,
      qs: {
        access_token: process.env.PAGE_ACCESS_TOKEN,
        fields: "first_name,locale,timezone"
      },
      method: "GET"
    }, function(error, response, body) {
      let greeting = "";
      let locale;
      let timezone;
      if (error) {
        console.log("Error getting user's name: " +  error);
      } else {
        let bodyObj = JSON.parse(body);
        let name = bodyObj.first_name;
        locale = bodyObj.locale;
        timezone = bodyObj.timezone;        
        findActiveSubject(senderId).then(doc => {
          if (doc) {
            greeting = "It appears that you're already registered in this survey. Please wait patiently for the questions to be prompted to you."
          } else {
            greeting = "Hi " + name + ". Please enter your identification number: ";            
            // insertDocument({userId: senderId, currentState: 0, locale: locale, timezone: timezone, timeStamp: new Date(), dateString: new moment().add(timezone,'hours').format("dddd, MMMM Do YYYY, h:mm:ss a")});
          }
          sendMessage(senderId, [{text: greeting}]);
        })        
      }
    });
  }
}

export default processPostback