var users;
//Checks if files are supported in the browser
function handleFiles(files) {
  if (window.FileReader) {
    getAsText(files[0]);
  } else {
    alert('FileReader are not supported in this browser.');
  }
}

//Converts csv file to text file
function getAsText(fileToRead) {
  var reader = new FileReader();
  reader.onload = loadHandler;
  reader.onerror = errorHandler;    
  reader.readAsText(fileToRead);
}

function loadHandler(event) {
  var csv = event.target.result;
  processData(csv);             
}

//Converts text file to required data
function processData(csv) {
  var allLines = csv.split(/\r/);
  var lines = [];
  while (allLines.length) {
    lines.push(allLines.shift().split(','));
}
    
  for (var i = 1; i < lines.length; i++) {
    var j = 0;
    while (j <= lines[i].length) {
       var newUser = new BasicUser(i, lines[i][j], lines[i][++j], lines[i][++j], 
       Date.now());
       users[i] = newUser;
       console.log(users);
       j = j + 2;
    }
  }
}

function errorHandler(evt) {
  if(evt.target.error.name == "NotReadableError") {
    alert("Cannot read file!");
  }
}