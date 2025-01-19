const fs = require("fs"); //to get function for reading data , returns an object that contains the function that enable operations on file system
const { text } = require("stream/consumers");
const http = require("http");
const url = require("url");
const path = require("path");
const { log } = require("console");

// --------------------------------------------------------------------------------
//Blocking , synchronous way
// const textIN = fs.readFileSync("./txt/input.txt", "utf-8");
// // console.log(textIN);

// const textOut = `This is what we know about the avocado : ${textIN}.\nCreated on ${Date.now}`;
// fs.writeFileSync("./txt/out.put.txt", textOut);
// console.log("File written! , not getting blocked bitc*");

//non blocking asynchronous way

// fs.readFile("txt/start.txt", "utf-8", (error, data1) => {
//   fs.readFile(`txt/${data1}.txt`, `utf-8`, (error, data2) => {
//     fs.readFile(`txt/append.txt`, `utf-8`, (error, data3) => {

//         fs.writeFile(`txt/final.txt`,`${data2}\n{data3}` ,`utf-8`,  (error) => {
//                     console.log("your file has been written 🍆");
                    
//           });

//     });
//   });
// });

///////////////////////////////////////////////////////////////////////////

//Server : 

    //top level code : code that is outside the callback function , is executed once we start the program 

const data = fs.readFile(`${__dirname}/dev-data/data.json`,"utf-8")
const dataObject = JSON.parse(data); 

const server = http.createServer((req,res)=>{
    const pathName = req.url;
    
    if(pathName==="/" || pathName === "/overview") {
        res.end("hello from the server!");         //this is a response send to the client
    }
    else if(pathName === "/product"){
        res.end("this is product page")
        console.log("this is the product");
    }
    else if(pathName ==="/api") {         
        res.writeHead(200,{
            "Content-type":"application/json"
        });
        res.end(data)
             
    }
    else {
        res.writeHead(404,{
            "Content-type": "text/html",   //Note header should be sent before the response
        }) //piece of imformation about response that we send back
        res.end("<h1>Page not found!</h1>");  // FIXED: added response for unknown routes
    }
    console.log(req.url);
});
  //whenever a request hits the server , this callback is called 

server.listen(8000,"127.0.0.1",()=>{                      //callback runs whenever the server successfully starts
    console.log("Listning to the requests onn port 8000");
})   //server starts listning for the incoming req , this  last callback runs whenever the server starts
 