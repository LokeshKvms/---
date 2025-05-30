const apiUrl = "https://sampledev.pythonanywhere.com/api/students/";
let students = [];
let filteredStudents = [];
let currentPage = 1;
const rowsPerPage = 3;

let sortOrder = {
  name: "ascending",
  email: "ascending",
  phone: "ascending",
};

const tableBody = document.querySelector("#studentTable tbody");

async function fetchStudents() {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error("Failed to fetch student data");
    students = await response.json();
    displayStudents();
  } catch (error) {
    document.getElementById("error-message").textContent = error.message;
    document.getElementById("error-message").style.display = "block";
  }
}

function displayStudents() {
  const dataToDisplay = filteredStudents.length ? filteredStudents : students;

  if (dataToDisplay.length === 0) {
    tableBody.innerHTML = "<tr><td colspan='8'>No students found</td></tr>";
    updatePagination(0);
    updateStudentCount(0);
  } else {
    const start = (currentPage - 1) * rowsPerPage;
    const paginated = dataToDisplay.slice(start, start + rowsPerPage);

    tableBody.innerHTML = "";

    paginated.forEach((student, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
                <td>${start + index + 1}</td> <!-- Serial number -->
                <td>${student.first_name} ${student.last_name}</td>
                <td>${student.email}</td>
                <td>${student.phone}</td>
                <td>${student.dob}</td>
                <td>${student.gender}</td>
                <td>${student.address}</td>
                <td>
                    <a href="addEditUser.html?id=${
                      student.id
                    }" class="btn btn-warning btn-sm mb-1 mt-0">Edit</a>
                    <button onclick="deleteStudent(${
                      student.id
                    })" class="btn btn-danger btn-sm m-1 mb-0">Delete</button>
                </td>
            `;
      tableBody.appendChild(row);
    });

    updatePagination(dataToDisplay.length);
    updateStudentCount(dataToDisplay.length);
  }
}

function updatePagination(totalItems) {
  const pagination = document.getElementById("pagination");
  pagination.innerHTML = "";

  if (totalItems > 3) {
    const totalPages = Math.ceil(totalItems / rowsPerPage);

    for (let i = 1; i <= totalPages; i++) {
      const li = document.createElement("li");
      li.className = "page-item" + (i === currentPage ? " active" : "");
      li.innerHTML = `<a class="page-link" href="#">${i}</a>`;
      li.addEventListener("click", () => {
        currentPage = i;
        displayStudents();
      });
      pagination.appendChild(li);
    }
  }
}

function updateStudentCount(total) {
  const start = (currentPage - 1) * rowsPerPage + 1;
  const end = Math.min(currentPage * rowsPerPage, total);
  document.getElementById(
    "studentCount"
  ).textContent = `Showing ${start}–${end} of ${total}`;
}

function sortStudents(field) {
  const fieldMap = {
    name: (s) => `${s.first_name} ${s.last_name}`,
    email: (s) => s.email,
    phone: (s) => s.phone,
  };

  sortOrder[field] =
    sortOrder[field] === "ascending" ? "descending" : "ascending";

  students.sort((a, b) => {
    const valA = fieldMap[field](a).toLowerCase();
    const valB = fieldMap[field](b).toLowerCase();
    return sortOrder[field] === "ascending"
      ? valA.localeCompare(valB)
      : valB.localeCompare(valA);
  });

  updateSortIcons(field);
  displayStudents();
}

function updateSortIcons(field) {
  document
    .querySelectorAll("th span")
    .forEach((span) => (span.textContent = ""));
  const icon = sortOrder[field] === "ascending" ? "▲" : "▼";
  document.getElementById(field + "SortOrder").textContent = icon;
}

document.getElementById("searchBox").addEventListener("input", (e) => {
  const term = e.target.value.toLowerCase();

  if (term.length === 0) {
    filteredStudents = [];
  } else {
    filteredStudents = students.filter(
      (s) =>
        s.first_name.toLowerCase().includes(term) ||
        s.last_name.toLowerCase().includes(term) ||
        s.email.toLowerCase().includes(term) ||
        s.phone.includes(term)
    );
  }

  if (filteredStudents.length === 0 && term.length > 0) {
    tableBody.innerHTML = "<tr><td colspan='8'>No students found</td></tr>";
    updatePagination(0);
    updateStudentCount(0);
  } else {
    currentPage = 1;
    displayStudents();
  }
});

document.getElementById("clearSearch").addEventListener("click", () => {
  document.getElementById("searchBox").value = "";
  filteredStudents = [];
  currentPage = 1;
  displayStudents();
});

async function deleteStudent(id) {
  if (confirm("Are you sure you want to delete this student?")) {
    try {
      const response = await fetch(`${apiUrl}${id}/`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete student");
      alert("Student deleted successfully!");
      fetchStudents(); 
    } catch (error) {
      alert("Error deleting student: " + error.message);
    }
  }
}

window.addEventListener("DOMContentLoaded", () => {
  fetchStudents();
});
