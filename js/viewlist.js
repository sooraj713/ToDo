//doesn't provide access to unauthorized user.......................
if(localStorage.getItem('activeUser') == 'false' || !localStorage.getItem('activeUser'))
{
	document.getElementById('info').style.display = 'none';
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


// declare and initiallize a public array of id's................................
var aId = [];
function doOperation(check)
{
	if(!aId.includes(Number(check.value)) && check.checked)
	{
		aId.push(Number(check.value));
		console.log(aId);
	}
	else
	{
		let index = aId.indexOf(Number(check.value)); //if checkbox is unchecked then remove that specific id from aId array..
		console.log(index);
		aId.splice(index);
		console.log(aId)
	}
}


let sort;
//Immidiate Invoked function for show list.......................................
(function showList(){
	if (!localStorage.getItem('sort')) {
		sort={
			sbdd : "ar.png",
			sbc : "ar.png",
			sbrd : "ar.png"
		}	
		localStorage.setItem('sort',JSON.stringify(sort))
	}
	else
		sort = JSON.parse(localStorage.getItem('sort'));

	if (!localStorage.getItem('ToDo')) {}else{
	let activeUser = localStorage.getItem('activeUser');
	let list = JSON.parse(localStorage.getItem('ToDo'));
	let flag = 1;
	let code = `<tr><th></th><th>Due Date<img id="sbdd" src="images/${sort.sbdd}" alt="categories" class="arrow-down" onclick="sortListByDueDate()"></th><th>Category<img id="sbc" src="images/${sort.sbc}" alt="categories" class="arrow-down" onclick="sortListByCategory()"></th><th>Status</th><th>Public</th><th>Reminder Date</th><th>Reminder Date <img id="sbrd" src="images/${sort.sbrd}" alt="categories" class="arrow-down" onclick="sortListByRemDate()"></th><th>Image</th></tr>`;
	for (var i = 0; i < list.length; i++) {
		if (list[i].userName == activeUser) {
			flag = 1;
			code += `<tr>
						<td><input type="checkbox" id='${list[i].id}' value="${list[i].id}" onchange="doOperation(this)"></td>
						<td>${list[i].date}</td>
						<td>${list[i].categories}</td>
						<td>${list[i].isMarkAsDone}</td>
						<td>${list[i].isPublic}</td>
						<td>${list[i].isSetReminder}</td>
						<td>${list[i].reminderDate}</td>
						<td><img src=${list[i].image}></td>
						</tr>`;
					}
		document.getElementById("listRecord").innerHTML = code;
	}
	

	if (localStorage.getItem('activeUser') === 'false' || flag != 1) {
		console.log('falseeeeeeeeeee');

		document.getElementById('profileHeading').innerHTML = "Please Login...";
		document.getElementById('info').style.display = "none";
		document.getElementById('editlistform').style.display = "none";
		document.getElementById('deletelistform').style.display = "none";
		document.getElementById('searchform').style.display = "none";
	}
	else{
		document.getElementById('info').style.display = "block";
		// document.getElementById('edit').style.display = "none";
	}
}})();



// function for edit list......................................
function editListForm(){
	//code for auto filll the values in edit form 
	document.getElementById('filter-box').style.display="none";		
	let list = JSON.parse(localStorage.getItem('ToDo'));
	let activeUser = localStorage.getItem('activeUser');
	for (let i = 0; i < list.length; i++) {
		let id = aId[0];
		if(list[i].userName == activeUser && list[i].id == id)
		{
			document.getElementById('edate').value = list[i].date;
			document.getElementById('eecat').value = list[i].categories;
			document.getElementById('eisR').value = list[i].isSetReminder;
			if (list[i].isPublic == "Public")
				document.getElementById('eispYes').checked = true;
			else
				document.getElementById('eispNo').checked = true;
			if(list[i].isMarkAsDone == "Done")
				document.getElementById('emad').checked = true;
			if(list[i].isSetReminder == "Present")
			{

				document.getElementById('eremDate').style.display = "block";
				document.getElementById('erdate').value = list[i].reminderDate;
				document.getElementById('eisR').value = "Present";

			}
			else
			{
				document.getElementById('eremDate').style.display = "none";
				document.getElementById('eisR').value = "No";
			}
			document.getElementById('preview').src = list[i].image;
		}
	}


	// here aId is global array in which we stored id's of selected checkbox.
	if(aId.length > 1 || aId.length < 1) 
	{
		document.getElementById('editlistform').style.display = "none";
		document.getElementById('msgbox').style.display = "block";
		let label = document.getElementById("msgbox");
		label.innerHTML = "*Please select single record to edit..*";	
		label.style.color = "red";
	}
	else
	{
		document.getElementById('msgbox').style.display = "none";
		document.getElementById('editlistform').style.display = "block";
	}
	
	document.getElementById('searchform').style.display = "none";
	// document.getElementById('data').style.display = "none";
}



//function for delete multiple or single items from list...................................
function deleteListForm(){
	let label = document.getElementById("msgbox");
	if(aId.length < 1)
	{
		label.style.display = "block";
		label.innerHTML = "*Please select any record to delete..*";	
		label.style.color = "red";
	}
	else
	{
		label.style.display = "none";
		document.getElementById('searchform').style.display = "none";
		// document.getElementById('data').style.display = "none";
		let flag = 0;
		let list = JSON.parse(localStorage.getItem('ToDo'));
		let activeUser = localStorage.getItem("activeUser");
		for (let i = 0; i < aId.length; i++) {
			let id = aId[i];
			for (let j = 0; j < list.length; j++) {
				if(Number(list[j].id) == Number(id))
				{
					list.splice(j,1);
					flag = 1;
					console.log("aid = ",id, " ", aId)
					break;
				}
			}
		}

		if(flag == 1)
		{
			label.style.display = "block";
			label.innerHTML = "List Deleted Successfully..";
			localStorage.setItem('ToDo', JSON.stringify(list));
			window.location.reload();
		}
		else
			label.innerHTML = "Something went wrong...please try again...";
	}
}


//function for display search form item in todo list.....................
function searchListForm(){
	let sbType = document.getElementById('scat').value;
	document.getElementById('filter-box').style.display="none";	
	if (sbType == 'dueDate') {
		document.getElementById('sbdate').style.display = "block";
	}
	document.getElementById('editlistform').style.display = "none";
	document.getElementById('searchform').style.display = "block";
}


//function for Search the list by using dueDate field...................................
function searchListByDate(){
	let list = JSON.parse(localStorage.getItem('ToDo'));
	let activeUser = localStorage.getItem('activeUser');
	let date = document.getElementById("sdate").value;
	let flag=0;
	let code = `<tr><th></th><th>Due Date<img id="sbdd" src="images/${sort.sbdd}" alt="categories" class="arrow-down" onclick="sortListByDueDate()"></th><th>Category<img id="sbc" src="images/${sort.sbc}" alt="categories" class="arrow-down" onclick="sortListByCategory()"></th><th>Status</th><th>Public</th><th>Reminder Date</th><th>Reminder Date <img id="sbrd" src="images/${sort.sbrd}" alt="categories" class="arrow-down" onclick="sortListByRemDate()"></th><th>Image</th></tr>`;
	for (var i = 0; i < list.length; i++) {
		if (list[i].userName == activeUser && list[i].date == date) {
			flag=1;
			code += `<tr>
						<td><input type="checkbox" id='${list[i].id}' value="${list[i].id}" onchange="doOperation(this)"></td>
						<td>${list[i].date}</td>
						<td>${list[i].categories}</td>
						<td>${list[i].isMarkAsDone}</td>
						<td>${list[i].isPublic}</td>
						<td>${list[i].isSetReminder}</td>
						<td>${list[i].reminderDate}</td>
						<td><img src=${list[i].image}></td></tr>`;
		}
		if(flag==0)
		{
			let  msg = document.getElementById("msgbox");
			msg.style.display = "block";
			msg.style.color = "red";
			msg.textContent = "No record Present..";
		}
		document.getElementById("listRecord").innerHTML = code;
	}
}


//function for sort the list by category...................................
function sortListByCategory()
{
	
	let list = JSON.parse(localStorage.getItem('ToDo'));
	let activeUser = localStorage.getItem("activeUser");
	console.log("before: ", list);
	let sort = JSON.parse(localStorage.getItem('sort'));
	if (sort.sbc == 'ar.png')
	{
		sort.sbc = 'arrow_down.png';
		localStorage.setItem('sort',JSON.stringify(sort))
		list.sort((a,b)=> {
			let fa = a.categories.toLowerCase(),fb = b.categories.toLowerCase();
			if (fa < fb) {
	        return -1;
	    	}
		    if (fa > fb) {
		        return 1;
		    }
		    return 0;
		});
	}
	else
	{
		sort.sbc = 'ar.png';
		localStorage.setItem('sort',JSON.stringify(sort))
		list.sort((a,b)=> {
			let fa = a.categories.toLowerCase(),fb = b.categories.toLowerCase();
			if (fa > fb) {
	        return -1;
	    	}
		    if (fa < fb) {
		        return 1;
		    }
		    return 0;
		});
	}
	localStorage.setItem('ToDo',JSON.stringify(list));
	window.location.reload();
}

//function for sort the list by Due date...................................
function sortListByDueDate()
{
	let list = JSON.parse(localStorage.getItem('ToDo'));
	let activeUser = localStorage.getItem("activeUser");
	let sort = JSON.parse(localStorage.getItem('sort'));
	if (sort.sbdd == 'ar.png') {
		sort.sbdd = 'arrow_down.png';
		localStorage.setItem('sort',JSON.stringify(sort))
		list.sort((a,b)=> {
			let fa = a.date.toLowerCase(),fb = b.date.toLowerCase();
			if (fa < fb) {
	        return -1;
	    	}
		    if (fa > fb) {
		        return 1;
		    }
		    return 0;
		});
	}
	else
	{
		sort.sbdd = 'ar.png';
		localStorage.setItem('sort',JSON.stringify(sort))
		list.sort((a,b)=> {
			let fa = a.date.toLowerCase(),fb = b.date.toLowerCase();
			if (fa > fb) {
	        return -1;
	    	}
		    if (fa < fb) {
		        return 1;
		    }
		    return 0;
		});
	}
	localStorage.setItem('ToDo',JSON.stringify(list));
	window.location.reload();
}

//function for sort the list by Reminder Date...................................
function sortListByRemDate()
{
	let list = JSON.parse(localStorage.getItem('ToDo'));
	let activeUser = localStorage.getItem("activeUser");
	let sort = JSON.parse(localStorage.getItem('sort'));
	if (sort.sbrd == 'ar.png') {
		sort.sbrd = 'arrow_down.png';
		localStorage.setItem('sort',JSON.stringify(sort))
		list.sort((a,b)=> {
			let fa = a.reminderDate.toLowerCase(),fb = b.reminderDate.toLowerCase();
			if (fa < fb) {
	        return -1;
	    	}
		    if (fa > fb) {
		        return 1;
		    }
		    return 0;
		});
	}
	else
	{
		sort.sbrd = "ar.png"
		localStorage.setItem('sort',JSON.stringify(sort))
		list.sort((a,b)=> {
			let fa = a.reminderDate.toLowerCase(),fb = b.reminderDate.toLowerCase();
			if (fa > fb) {
	        return -1;
	    	}
		    if (fa < fb) {
		        return 1;
		    }
		    return 0;
		});
	}
	localStorage.setItem('ToDo',JSON.stringify(list));
	window.location.reload();
}



//function for edit the list values single and multiple both...................................
function editList(){
	let list = JSON.parse(localStorage.getItem('ToDo'));
	let activeUser = localStorage.getItem('activeUser');
	let label = document.getElementById("alertmsg");
	let current = new Date();
	let date = document.getElementById('edate').value;
	let ecat = document.getElementById('eecat').value;
	let id = aId[0];
	let mAsDone;
	if(document.getElementById('emad').checked)
	{
		mAsDone = 'Done';
	}
	else
		mAsDone = "Pending";
	let isr = document.getElementById("eisR").value;
	let rDate = document.getElementById('erdate').value;
	if(isr == "No" || rDate == "")
	{
		rDate = 'Not Set';
		isr="Not Set";
	}

	let ispYes = document.getElementById('eispYes').checked;
	let ispNo = document.getElementById('eispNo').checked;
	let isp;
	if (ispYes) 
		isp = "Public";
	else if(ispNo)
	{
		isp = "Not Public";
	}
	else
		isp = "";

	let DD = new Date(date);
	let CD = new Date();
	let RD = new Date(rDate);
	if (DD < CD) {
		label.textContent = "Due date should be greater than current date..";
		label.style.display = "red";
	}
	else if(RD > DD || RD < CD)
	{       
		label.textContent = "Reminder date should be less than due date or greater than current date..";
		label.style.display = "red";
	}
	else
	{
		let flag = 0;
		for (var i = 0; i < list.length; i++) {
		 	if(list[i].id == id)
		 	{
		 		list[i].date = date;
				list[i].categories = ecat;
				list[i].isMarkAsDone = mAsDone;
				list[i].isSetReminder =  isr;
				list[i].reminderDate = rDate;
				list[i].isPublic = isp;
				if(imagebase64 != "")
				list[i].image = imagebase64
				flag = 1;
				break;
		 	}
		 }

		label = document.getElementById('alertmsg');
		if (flag == 1) {
			localStorage.setItem('ToDo',JSON.stringify(list));
			
			label.textContent = `--List is updated Successfully...`;
			label.style.color = "green";
			window.location.reload()
		}
		else
		{
			label.textContent = `--List does not exist to edit...`;
			label.style.color = "green";
		}
	}
}

document.getElementById('eremDate').style.display = "none";
function setRem(){

	if(document.getElementById("eisR").value == "Present")
	{
		document.getElementById('eremDate').style.display = "block";
	}
	else
	{
		document.getElementById('eremDate').style.display = "none";	
	}
}



//function for Filter the list by Status...................................
function filterByStatus(isDone)
{
	let list = JSON.parse(localStorage.getItem('ToDo'));
	let activeUser = localStorage.getItem('activeUser');
	let msg = document.getElementById('alertbox');
	let flag=0;
	let code = `<tr><th></th><th>Due Date<img id="sbdd" src="images/${sort.sbdd}" alt="categories" class="arrow-down" onclick="sortListByDueDate()"></th><th>Category<img id="sbc" src="images/${sort.sbc}" alt="categories" class="arrow-down" onclick="sortListByCategory()"></th><th>Status</th><th>Public</th><th>Reminder Date</th><th>Reminder Date <img id="sbrd" src="images/${sort.sbrd}" alt="categories" class="arrow-down" onclick="sortListByRemDate()"></th><th>Image</th></tr>`;
	for (var i = 0; i < list.length; i++) {
		if(list[i].userName == activeUser && list[i].isMarkAsDone == isDone.value)
		{
			flag=1;
			code += `<tr>
						<td><input type="checkbox" id='${list[i].id}' value="${list[i].id}" onchange="doOperation(this)"></td>
						<td>${list[i].date}</td>
						<td>${list[i].categories}</td>
						<td>${list[i].isMarkAsDone}</td>
						<td>${list[i].isPublic}</td>
						<td>${list[i].isSetReminder}</td>
						<td>${list[i].reminderDate}</td>
						<td><img src=${list[i].image}></td></tr>`;
		}

	}
	if (flag==0) {
		msg.style.display = "block";
		msg.style.color = "red";
		msg.textContent = "No record Present..";
	}
	document.getElementById("listRecord").innerHTML = code;
}


//function for filter the list by Date range...................................
function filterByDate()
{
	let list = JSON.parse(localStorage.getItem('ToDo'));
	let activeUser = localStorage.getItem('activeUser');
	let df = new Date(document.getElementById('dateFrom').value);
	let dt = new Date(document.getElementById('dateTo').value);
	let code = `<tr><th></th><th>Due Date<img id="sbdd" src="images/${sort.sbdd}" alt="categories" class="arrow-down" onclick="sortListByDueDate()"></th><th>Category<img id="sbc" src="images/${sort.sbc}" alt="categories" class="arrow-down" onclick="sortListByCategory()"></th><th>Status</th><th>Public</th><th>Reminder Date</th><th>Reminder Date <img id="sbrd" src="images/${sort.sbrd}" alt="categories" class="arrow-down" onclick="sortListByRemDate()"></th><th>Image</th></tr>`;
	let msg = document.getElementById('alertbox');
	msg.style.display = "none";
	let DF = new Date(df);
	let DT = new Date(dt);
	let flag=0;
	if (DT < DF) {
		msg.style.display = "block";
		msg.textContent = "To date cannot less than From Date";
		msg.style.color = "red";
	}
	else{
	for (var i = 0; i < list.length; i++) {
		let listdate = new Date(list[i].date)
		if(list[i].userName == activeUser && listdate.getTime() >= df.getTime() && listdate.getTime() <= dt.getTime())
		{
			flag=1;
			code += `<tr>
						<td><input type="checkbox" id='${list[i].id}' value="${list[i].id}" onchange="doOperation(this)"></td>
						<td>${list[i].date}</td>
						<td>${list[i].categories}</td>
						<td>${list[i].isMarkAsDone}</td>
						<td>${list[i].isPublic}</td>
						<td>${list[i].isSetReminder}</td>
						<td>${list[i].reminderDate}</td>
						<td><img src=${list[i].image}></td></tr>`;		
		}
	}
	if (flag == 0) {
		msg.style.display = "block";
		msg.textContent="No recors found.."}

	document.getElementById("listRecord").innerHTML = code;
}
}



//function for filter the list by category...............................................................
function filterByCategory(cat)
{
	let list = JSON.parse(localStorage.getItem('ToDo'));
	let activeUser = localStorage.getItem('activeUser');
	let msg = document.getElementById('alertbox');
	let code = `<tr><th></th><th>Due Date<img id="sbdd" src="images/${sort.sbdd}" alt="categories" class="arrow-down" onclick="sortListByDueDate()"></th><th>Category<img id="sbc" src="images/${sort.sbc}" alt="categories" class="arrow-down" onclick="sortListByCategory()"></th><th>Status</th><th>Public</th><th>Reminder Date</th><th>Reminder Date <img id="sbrd" src="images/${sort.sbrd}" alt="categories" class="arrow-down" onclick="sortListByRemDate()"></th><th>Image</th></tr>`;
	let flag = 0;
	for (var i = 0; i < list.length; i++) {
		if(list[i].userName == activeUser && list[i].categories == cat.value)
		{
			
			code += `<tr>
						<td><input type="checkbox" id='${list[i].id}' value="${list[i].id}" onchange="doOperation(this)"></td>
						<td>${list[i].date}</td>
						<td>${list[i].categories}</td>
						<td>${list[i].isMarkAsDone}</td>
						<td>${list[i].isPublic}</td>
						<td>${list[i].isSetReminder}</td>
						<td>${list[i].reminderDate}</td>
						<td><img src=${list[i].image}></td></tr>`;
					msg.style.display = "none";
					flag = 1;
		}
	}

	if(flag == 0)
	{
		msg.textContent = "No Record present..";
		msg.style.display = "block";
		msg.style.color = "red";
	}
	document.getElementById("listRecord").innerHTML = code;
}




//function for deciding filter...................................
function filter(element)
{
	if (element.value == 'isDone') {
		document.getElementById('byisd').style.display = 'block';
		document.getElementById('bydate').style.display = 'none';
		document.getElementById('fbcat').style.display = 'none';
	}
	else{

		document.getElementById('byisd').style.display = 'none';
		document.getElementById('bydate').style.display = 'block';
		document.getElementById('fbcat').style.display = 'none';
	}

	if (element.value == 'select') {
		document.getElementById('byisd').style.display = 'none';
		document.getElementById('bydate').style.display = 'none';
		document.getElementById('fbcat').style.display = 'none';
	}

	if (element.value == 'category') {
		document.getElementById('byisd').style.display = 'none';
		document.getElementById('bydate').style.display = 'none';
		document.getElementById('fbcat').style.display = 'block';
	}
}

//function for reset the filter by refreshing page/...........................
function reset()
{
	window.location.reload();
}

//this line is for showing notification count.................................
document.getElementById("notification").innerHTML = Number(localStorage.getItem('notifications'));
