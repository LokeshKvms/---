const apiUrl = "https://sampledev.pythonanywhere.com/api/students/";

const studentForm = document.getElementById("studentForm");
const profileImg = document.getElementById("profileImg");
const formTitle = document.getElementById("formTitle");
const profileImageInput = document.getElementById("profile_image");

const urlParams = new URLSearchParams(window.location.search);
const studentId = urlParams.get("id");

if (studentId) {
  fetch(`${apiUrl}${studentId}/`)
    .then((response) => response.json())
    .then((student) => {
      formTitle.textContent = "Edit Student";
      document.getElementById("first_name").value = student.first_name;
      document.getElementById("last_name").value = student.last_name;
      document.getElementById("email").value = student.email;
      document.getElementById("phone").value = student.phone;
      document.getElementById("dob").value = student.dob;
      document.getElementById("gender").value = student.gender;
      document.getElementById("address").value = student.address;

      if (student.profile) {
        profileImg.src = student.profile;
      }
    });
}

studentForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const studentData = {
    first_name: document.getElementById("first_name").value,
    last_name: document.getElementById("last_name").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
    dob: document.getElementById("dob").value,
    gender: document.getElementById("gender").value,
    address: document.getElementById("address").value,
    profile: getProfileImageName(),
  };

  const formData = new FormData(studentForm);

  const fileInput = document.getElementById("profile_image");
  if (fileInput.files.length > 0) {
    console.log(fileInput.files[0].name); // "file" is the name parameter in the form
  }
  formData.append("profile", fileInput.files[0].name);

  // if (studentId) {
  //   updateStudent(studentId, studentData);
  // } else {
  //   addStudent(studentData);
  // }
});

function getProfileImageName() {
  const file = profileImageInput.files[0];
  if (file) {
    return file.name;
  }
  return "";
}

async function addStudent(studentData) {
  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(studentData),
    });
    if (!response.ok) throw new Error("Failed to add user");
    alert("User added successfully!");
    window.location.href = "index.html";
  } catch (error) {
    alert("Error adding user: " + error.message);
  }
}

async function updateStudent(id, studentData) {
  try {
    const response = await fetch(`${apiUrl}${id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(studentData),
    });
    if (!response.ok) throw new Error("Failed to update user");
    alert("User updated successfully!");
    window.location.href = "index.html";
  } catch (error) {
    alert("Error updating user: " + error.message);
  }
}
