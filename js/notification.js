//doesn't provide access to unauthorized user.......................
if(localStorage.getItem('activeUser') == 'false' || !localStorage.getItem('activeUser'))
{
	document.getElementById('banner-text').innerHTML = "Please Login...";
	document.getElementById('notbox').style.display = 'none';
}

//find todays reminder and show in notification .............................. 
(function notify(){
	let activeUser = localStorage.getItem('activeUser');
	if(activeUser == 'false')
	{
		document.getElementById('notbox').style.display = "none";
		alert("logout");
	}
	else if(!localStorage.getItem("ToDo"))
	{}
	else
	{
		localStorage.setItem('notifications',0);
		let count = Number(localStorage.getItem('notifications'));
		let list = JSON.parse(localStorage.getItem("ToDo"));
		let code = "";
		let flag = 0;
		for (let i = 0; i < list.length; i++) {
			let date = new Date(list[i].reminderDate);
			let current = new Date();
			if(list[i].userName == activeUser && current.getDate() == date.getDate() && current.getMonth() == date.getMonth())
			{
				count= count + 1;
				code+= `<p>Notification ${count}: Today You have to Do: ${list[i].categories}</p>`;
				flag = 1;
			}
		}
		document.getElementById("nlist").innerHTML = code;
		if(flag==1)
			localStorage.setItem('notifications',count);
		else
			localStorage.setItem('notifications',0);
		document.getElementById("notification").innerHTML = count;
		if (count == 0) {
			document.getElementById('nlist').textContent = "No Any reminder For Today.........."
		}
	}
})();// notification function ends here.........................................


// this is for showing the notification count...................................
document.getElementById("notification").innerHTML = Number(localStorage.getItem('notifications'));