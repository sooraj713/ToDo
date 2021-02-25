// if user already logged in then login form will be hides
if(localStorage.getItem('activeUser') != 'false')
{
	document.getElementById('loginform').style.display = "none";
}

//if user is already logged in then do not show login form to user...............................
if(!localStorage.getItem('activeUser'))
{
	document.getElementById('loginform').style.display = "block";
}

//Login Function
function isAuthenticatedUser(){
	let uname = document.getElementById('u_name').value;
	let password = document.getElementById('u_pass').value;	
	let u = JSON.parse(localStorage.getItem('users'));
	if (u.length == 0) {
		let label = document.getElementById("loginmsg");
		label.innerHTML = `* Please enter valid username and password *`;
		label.style.color="red";
		label.style.display="block";	
	}
	else{
		for (var i = 0; i < u.length; i++) {
			if(u[i].userName == uname && u[i].password == password)
			{
				console.log("Login Successfully");
				localStorage.setItem('activeUser',uname);
				document.getElementById('login').href = "profile.html";
				break;
			}
			else
			{
			let label = document.getElementById("loginmsg");
			label.innerHTML = `* Please enter valid username and password *`;
			label.style.color="red";
			label.style.display="block";
			}
		}
	}
}//login authentication function ends here..........................

//this is for showing notification count ................................
document.getElementById("notification").innerHTML = Number(localStorage.getItem('notifications'));