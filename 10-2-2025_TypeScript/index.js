let A = "akash";
console.log(A);
let B;
B = 10;
// B = true;
console.log(B);
const f = () => {
    const arr = [1, 2, 3, 4, "Akash", true];
    console.log(...arr);
};
f();
const student = {
    name: "Akash",
    age: 20
};
console.log(student.name);
console.log(student.age);
var Access;
(function (Access) {
    Access[Access["Guest"] = 0] = "Guest";
    Access[Access["User"] = 1] = "User";
    Access[Access["Admin"] = 2] = "Admin";
})(Access || (Access = {}));
;
function checkAccess(level) {
    if (level === Access.Guest) {
        console.log('Access Granted');
    }
    else {
        console.log('Access Denied');
    }
}
;
checkAccess(Access.Admin);
checkAccess(Access.Guest);
;
const user = {
    name: "Akash",
    age: 25,
};
console.log(user.name);
console.log(user.age);
