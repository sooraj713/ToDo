	//doesn't provide access to unauthorized user.......................
	if(localStorage.getItem('activeUser') == 'false' || !localStorage.getItem('activeUser'))
	{
		document.getElementById('addform').style.display = 'none';
		window.location.href = "login.html";
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
		let label = document.getElementById("alertmsg");
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
			label.innerHTML = "*Date is Mandatory*";
		}
		else if(cat == 'None')
		{
			label.innerHTML = "*Please select any one category*";
		}
		else if(rd < current)
		{
			label.textContent = "Reminder range should be from today onwards..";
			label.style.color = "red";
		}
		else if(dueDate < current)
		{
			label.textContent = "Due Date should be from today onwards..";
			label.style.color = "red";
		}
		else if (ispYes == false && ispNo == false)
		{
			label.textContent = "Please select ispublic status..";
			label.style.color = "red";
		}
		else if (isr == "Present" && document.getElementById("rdate").value == "")
		{
			label.textContent = "Please enter the reminder date..";
			label.style.color = "red";
		}
		else if(rd>dueDate || rd<current)
		{
			label.textContent = "Reminder date should be before due Date..";
			label.style.color = "red";
		}
		else if (document.getElementById("dimg").value == "")
		{
			label.textContent = "*Please upload image..";
			label.style.color = "red";
		}
		else
		{

			let activeuser = localStorage.getItem('activeUser');
			console.log(isr);
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
			label.textContent = `List is Added Successfully...`;
			label.style.color = "green";
			setTimeout(function(){
		            window.location.href = 'viewlist.html';
		         }, 1000);
		}
		return false;
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