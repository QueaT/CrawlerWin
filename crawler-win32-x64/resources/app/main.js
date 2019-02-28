const rootPath = require('electron-root-path').rootPath;
var request = require('request');
var cheerio  = require('cheerio');
const { app, BrowserWindow, ipcMain } = require('electron')
const fs = require('fs');
const ffmpeg = require('ffmpeg-static-electron');
let elm = '';


app.setLoginItemSettings({
  openAtLogin: true,
  path: ffmpeg,
  });

 request('https://github.com/prebid/Prebid.js/releases',function(err,res,body){
if(!err && res.statusCode === 200) {
    const $ = cheerio.load(body);
    const select = $('.release-header a').text().replace(/[^0-9]/g,'').replace(/(?!^)(?=(?:\d{4})+(?:\.|$))/gm, ' ').substr(0,3);
    let value = fs.readFileSync( __dirname+'/nowyPrebid.txt','utf8');
    if(value < select && value !== undefined ){
        electronHandler('index2.html',true);
        elm = select;
        fs.writeFile(__dirname+ '/nowyPrebid.txt',elm,function(err){})
    }
    else{
      app.quit()
    }
   
}

})

ipcMain.on('closeiT',function(e,item) {
 
      app.quit()  
 
})

const electronHandler=(src)=> {
     function createWindow () {
       win = new BrowserWindow({ width: 500, height: 200 })
    
       win.loadFile(src)
    
     // Otwórz Narzędzia Deweloperskie.
   //  win.webContents.openDevTools()
    
     // Emitowane, gdy okno jest zamknięte.
     win.on('closed', () => {
       win = null
     });
      }
    
    
      // i ładowanie index.html aplikacji.
      
    
      app.on('ready', createWindow)
  
    
    // Zamknij, gdy wszystkie okna są zamknięte.
    app.on('window-all-closed', () => {
      // On macOS it is common for applications and their menu bar
      // to stay active until the user quits explicitly with Cmd + Q
      if (process.platform !== 'darwin') {
        app.quit()
      }
    })  
     
      createWindow();
}




 


