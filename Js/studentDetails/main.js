function loadStudentData() {
	let students = JSON.parse(localStorage.getItem("students")) || [];
	const tableBody = document.getElementById("studentTableBody");

	students.forEach((student, index) => {
		const row = document.createElement("tr");
		row.innerHTML = `
			<th scope="row">${index + 1}</th>

			<td>${student.fname || "---"}</td>
			
			<td>${student.mname || "---"}</td>

			<td>${student.lname || "---"}</td>

			<td>${student.email || "---"}</td>

			<td>${student.phone || "---"}</td>

			<td>${student.gender || "---"}</td>

			<td>${student.dob || "---"}</td>

			<td>${student.address || "---"}</td>

			<td>${student.nationality || "---"}</td>

			<td>${student.emergencyContact || "---"}</td>

			
			<td>${student.emergencyPhone || "---"}</td>
`;
		tableBody.appendChild(row);
	});
}

document
	.getElementById("studentForm")
	.addEventListener("submit", function (event) {
		
		const student = {
			fname: document.getElementById("fname").value,
			mname: document.getElementById("mname").value,
			lname: document.getElementById("lname").value,
			email: document.getElementById("email").value,
			phone: document.getElementById("phn").value,
			gender: document.querySelector('input[name="gend"]:checked')?.id || "",
			dob: document.getElementById("dob").value,
			address: document.getElementById("address").value,
			nationality: document.getElementById("nationality").value,
			emergencyContact: document.getElementById("emergencyContact").value,
			emergencyPhone: document.getElementById("emergencyPhone").value,
		};

		let students = JSON.parse(localStorage.getItem("students")) || [];
		
		students.push(student);
		
		localStorage.setItem("students", JSON.stringify(students));
		
		document.getElementById("studentForm").reset();
		
		document.getElementById("studentTableBody").innerHTML = "";
		loadStudentData();
		event.preventDefault();
	});

window.onload = loadStudentData;
