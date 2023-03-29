//Core javascript
const x=1;
/*
boolean
number string null undefined
*/
const obj={
    helloworld:2,
    x:{
        y:1
    }
}
const keys=Object.keys(obj);
console.log(obj["helloworld"])

for(let i=0;i<keys.length;i++){
    const key=keys[i];
    console.log(obj[key])
}

for(const key of keys){
    console.log(key)
}

const values=Object.values(obj);
for(const value of values){
    console.log(value)
}
const obj2=obj
//obj2 is reference to obj
//so any change in obj2 will also change in obj
obj2.x=10;

const m=[1,2,3,4]
const y=[...m]
 
const sum=x.reduce((acc,current)=>acc+current,0)

const m1=new Map()
m1[2]=3;
m1.set("x",2);
m1.get("x")
m1[10] //undefined
