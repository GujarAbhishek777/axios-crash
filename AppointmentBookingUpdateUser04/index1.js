var s=document.getElementById('abhi7');
s.addEventListener('click',SaveToLocalStorage);

function SaveToLocalStorage() {
console.log("Submit is called");

// preventDefault();
const name = document.getElementById('username').value;
const email = document.getElementById('email').value;
const phone = document.getElementById('phone').value;

// localStorage.setItem('name',name);
// localStorage.setItem('email',email);
// localStorage.setItem('phone number',phone);

const obj = {
    name: name,
    email: email,
    phone: phone
}

axios.post("https://crudcrud.com/api/0fd6e759a8d848608d50de4fd955008e/appointmentData", obj)
    .then((response) => {
        showNewUserOnScreen(response.data);
        console.log(response);

    }).catch((err) => {
        // document.body.innerHTML=document.body.innerHTML+"<h4>Something Went Wrong</h4>"
        console.log(err);

    })
// // the new functionality for the n no. of users
// localStorage.setItem(email, JSON.stringify(obj));
// showNewUserOnScreen(obj);

}


window.addEventListener("DOMContentLoaded", () => {
axios.get("https://crudcrud.com/api/0fd6e759a8d848608d50de4fd955008e/appointmentData")
    .then((res) => {
        console.log(res);
        for (var i = 0; i < res.data.length; i++) {
            showNewUserOnScreen(res.data[i]);
        }

    }).catch((err) => {
        console.log(err);

    })
// const localStorageObj = localStorage;
// const localstoragekeys = Object.keys(localStorageObj)

// for (var i = 0; i < localstoragekeys.length; i++) {
//     const key = localstoragekeys[i]
//     const userDetailsString = localStorageObj[key];
//     const userDetailsObj = JSON.parse(userDetailsString);
//     showNewUserOnScreen(userDetailsObj)
// }
})

function showNewUserOnScreen(user) {


document.getElementById('email').value = '';
document.getElementById('username').value = '';
document.getElementById('phone').value = '';



// if (localStorage.getItem(user.email) !== null) {
//     removeUserFromScreen(user.email)
// }
const parentNode = document.getElementById('listOfUsers');
const childHTML = `<li id=${user._id}> ${user.name} - ${user.email}
                            <button id="abhi" onclick=deleteUser('${user._id}')>Delete User</button>
                            <button id="abhi1" onclick=editUserDetails('${user.email}','${user.name}','${user.phone}','${user._id}')>Edit User</button>
                         </li>`

parentNode.innerHTML = parentNode.innerHTML + childHTML;
}



function editUserDetails(email,name,phone,userId) {
//   showNewUserOnScreen
// show(email,name,phone);
// console.log(userId);

document.getElementById('email').value = email;
document.getElementById('username').value = name;
document.getElementById('phone').value = phone;
//  deleteUser(userId);
axios
.put(`https://crudcrud.com/api/0fd6e759a8d848608d50de4fd955008e/appointmentData/${userId}`)
.then((res) => {
    removeUserFromScreen(userId);
    console.log(userId);
})
.catch(err => console.error(err));

}

// function show(email,name,phone){
//      document.getElementById('email').value = email;
//     document.getElementById('username').value = name;
//     document.getElementById('phone').value = phone;
// }


function deleteUser(userId) {

axios
    .delete(`https://crudcrud.com/api/0fd6e759a8d848608d50de4fd955008e/appointmentData/${userId}`)
    .then((res) => {
        removeUserFromScreen(userId);
        console.log(userId);
    })
    .catch(err => console.error(err));

// console.log(email)
// localStorage.removeItem(email);
// removeUserFromScreen(email);

}

function removeUserFromScreen(userId) {
const parentNode = document.getElementById('listOfUsers');
const childNodeToBeDeleted = document.getElementById(userId);

if (childNodeToBeDeleted) {
    parentNode.removeChild(childNodeToBeDeleted);
}
}
