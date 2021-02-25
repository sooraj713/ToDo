//Immidiate invoked function for login and logout status update
(function checkStatus()
{
	if (localStorage.getItem('activeUser') == 'false' || (!localStorage.getItem('activeUser'))) {
		console.log('falseeeeeeeeeee');
		document.getElementById('loginStatus').innerHTML = "Login";
		document.getElementById('profile').style.display = "none";
		document.getElementById('addlist').style.display = "none";
		document.getElementById('viewlist').style.display = "none";
		document.getElementById("notify").style.display = 'none';
	}
	else if(window.location.href.length == 71 && localStorage.getItem('activeUser') != 'false')
	{
		document.getElementById('rform').style.display = "none";
		document.getElementById('loginStatus').textContent = "Logout";
	}
	else{
		console.log('trueeeeeeeeeeee');
		document.getElementById('loginStatus').textContent = "Logout";
	}
})();


//function for logout logout--> set activeUser value to false.............
function logOut(){
	localStorage.setItem('activeUser','false');
}

//this is function for set reminder status and notifications.......................
(function notification(){
	let activeUser = localStorage.getItem('activeUser');
	if(activeUser == 'false' || !localStorage.getItem("ToDo"))
	{
	}
	else
	{
		localStorage.setItem('notifications',0);
		let count = Number(localStorage.getItem('notifications'));
		if (true) {}
		let list = JSON.parse(localStorage.getItem("ToDo"));
		let code = "";
		let flag = 0;
		for (let i = 0; i < list.length; i++) {
			let date = new Date(list[i].reminderDate);
			let current = new Date();
			if(list[i].userName == activeUser && current.getDate() == date.getDate() && current.getMonth() == date.getMonth())
			{
				count= count + 1;
				flag = 1;
			}
		}
		if(flag==1)
			localStorage.setItem('notifications',count);
		else
			localStorage.setItem('notifications',0);
		document.getElementById("notification").innerHTML = count;
	}
})();
//notification ends here........................
