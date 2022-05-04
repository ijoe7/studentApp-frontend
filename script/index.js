
// document.getElementById("student").addEventListener("click", displayStudents);

// const { default: axios } = require("axios");
let studentData;

// window.onload = displayStudents;
async function displayStudents() {
  const response = await axios.get(
    "https://moringa-student-app.herokuapp.com/api/student/getAllStudents"
  );
  const students = response.data.data;
    console.log(students);
    let id = "allstudents"
  let allstudents = document.getElementById(id);
    removeElements(id);
    if (students.length === 0) {
        let noStudents = document.createElement("p");
        noStudents.innerHTML = "No students found";
        allstudents.appendChild(noStudents);
        allstudents.style.display = "block";
    }
    students.forEach((student) => {
        let studentInfo = document.createElement("div");
        let studentName = document.createElement("button");
        let studentId = document.createElement("span");
        // let iconDiv = document.createElement("div");
        let updatePage = document.createElement("a");
        let updateIcon = document.createElement("i");
        let deleteIcon = document.createElement("i");
        updateIcon.setAttribute("class", "fa fa-pen");
      deleteIcon.setAttribute("class", "fa fa-trash");
      updateIcon.style.cursor = "pointer";
      deleteIcon.style.cursor = "pointer";
        updateIcon.value = student._id;
        deleteIcon.value = student._id;
        updateIcon.setAttribute("id", `${student.firstName}_${student.lastName}_update`);
        // updatePage.setAttribute("href", "./updateStudent.html");
        // updatePage.setAttribute("target", "_blank");
        deleteIcon.setAttribute("id", `${student.firstName}_${student.lastName}_delete`);
        studentName.setAttribute("id", student._id);
        studentName.innerHTML = student.firstName + " " + student.lastName;
        studentName.style.cursor = "pointer";
        studentName.style.textTransform = "capitalize";
        studentId.value = student._id;
        studentId.innerHTML = ": " + student._id;
        // updateIcon.innerHTML = "Update";
        updateIcon.style.cursor = "pointer";
        studentName.appendChild(studentId);
        studentInfo.appendChild(studentName);
        allstudents.appendChild(studentInfo);
        updatePage.appendChild(updateIcon);
        updatePage.appendChild(deleteIcon);
        studentInfo.appendChild(updatePage);
        document.getElementById(student._id).addEventListener("click", getStudent);
      document.getElementById(`${student.firstName}_${student.lastName}_update`).addEventListener("click", updateStudent);
      document.getElementById(`${student.firstName}_${student.lastName}_delete`).addEventListener("click", deleteStudent);
        // document.getElementById(student._id).addEventListener("click", getStudent);
      
        allstudents.style.display = "block";
    });
}

async function getStudent(e) {
  let pid = e.target.id;
  let sid = e.target.value;
  let studentId;
  if (!pid) {
    studentId = sid;
  } else {
    studentId = pid;
    }
    console.log(studentId);
    const response = await axios.get(
        `https://moringa-student-app.herokuapp.com/api/student/getStudent/${studentId}`
    );
    const studentInfo = response.data.data;
    let id = "eachStudent"
    let eachStudent = document.getElementById(id);
    let studentName = document.createElement("p");
    let studentAge = document.createElement("p");
    let studentGender = document.createElement("p");
    let studentClass;
  removeElements(id);
  studentName.innerHTML = "<b>Name:</b>" + " " + studentInfo.firstName + " " + studentInfo.lastName;
  studentAge.innerHTML = "<b>Age:</b>" + " " + studentInfo.age;
    studentGender.innerHTML = "<b>Gender:</b>" + " " + studentInfo.gender;
    if (studentInfo.class) {
        studentClass = document.createElement("p");
        studentClass.innerHTML = "<b>Class:</b>" + " " + studentInfo.class.name;
    }
  eachStudent.appendChild(studentName);
  eachStudent.appendChild(studentAge);
    eachStudent.appendChild(studentGender);
    studentClass ? eachStudent.appendChild(studentClass) : null;
    document.getElementById("title2").style.display = "block";
  eachStudent.style.display = "block";

  console.log(studentInfo);
}

function removeElements(id) {
    const list = document.getElementById(id);
  while (list.hasChildNodes()) {
    list.removeChild(list.firstChild);
  }
}

async function displayClasses() {
  const response = await axios.get(
    "https://moringa-student-app.herokuapp.com/api/class/getAllClasses"
  );
  const classes = response.data.data;
  console.log(classes);
  let id = "allclasses"
  let allclasses = document.getElementById(id);
  removeElements(id);
  if (classes.length === 0) {
      let noClasses = document.createElement("p");
      noClasses.innerHTML = "No classes found";
      allclasses.appendChild(noClasses);
      allclasses.style.display = "block";
  }
  classes.forEach((classs) => {
      let classInfo = document.createElement("div");
      let className = document.createElement("button");
      let classId = document.createElement("span");
      className.setAttribute("id", classs._id);
      className.innerHTML = classs.name;
      className.style.cursor = "pointer";
      className.style.textTransform = "capitalize";
      classId.value = classs._id;
      classId.innerHTML = ": " + classs._id;
      className.appendChild(classId);
      classInfo.appendChild(className);
      allclasses.appendChild(classInfo);
      document.getElementById(classs._id).addEventListener("click", getClass);
    
      allclasses.style.display = "block";
  });
}

async function getClass(e) {
    let pid = e.target.id;
    let cid = e.target.value;
    let classId;
    if (!pid) {
        classId = cid;
    } else {
        classId = pid;
    }
    console.log(classId);
    const response = await axios.get(
      `https://moringa-student-app.herokuapp.com/api/student/getStudentsInClass/${classId}`
    );
    const classInfo = response.data.data;
    console.log(classInfo);
    let id = "eachClass"
    let eachClass = document.getElementById(id);
    removeElements(id);
    if (classInfo.length === 0) {
        let noStudents = document.createElement("p");
        noStudents.innerHTML = "No students found in this class";
        eachClass.appendChild(noStudents);
        document.getElementById("title2").style.display = "block";
        eachClass.style.display = "block";
    }
    classInfo.forEach((student) => {
        let studentInfo = document.createElement("ul");
        let studentName = document.createElement("li");
        let studentAge = document.createElement("li");
        let studentGender = document.createElement("li");
        let space = document.createElement("br");
        studentName.innerHTML = "<b>Name:</b>" + " " + student.firstName + " " + student.lastName;
        studentAge.innerHTML = "<b>Age:</b>" + " " + student.age;
        studentGender.innerHTML = "<b>Gender:</b>" + " " + student.gender;
        studentInfo.appendChild(studentName);
        studentInfo.appendChild(studentAge);
        studentInfo.appendChild(studentGender);
        studentInfo.appendChild(space);
        eachClass.appendChild(studentInfo);
        document.getElementById("title2").style.display = "block";
        eachClass.style.display = "block";
    });
}

async function updateStudent(e) {
    let pid = e.target.value;
    console.log(pid);
    const response = await axios.get(
      `https://moringa-student-app.herokuapp.com/api/student/getStudent/${pid}`
      );
      if (!response.data.data) {
        console.log("Error encountered");
      }
      studentData = response.data.data;
      let form = document.getElementById("studentForm");
      form.style.display = "block";
    let firstName = document.getElementById("firstName");
    let lastName = document.getElementById("lastName");
    let age = document.getElementById("age");
    let gender = document.getElementById("gender");
    firstName.defaultValue = studentData.firstName;
    lastName.defaultValue = studentData.lastName;
    age.defaultValue = studentData.age;
    gender.defaultValue = studentData.gender;
    let formButton = document.getElementById("submitBtn");
  formButton.innerHTML = "Update Student";
  formButton.style.cursor = "pointer";
  // Update Student
  
  formButton.addEventListener("click", async() => {
    let data = {
      firstName: firstName.value || studentData.firstName,
      lastName: lastName.value || studentData.lastName,
      age: age.value || studentData.age,
      gender: gender.value || studentData.gender
    }
    console.log(data)
    const updateInfo = await axios.request({
      url: `https://moringa-student-app.herokuapp.com/api/student/updateStudent/${pid}`,
      method: "PUT",
      data
    });
    console.log(updateInfo.data.data);
    if (!updateInfo.data.data) {
      console.log("Error encountered");
    }
    alert("Student updated successfully");
    form.style.display = "none";
    displayStudents();
  })
}

async function deleteStudent(e) {
  let pid = e.target.value;
  console.log(pid);
  const response = await axios.delete(
    `https://moringa-student-app.herokuapp.com/api/student/deleteStudent/${pid}`
  );
  console.log(response.data);
  if (!response.data.data) {
    console.log("Error encountered");
  }
  alert("Student deleted successfully");
  displayStudents();
}

async function addStudent() {
  let form = document.getElementById("studentForm");
  form.style.display = "block";
  let firstName = document.getElementById("firstName");
  let lastName = document.getElementById("lastName");
  let age = document.getElementById("age");
  let gender = document.getElementById("gender");

   let formButton = document.getElementById("submitBtn");
  formButton.innerHTML = "Add Student";
  formButton.style.cursor = "pointer";
  // Update Student
  
  formButton.addEventListener("click", async () => {
    let data = {
      firstName: firstName.value,
      lastName: lastName.value,
      age: age.value,
      gender: gender.value
    }
    console.log(data)
    let response = await axios.request({
      url: `https://moringa-student-app.herokuapp.com/api/student/addStudent`,
      method: "POST",
      data
    })
    console.log(response.data.data);
    if (!response.data.data) {
      console.log("Error encountered");
    }
    alert("Student deleted successfully");
    form.style.display = "none";
    displayStudents();
  })
}