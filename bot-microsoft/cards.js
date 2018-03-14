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

//////////////////CARDS //////////////////

//Possui varios recursos para o usuario interagir como botões para abrir pagina e imagens
const heroCard = session =>{
    return new builder.HeroCard(session)
                        .title("Eu sou o Titulo")
                        .subtitle('Eu sou o subtitulo')
                        .text('Eu sou o texto')
                        .images([
                            builder.CardImage.create(session,'http://www.fepweb.com.br/wp-content/uploads/2016/07/Untitled-1-10.png'),
                            builder.CardImage.create(session,'https://pbs.twimg.com/profile_images/769970349308010496/wgyWAStM_400x400.jpg')
                        ])
                        .buttons([
                            builder.CardAction.openUrl(session,'http://www.fepweb.com.br/wp-content/uploads/2016/07/Untitled-1-10.png'),
                            builder.CardAction.postBack(session,'diga-ok','Tudo bem para você ?')
                        ])
                        
}

//O mesmo que o herocard, porém as imagems ficam no tamanho de tumbnail
const tumbnailCard = session =>{
    return new builder.ThumbnailCard(session)
                        .title("Eu sou o Titulo")
                        .subtitle('Eu sou o subtitulo')
                        .text('Eu sou o texto')
                        .images([
                            builder.CardImage.create(session,'http://www.fepweb.com.br/wp-content/uploads/2016/07/Untitled-1-10.png'),
                            builder.CardImage.create(session,'https://pbs.twimg.com/profile_images/769970349308010496/wgyWAStM_400x400.jpg')
                        ])
                        .buttons([
                            builder.CardAction.openUrl(session,'http://www.fepweb.com.br/wp-content/uploads/2016/07/Untitled-1-10.png'),
                            builder.CardAction.postBack(session,'diga-ok','Tudo bem para você ?')
                        ])
}

//Para fazer a autenticação em algum canal
const signCard = session =>{
    return new builder.SigninCard(session)
                .text('Autenticar Github')
                .button("Autenticar",'http://github.com/login')
}

//Para rodar algum tipo de animação por exemplo um GIF
const animationCard = session =>{
    return new builder.AnimationCard(session)
                        .title("Eu sou o Titulo")
                        .subtitle('Eu sou o subtitulo')
                        .text('Eu sou o texto')
                        .media([{
                            url: 'https://media.giphy.com/media/5xtDarEWbFEH1JUC424/giphy.gif'
                        }
                            
                        ])
                       
            
}
//Para rodar videos
const videoCard = session =>{
    return new builder.VideoCard(session)
                        .title("Eu sou o Titulo")
                        .subtitle('Eu sou o subtitulo')
                        .text('Eu sou o texto')
                        .media([{
                            url: 'https://youtu.be/uHffCNLCmcQ'
                        } 
                        ])
                        .autostart(true)
                        .autoloop(false)
                         
}

const audioCard = session =>{
    return new builder.AudioCard(session)
                        .title("Eu sou o Titulo")
                        .subtitle('Eu sou o subtitulo')
                        .text('Eu sou o texto')
                        .media([{
                            url: 'C:/Users/TETRAIT/Music/Erica Campbell - Help/You are.mp3'
                        } 
                        ])
                        .autostart(true)
                        .autoloop(false)
                         
}

const bot = new builder.UniversalBot(connector,session =>{

    //interceptar a mensagem do CardAction postBack
    if (session.message.text === 'diga-ok'){
       return session.send('OK Man');
    }
   
    const card = [
        heroCard(session),
        tumbnailCard(session),
        signCard(session),
        animationCard(session),
        videoCard(session),
        audioCard(session),
    ]
     // const card = audioCard(session) //tipo de card a mostrar (heroCard, signCard)
    //const message = new builder.Message(session).addAttachment(card)

    //Manda um carrossel de cards
    const message = new builder.Message(session)
                        .attachmentLayout(builder.AttachmentLayout.carousel)
                        .attachments(card)
    
    
    session.send(message)
});