//doesn't provide access to unauthorized user.......................
if(localStorage.getItem('activeUser') == 'false' || !localStorage.getItem('activeUser'))
{
	document.getElementById('btext').innerHTML = "Please Login...";
	document.getElementById('addform').style.display = 'none';
}


//for converting image into base63 and storing it in localStorage..................
var imagebase64 = "";   
function encodeImg(element) {  
    var file = element.files[0];  
    var reader = new FileReader();  
    reader.onloadend = function() {  
        imagebase64 = reader.result;  
    }  
    reader.readAsDataURL(file); 
}  



// set reminder alert .....................................................
function setRem(){
	if(document.getElementById("isR").value == "Present")
	{
		document.getElementById('remDate').style.display = "block";
	}
	else
	{
		document.getElementById('remDate').style.display = "none";	
	}
}



// insert the todo list...........................................................................
function insertList(){
	//initially if tid is not set then set it to value 1
	if(!localStorage.getItem('tid'))
	{
		let id = 1;
		localStorage.setItem('tid', JSON.stringify(id));
	}
	

	let tid = JSON.parse(localStorage.getItem('tid'))+1;
	localStorage.setItem('tid',tid);
	let date = document.getElementById('date').value;
	let dueDate = new Date(date);
	// let categories = document.querySelectorAll('input[name="Do"]:checked');
	let cat = document.getElementById('cat').value;
	
	let rd = new Date(document.getElementById('rdate').value);
	let current = new Date();
	mAsDone = "Pending";

	let rDate = document.getElementById('rdate').value;
	if(rDate == "")
		rDate = 'Not Set';
	let isr = document.getElementById("isR").value;
	let ispYes = document.getElementById('ispYes').checked;
	let ispNo = document.getElementById('ispNo').checked;
	let isp;
	if (ispYes) 
		isp = "Public";
	else if(ispNo)
	{
		isp = "Not Public";
	}
	else
		isp = "Not Public";

	if (date == ""){
		let label = document.getElementById("alertmsg");
		label.innerHTML = "*Date is Mandatory*";
	}
	else if(cat == 'None')
	{
		let label = document.getElementById("alertmsg");
		label.innerHTML = "*Please select any one category*";
	}
	else if(current.getDate() > rd.getDate() && current.getMonth() >= rd.getMonth())
	{
		let msg = document.getElementById("alertmsg");
		msg.textContent = "**Reminder range should be from today onwards..";
		msg.style.color = "red";
	}
	else if(rd.getDate() > dueDate.getDate() && rd.getMonth() >= dueDate.getMonth())
	{
		let msg = document.getElementById("alertmsg");
		msg.textContent = "**Reminder date should be before due Date..";
		msg.style.color = "red";
	}
	else if(current.getDate() > dueDate.getDate() && current.getMonth() >= dueDate.getMonth())
	{
		let msg = document.getElementById("alertmsg");
		msg.textContent = "** Due Date should be from today onwards..";
		msg.style.color = "red";
	}
	else
	{

		let activeuser = localStorage.getItem('activeUser');
		console.log(activeuser);
		if (!localStorage.getItem('ToDo')) {
			localStorage.setItem('ToDo',JSON.stringify([]));
		}

		let list = {
			id : tid,
			userName : activeuser,
			date : date,
			categories : cat,
			isMarkAsDone : mAsDone,
			isSetReminder :  isr,
			reminderDate : rDate,
			isPublic : isp,
			image : imagebase64
		}

		// after inserting record again store list array into localStorage
		let toDoList = JSON.parse(localStorage.getItem('ToDo'));
		toDoList.push(list);
		localStorage.setItem('ToDo', JSON.stringify(toDoList));
		let label = document.getElementById('alertmsg');
		label.textContent = `--List is Added Successfully...`;
		label.style.color = "green";
		document.getElementById('link').href = 'viewlist.html';
	}
}



//Function for date validation.............................
function dateValid(date){
	let current = new Date();
	let tdate = new Date(date.value);

	if(current.getDate() > tdate.getDate() && current.getMonth() > tdate.getMonth())
	{
		console.log("hii");
	}

}

//this is for showing the notification count .....................................................
document.getElementById("notification").innerHTML = Number(localStorage.getItem('notifications'));