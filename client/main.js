// Modules to control application life and create native browser window
const { app, BrowserWindow } = require('electron')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow() {
    // Create the browser window.
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            plugins: true,
            nodeIntegration: true,
        },
    })

    // and load the index.html of the app.
    // mainWindow.loadFile('index.html')
    mainWindow.loadURL('http://172.18.35.97:8082//index.html')

    // Open the DevTools.
    mainWindow.webContents.openDevTools()

    // Emitted when the window is closed.
    mainWindow.on('closed', function() {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null
    })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function() {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', function() {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow()
    }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

//Server Side
var app1 = require('http').createServer(handler);
var io = require('socket.io')(app1);
var url = require('url');
var fs = require('fs');

app1.listen(8081);

function handler(req, res) { //create server
    fs.readFile(__dirname + '/public/index.html', function(err, data) { //read file index.html in public folder
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/html' }); //display 404 on error
            return res.end("404 Not Found");
        }
        res.writeHead(200, { 'Content-Type': 'text/html' }); //write HTML
        res.write(data); //write data from index.html
        return res.end();
    });
}

// Web Socket Connection
io.sockets.on('connection', function(socket) {
    //console.log("connect");
    // If we recieved a command from a client to start watering lets do so
    socket.on('aaa', function(data) {
        console.log(data.toString());

        //delay = data["duration"];

        // Set a timer for when we should stop watering
        //setTimeout(function(){
        socket.emit("data1", "Hello too");
        //}, 1000);

    });

});