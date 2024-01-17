const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
require('dotenv').config()

//const fs = require('fs');
//const SESSION_FILE_PATH = './session.json';

let client;

const withSession = () => {

    console.log('Entro a con sesion')
}


const whithOutSession = () => {

    console.log('Sin sesion previa');
    client = new Client({
        authStrategy: new LocalAuth()
    });
    client.on('qr', (qr) => {
        qrcode.generate(qr, { small: true })
    });

    client.on('ready', () => {
        console.log('Client is ready!');
    });
    
    client.initialize();   
    
    client.on('message', async (message) => {
        // console.log('message', message)
        // console.log('to', message.to)
        // console.log('from ', message.from)
        
        if (message.from == `521${process.env.PHONE}@c.us`) {
            try {

                console.log('entro condición')

                // let contacts = await client.getBlockedContacts()
                
                // console.log('contacts length ', contacts.length)
                // console.log('contacts ', contacts)

                //await client.muteChat(message.from, null)

                //await client.archiveChat(message.from)
                
                await message.delete(true)

            } catch (error) {
                console.log('errror: ', error)
            }
            //await client.sendMessage(message.from, 'pong');
        }
    });
     
    
}

//(fs.existsSync(SESSION_FILE_PATH)) ? withSession() : whithOutSession();

whithOutSession();