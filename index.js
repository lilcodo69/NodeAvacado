const fs = require("fs"); //to get function for reading data , returns an object that contains the function that enable operations on file system
const { text } = require("stream/consumers");
const http = require("http");
const url = require("url");
const path = require("path");

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
const replaceTemplate = (temp, product) => {
  //product is the ojb that is passed down there as el
  // console.log(product);

  let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName); //using regular expression and g to make it global,
  output = output.replace(/{%IMAGE%}/g, product.image);
  output = output.replace(/{%PRICE%}/g, product.price);
  output = output.replace(/{%FROM%}/g, product.from);
  output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
  output = output.replace(/{%QUANTITY%}/g, product.quantity);
  output = output.replace(/{%DESCRIPTION%}/g, product.description);
  output = output.replace(/{%ID%}/g, product.id);

  if (!product.organic)
    output = output.replace(/{%NOT_ORGANIC%}/g, "not-organic");
  return output;
};
// --------------------------------------------------------------------
//all file read happens here 
const templateOverView = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf-8"
); //all these data will be loaded once, as its on top level
const templateCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8"
);
const templateProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  "utf-8"
);
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");

const dataObject = JSON.parse(data); //this is an array, we loop over this array to get the data
// ---------------------------------------------------------------------

//server creation:

const server = http.createServer((req, res) => {
  const {query,pathname}=( url.parse(req.url, true)); ; //parse query into object
  console.log(req.url);  //gives the url 

  //Overview page
  if (pathname === "/" || pathname === "/overview") {
    res.writeHead(200, {
      "Content-type": "text/html", // Changed this to text/html since you're serving HTML
    });
    const cardsHtml = dataObject    //cards html : are the individual cards that are displayed on the overview page
      .map((el) => replaceTemplate(templateCard, el))
      .join("");
    const output = templateOverView.replace("{%PRODUCT_CARDS%}", cardsHtml);

    res.end(output); //this is a response send to the client
  }

  //Product pages
  else if (pathname === "/product") {
 
      res.writeHead(200, {
          "Content-type": "text/html",
        });
       
        
     const product = dataObject[query.id]; //query.id is the id that we get from the url 
    const output = replaceTemplate(templateProduct, product); //read the html file pass it with the object , later object replaces the placeholders

    res.end(output);
  }

  //Api
  else if (pathname === "/api") {
    res.writeHead(200, {
      "Content-type": "application/json",
    });
    res.end(data);
  }

  //Not found
  else {
    res.writeHead(404, {
      "Content-type": "text/html", //Note header should be sent before the response
    }); //piece of imformation about response that we send back
    res.end("<h1>Page not found!</h1>"); // FIXED: added response for unknown routes
  }
});


//whenever a request hits the server , this callback is called

server.listen(8000, "127.0.0.1", () => {
  //callback runs whenever the server successfully starts
  console.log("Listning to the requests onn port 8000");
}); //server starts listning for the incoming req , this  last callback runs whenever the server starts
