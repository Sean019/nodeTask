var http = require('http');

var fs = require('fs');



function handle_incoming_request (req, res) {

    console.log("INCOMING REQUEST: " + req.method + " " + req.url);

    load_sensor_data(function(err, readings){

    if (err) { 

       console.log("Couldn't read file");

    }
	
	var readIn = new Array();
	
	readIn = readings
	readIn = readIn.toString('ascii', 0, readIn.length).split(',');
	
	for(i in readIn){
    console.log(readIn[i]);
	}
	
	var entries = readIn.length/5
	
	console.log(entries)
	
	var first = 0;
	var second = 1;
	var third = 2;
	var fourth = 3;
	var fifth = 4;
	
	//for(i=0,i <= entries,i++ ){
	
	var text1 = '{"temperature":' + '"' + readIn[first]+'",';
	var text2 = '"humidity": '+'"'+ readIn[second]+'"'+',';
	var text3 = '"wind Speed": '+'"'+ readIn[third]+'"'+',';
	var text4 = '"time": '+'"'+ readIn[fourth]+'"'+',';
	var text5 = '"location": '+'"'+ readIn[fifth]+'"'+'}';
	
	//first = first + 5;
	//second = second + 5;
	//third = third + 5;
	//fourth = fourth + 5;
	//fifth = fifth + 5;
	
	var sensorText = text1 + '\n' + text2 + '\n' + text3 + '\n' + text4 + '\n' + text5;
	//}
	
	var obj = JSON.parse(sensorText);
	
    res.writeHead(200, { "Content-Type" : "application/json" });

    res.end(JSON.stringify(obj));

   });

}



function load_sensor_data(callback) {

   fs.readFile(

   "sensorlog.txt",'utf8',

   function (err, readings) {

   if (err) {

   callback(err);

return;



}

callback(null, readings);

}

);

}

var s = http.createServer(handle_incoming_request);


s.listen(8080);