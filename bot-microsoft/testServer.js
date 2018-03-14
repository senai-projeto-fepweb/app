var restify = require('restify');
var builder = require('botbuilder');
var builder_cognitiveservices = require('botbuilder-cognitiveservices');



// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
    console.log('%s listening to %s', server.name, server.url);
});

// Create chat connector for communicating with the Bot Framework Service
var connector = new builder.ChatConnector({
    appId: process.env.MicrosoftAppId,
    appPassword: process.env.MicrosoftAppPassword
});

// Listen for messages from users 
server.post('/api/messages', connector.listen());

// Receive messages from the user and respond by echoing each message back (prefixed with 'You said:')
var bot = new builder.UniversalBot(connector, function (session) {
    session.send("You said: %s", session.message.text);
});


var recognizer = new builder_cognitiveservices.QnAMakerRecognizer({
    knowledgeBaseId: '19a209e4-46c7-4c5e-a289-098749da4c7a', // process.env.QnAKnowledgebaseId, 
    subscriptionKey: '170e0287cb08496790c6b8e9009e0dd5'
}); //process.env.QnASubscriptionKey});
var basicQnAMakerDialog = new builder_cognitiveservices.QnAMakerDialog({
    recognizers: [recognizer],
    defaultMessage: 'No match! Try changing the query terms!',
    qnaThreshold: 0.3
}
);


basicQnAMakerDialog.defaultWaitNextMessage = function(session, qnaMakerResult){
    // saves the user's question
    session.conversationData.userQuestion = session.message.text; 
    
    if(!qnaMakerResult.answers){
        let msg = new builder.Message(session)
        .addAttachment({
            contentType: "application/vnd.microsoft.card.adaptive",
            content: {
                type: "AdaptiveCard",
                body: [
                    {
                        "type": "TextBlock",
                        "text": `${session.conversationData.userQuestion}`,
                        "size": "large",
                        "weight": "bolder",
                        "color": "accent",
                        "wrap": true
                    },
                    {
                        "type": "TextBlock",
                        "text": `Sorry, no answer found in QnA service`,
                        "size": "large",
                        "weight": "regular",
                        "color": "dark",
                        "wrap": true
                    }
                ]
            }
        });
        session.send(msg);
    }
    session.endDialog();
}

