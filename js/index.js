//if users are not present in database then it will create users array in db................
if(!localStorage.getItem('users'))
	localStorage.setItem('users', JSON.stringify([]))
if(localStorage.getItem('activeUser') != "false")
document.getElementById('rform').style.display = "none";
//this is code for converting image into base64.........................................
var imagebase64 = "";  
  
function encodeImg(element) {  
    var file = element.files[0];  
    var reader = new FileReader();  
    reader.onloadend = function() {  
        imagebase64 = reader.result;  
    }  
    reader.readAsDataURL(file); 
}  


// function for inserting data of new user............................................
function insertRecord() {
	// body...
	let firstName = document.getElementById("fname").value;
	let lastName = document.getElementById("lname").value;
	let userName = document.getElementById("uname").value;
	let password = document.getElementById("pass").value;
	let label = document.getElementById("alertmsg");
	let address = document.getElementById("address").value;

	//validation starts.....................................
	if (!/[A-Z ]$/i.test(firstName)  || /(\d+)/.test(firstName)) {
		label.textContent = "Please enter valid First Name..!";
	}
	else if(!/[A-Z ]$/i.test(lastName) || /(\d+)/.test(lastName)) {
		label.textContent = "Please enter valid Last Name..!";
	}
	else if(!/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(password)) {
		label.textContent = "Password should contain atleast one number and one special character..!";
	}

	else{

	let m = document.getElementById("m").checked;
	let f = document.getElementById("f").checked;
	let gender="";
	if(m)
		gender = 'Male';
	if(f)
		gender = 'Female';

	if (firstName == "" || lastName =="" || userName=="" || 
		password == ""|| gender == "" || address == ""){
		label.innerHTML = "*Please Enter Mandatory Details*";
	}
	else{
		let newUser = {
			firstName : firstName,
			lastName : lastName,
			userName : userName,
			password : password,
			gender : gender,
			address : address,
			image : imagebase64
		};
		let flag = true;
		let u = JSON.parse(localStorage.getItem('users'));
		for (var i = 0; i < u.length; i++) {
			if(u[i].userName === userName)
			{
				label.innerHTML = `* Username not availaible..Try something different*`;
				label.style.color = 'red';
				flag = false;
				break;
			}
		}
		if (flag) {
			u.push(newUser);
			localStorage.setItem('users', JSON.stringify(u));
			label.innerHTML = `"${firstName}" you have successfully signed up..! We're redirecting you, please wait 3 sec.. *`;
			label.style.color = 'green';
			setTimeout(function(){
            window.location.href = 'login.html';
         }, 3000);
		}
	}
}
}//insert function ends.....................................................

//this is for showing the notification count.......................................
document.getElementById("notification").innerHTML = Number(localStorage.getItem('notifications'));
document.getElementById("tr").innerHTML = Number(localStorage.getItem('notifications'));
if (!localStorage.getItem('ToDo')) {

}
else{
let list = JSON.parse(localStorage.getItem('ToDo'));
let count = 0, donecnt = 0, pendingcnt = 0;
let au = localStorage.getItem('activeUser');
for (let i = list.length - 1; i >= 0; i--) {
	if(list[i].userName == au)
		count++;
	if (list[i].userName == au && list[i].isMarkAsDone == "Done")
		donecnt++;
	if (list[i].userName == au && list[i].isMarkAsDone == "Pending")
		pendingcnt++;
}
document.getElementById("tl").innerHTML = count;
document.getElementById("ct").innerHTML = pendingcnt;
document.getElementById("pt").innerHTML = donecnt;
}
