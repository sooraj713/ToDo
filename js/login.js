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
		label.innerHTML = `Please enter valid username and password...!`;
		label.style.color="red";
		label.style.display="block";	
	}
	else{
		let flag = 0;
		let label = document.getElementById("loginmsg");
		for (let i = 0; i < u.length; i++) {
			if(u[i].userName == uname && u[i].password == password)
			{
				label.textContent = "You have Logged in Successfully";
				label.style.color = "green";
				label.style.display = "block";
				localStorage.setItem('activeUser',uname);
				setTimeout(function(){
		            window.location.href = 'profile.html';
		         }, 1000);
				flag=1;
				break;	
			}
		}
		if (flag == 0)
		{
		label.innerHTML = `* Please enter valid username and password *`;
		label.style.color="red";
		label.style.display="block";
		}
	}
}//login authentication function ends here..........................

//this is for showing notification count ................................
document.getElementById("notification").innerHTML = Number(localStorage.getItem('notifications'));

//function for stop the refreshing page after submitting form data

function onSubmit (e) {
  e.preventDefault();
}