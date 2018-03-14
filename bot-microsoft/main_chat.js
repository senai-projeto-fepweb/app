
//Bibliotecas requeirdas
var builder = require('botbuilder'); // Construir o bot
var restify = require('restify');// Framework para inicializar o servidor
var cognitiveservices = require('botbuilder-cognitiveservices'); //Aprender com as mensagens


const server =  restify.createServer();
const port = process.env.port || 3978;

server.listen(port)

const connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});

server.post('/api/messages',connector.listen());

//Configurar o ID da base de dados e a chave de inscrição no QNA_MAKER
//Reconhecer as intençõesd do bot
const recognizer =  new cognitiveservices.QnAMakerRecognizer({
    knowledgeBaseId:'19a209e4-46c7-4c5e-a289-098749da4c7a', 
    subscriptionKey:'170e0287cb08496790c6b8e9009e0dd5',
    top:3
})

// Ferramentas para tratar as mensagens
const qnaMakerTools = new cognitiveservices.QnAMakerTools()
bot.library (qnaMakerTools.createLibrary())   

//Configura a mensagem padrão, caso a pergunta não tenha resposta
const qnaMakerDialog =  new cognitiveservices.QnAMakerDialog({
    recognizers:[recognizer],
    defaultMessage:'Não encontrei',
    qnaThreshold:0.5,
    feedbackLib: qnaMakerTools
})

//Inicializar o bot
bot.dialog('/', qnaMakerDialog)


