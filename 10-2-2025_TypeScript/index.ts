let A : string = "akash";
console.log(A);


let B : number;
B = 10;
// B = true;
console.log(B);


const f = () : void =>{
    const arr : (number | string | boolean)[] = [1,2,3,4,"Akash",true];
    console.log(...arr);
};

f();


const student: {
    name: string;
    age: number;
} = {
    name: "Akash",
    age: 20
};

console.log(student.name);
console.log(student.age);


enum Access {
    Guest,
    User,
    Admin
};

function checkAccess (level : Access){
    if(level === Access.Guest){
        console.log('Access Granted');
    }else{
        console.log('Access Denied');
    }
};
checkAccess(Access.Admin);
checkAccess(Access.Guest);


interface Person {
    name: string;
    age: number;
};

const user: Person = {
    name: "Akash",
    age: 25,
};

console.log(user.name); 
console.log(user.age);  
