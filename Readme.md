synchronous code is code is called blocking code, as it blocks the execution of codeline that come after it. line by line execution is done , the next line can be executed after the line before it is executed 


Solution:  Asynchronous code where,  heavy work is worked in the background
while rest of the code is still executing , a callback funciton is called to handle the result happening in th background. this is called a non-blocking code . example of a asyn function readFile (reads the file in the backgound while rest of the code is exected without blocking)

fs.readFile("txt/input.txt", "utf-8", (error,data)=>{do something with the data})


Single thread : thread is where the code is executed in the machine inside the processor 


In nodejs every file is treated as a module.
npm is a repository and a commandline app :


dependencies : slugyfy to make urls more readble //these are regular dependencies 

development dependencies :  they are tools ex code bundlers , dev tools etc   , npm i namedepn --savedev to specify that it is a dev dep 
  example:  "nodemon": "^3.1.9"    // automatically loads the site whenever any changes are done 


------------------------------------------------------------------------------------------------------------------------------------------

global installs use --global 

specify local dependencies in scripts to use them

require series : core modules >third party > created my self