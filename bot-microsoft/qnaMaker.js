
//Bibliotecas requeirdas
var builder = require('botbuilder'); // Construir o bot
var restify = require('restify');// Framework para inicializar o servidor
var cognitiveservices = require('botbuilder-cognitiveservices'); //Aprender com as mensagens

//Criar um servidor 
const server =  restify.createServer();
const port = process.env.port || 3978;

server.listen(port)

//Criar um Conector para ouvir as mensagens do chat
const connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});

server.post('/api/messages',connector.listen());

//////////////////EVENTOS DO BOT//////////////////

const bot = new builder.UniversalBot(connector)

bot.set('storage',new builder.MemoryBotStorage());

//Ao deletar dados do usuario
bot.on('deleteUserData',message =>{
    console.log(JSON.stringify(message));
});

// Quando o usuarios entra ou sai do Chat
bot.on('conversationUpdate',message =>{
    console.log(JSON.stringify(message));
});

//Quando o usuario está escrevendo
bot.on('typing',message =>{
    console.log(JSON.stringify(message));
    
});

//Não sei ainda
bot.on('ping',message =>{
    console.log(JSON.stringify(message));
});

//Não sei ainda
bot.on('contactRelationUpdate',message =>{
    console.log(JSON.stringify(message));
});

/////////////QNA MaAKER/////////////

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
    qnaThreshold:0.3,
    feedbackLib: qnaMakerTools
})

//Quando vem mais de uma resposta ele trz mais de uma opção para o usuario escolher
//Não Funciona ainda
// qnaMakerDialog.respondFromQnAMakerResult = (session, result) => {
//     const primeira = result.answers[0].answer;
//     const opcao = primeira.split(';');
//     if (opcao ===1) {
//         return session.send(primeira);
//     }    
//     const[titulo,descricao, url, imagem] = opcao;

//     const card = new builder.HeroCard(session)
//                         .title(titulo)
//                         .text(descricao)
//                         .images([
//                             builder.CardImage.create(session,'http://www.fepweb.com.br/wp-content/uploads/2016/07/Untitled-1-10.png')
//                         ])
//                         .button([
//                             builder.CardAction.openUrl(session,'http://google.com','Procurar'),
                            
//                         ])
//     const resposta = new builder.Message(session).addAttachment(card);
//     session.send(resposta);
// }

bot.dialog('/', qnaMakerDialog)