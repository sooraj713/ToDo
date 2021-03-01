//Script for profile page ---> automatically called function on page onload.......to show user profile details
(function showDetails()
{
	let userObj={};
	let u = JSON.parse(localStorage.getItem('users'));
	let activeUser = localStorage.getItem('activeUser');
	let flag = false;
	for (var i = 0; i < u.length; i++) {
		if(u[i].userName === activeUser)
		{
			userObj = u[i];
			flag=true;
			break;
		}
	}

	if(flag)
	{	
		document.getElementById('pimg1').src = userObj.image;
		document.getElementById('info').style.display = 'block';
		document.getElementById('fn').textContent = userObj.firstName;
		document.getElementById('ln').textContent = userObj.lastName;
		document.getElementById('un').textContent = userObj.userName;
		document.getElementById('gen').textContent = userObj.gender;
		document.getElementById('add').textContent = userObj.address;
	}
	else
	{
		document.getElementById('info').style.display = 'none';
		window.location.href = "login.html";
	}
})();
// profile display function ends.....................................................

//edit profile function starts here: all values filled automatically..............
function edit(btn){
	document.getElementById("phead").textContent = "Edit Profile";
	document.getElementById("editbtn").style.display = "none";
	document.getElementById("info").style.display = "none";
	document.getElementById('editForm').style.display = 'block';
	//code for auto filll the values in edit form 	
	let list = JSON.parse(localStorage.getItem('users'));
	let activeUser = localStorage.getItem('activeUser');
	for (let i = 0; i < list.length; i++) {
		if(list[i].userName == activeUser)
		{
			document.getElementById('fname').value = list[i].firstName;
			document.getElementById('lname').value = list[i].lastName;
			document.getElementById('address').value = list[i].address;
			if (list[i].gender == "Male")
				document.getElementById('m').checked = true;
			else
				document.getElementById('f').checked = true;	
			document.getElementById('pimg2').src = list[i].image;
		}
	}
}
// edit profile autofield function ends.................................................

//function for converting img into base 64 using File reader..................
var imagebase64 = "";  
  
function encodeImg(element) {  
    var file = element.files[0];  
    var reader = new FileReader();  
    reader.onloadend = function() {  
        imagebase64 = reader.result;  
    }  
    reader.readAsDataURL(file); 
}  

//edit the user profile.....................
function editRecord(element){
	let firstName = document.getElementById("fname").value;
	let lastName = document.getElementById("lname").value;
	let m = document.getElementById("m").checked;
	let f = document.getElementById("f").checked;
	let gender="";
	if(m)
		gender = 'Male';
	if(f)
		gender = 'Female';
	let address = document.getElementById("address").value;

	if (firstName == "" || !firstName.trim() || lastName =="" || !lastName.trim() || gender == "" || address == "" || !address.trim()){
		let label = document.getElementById("alertmsg");
		label.innerHTML = "*Please Enter All Details*";
	}
	else{
		
		let updatedObj;
		let u = JSON.parse(localStorage.getItem('users'));
		let activeUser = localStorage.getItem('activeUser');
		for (var i = 0; i < u.length; i++) {
			if(u[i].userName == activeUser)
			{
				u[i].firstName = firstName;
				u[i].lastName = lastName;
				u[i].gender = gender;
				u[i].address = address;
				if (imagebase64 != "")
				u[i].image = imagebase64;
				break;
			}
		}
			
		localStorage.setItem('users', JSON.stringify(u));
		let label = document.getElementById("alertmsg");
		label.innerHTML = `* ${firstName} your profile is updated Successfully*`;
		label.style.color = 'green';
		window.location.reload();
}
}//edit ends....................

//this is for showing notification count................................
document.getElementById("notification").innerHTML = Number(localStorage.getItem('notifications'));
