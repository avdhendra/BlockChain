const promise=new Promise((resolve,reject)=>{
//setTimeout(resolve,1000);
setTimeout(()=>resolve(100),1000)
})

// promise.then((valu)=>{
//     console.log(val)
// }).catch((err)=>{
// console.log(val)
// })

//two function one for resolve and other for reject
promise.then((valu)=>{
    console.log(valu)
},
(val)=>{
    console.log("error")
}
).finally(()=>{
    console.log("finally")
})

console.log(promise)



async function func(){
    const result=await promise;
    console.log(result)
}
func()
