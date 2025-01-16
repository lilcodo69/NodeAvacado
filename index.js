const fs = require("fs"); //to get function for reading data , returns an object that contains the function that enable operations on file system
const { text } = require("stream/consumers");
const http = require("http");
const url = require("url");

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
const server = http.createServer((req,res)=>{
    const pathName = req.url;

    if(pathName==="/" || pathName === "/overview") {
        res.end("hello from the server!");              //this is a response send to the client 
    }
    else if(pathName === "/product"){
        res.end("this is product page")
        console.log("this is the product");
    }

    else {
        res.writeHead(404,{
            
        }) //piece of response that we send back 
        res.end("Page not found!");  // FIXED: added response for unknown routes
    }
    
    console.log(req.url);

});
  //whenever a request hits the server , this callback is called 

server.listen(8000,"127.0.0.1",()=>{                      //callback runs whenever the server successfully starts
    console.log("Listning to the requests onn port 8000");
})   //server starts listning for the incoming req , this  last callback runs whenever the server starts