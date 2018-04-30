// inyector.js// Get the ipcRenderer of electron
console.log('Looks like an extension. Loading...');
const { ipcRenderer, shell } = require('electron');

// Do something according to a request of your mainview
ipcRenderer.on('request', () => { ipcRenderer.sendToHost(getScripts()); });
ipcRenderer.on('alert-something', (event, data) => { alert(data); });

ipcRenderer.on('change-text-element', (event, data) => {
  // the document references to the document of the <webview>
  document.getElementById(data.id).innerHTML = data.text;
  const www = new RegExp('^' + 'www', 'i');
  if ( www.test(data.text) ){
    shell.openExternal('http://' + data.text, (err) => {
      console.log(err);
    });
  }
});

/**
 * Simple function to return the source path of all the scripts in the document
 * of the <webview>
 *
 *@returns {String}
 * */
function getScripts() {
  const items = [];
  for (let i = 0; i < document.scripts.length; i++) {
    items.push(document.scripts[i].src);
  }
  return JSON.stringify(items);
}
console.log('...Loaded.');
