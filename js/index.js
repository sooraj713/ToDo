//if users are not present in database then it will create users array in db................
if(!localStorage.getItem('users'))
	localStorage.setItem('users', JSON.stringify([]))

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
	if (!/[A-Z]$/i.test(firstName)  || /(\d+)/.test(firstName)) {
		label.textContent = "*please enter valid first name..";
	}
	else if(!/[A-Z]$/i.test(lastName) || /(\d+)/.test(lastName)) {
		label.textContent = "*please enter valid last name..";
	}
	else if(password.length > 8) {
		label.textContent = "*password should be of max 8 characters..";
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
			label.innerHTML = `* Congratulation ${firstName} you have Registered Successfully*`;
			label.style.color = 'green';
		}
	}
}
}//insert function ends.....................................................

//this is for showing the notification count.......................................
document.getElementById("notification").innerHTML = Number(localStorage.getItem('notifications'));