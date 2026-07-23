const fs=require('fs').promises;
const promise=new Promise((resolve,reject)=>{
    const num=10;
    if (num%2)
    {
        resolve("Even number");
    }
    else{
        reject("Odd number");
    }
})
promise
.then((resolve)=> {console.log(resolve)})
.catch((reject)=> {console.log(reject)});
