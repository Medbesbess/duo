$(".information-student").hide();
$(".pins-student").hide();
// $(".search-student-with-name").hide();
$(".button-add-student").on("click", function () {
  console.log("aaa");
  $(".pins-student").show();
  $("#slider").toggle();
  $(".information-student").toggle();
  $("#search-student").toggle();
  $("#delete-student").toggle();
});

$("#btn-save-student").on("click", function () {
  0;
  x.add();
  x.displayData();
  clearData(); // Clear data after saving
});
function createStudent(name, age, image) {
  return {
    image: image,
    name: name,
    age: age,
    bluepin: 0,
    redpin: 0,
  };
}

var slideIndex = 0;
//add student
function add() {
  this.students.push(
    createStudent($("#name").val(), $("#age").val(), $("#src-image").val())
  );
  $("#slider").show();
  $(".information-student").hide();
}

// Clear data
function clearData() {
  $("#name").val("");
  $("#age").val("");
  $("#src-image").val("");
}

// Display student data
function displayData() {
  $("#students").empty();

  $(".card-list").empty(); // Fixed selector issue
  var dataStudent = this.students;
  for (let i = 0; i < dataStudent.length; i++) {
    let option = ` <option value=${dataStudent[i].name}>${dataStudent[i].name}</option>`;
    $("#students").append(option);
    let info = `
            <div class="card-item">
               <button id="delete-student" onclick="deleteStudent(${i})">❌</button>
                <img src="${dataStudent[i].image}" alt="user image" class="user-image" />
                <h2 class="user-name">Name: ${dataStudent[i].name}</h2>
                <p class="user-text">Age: ${dataStudent[i].age}</p>
                <div id="box"> <p id="blue"> ${dataStudent[i].bluepin}</p><p id="red">${dataStudent[i].redpin}</p></div>
            </div>
        `;
    $(".card-list").append(info);
  }
  showDivs(slideIndex);
}

function plusDivs(n) {
  showDivs((slideIndex += n));
}

function showDivs(n) {
  var items = $(".card-list .card-item");
  var maxItems = 4;
  if (n > items.length - maxItems) {
    slideIndex = items.length - maxItems;
  }
  if (n < 0) {
    slideIndex = 0;
  }
  items.hide();
  for (var i = slideIndex; i < slideIndex + maxItems; i++) {
    $(items[i]).show();
  }
}

// action function add pins
$("#sub").on("click", function (event) {
  event.preventDefault();

  var studkey = $("#students");
  var index = 0;
  var sstudent = reduce(x.students, function (acc, student, i) {
    if (student.name === studkey.val()) {
      index = i;
      return student;
    }
    return acc;
  });

  //pin condition
 

  var pin = $("input[name=pins]:checked").val();
  if (pin === "red") {
    sstudent.redpin = 1 + sstudent.redpin;
  } else if (pin === "blue") {
    sstudent.bluepin = 1 + sstudent.bluepin;
    if (sstudent.bluepin === 3) {
      sstudent.bluepin = 0;
      sstudent.redpin = 1 + sstudent.redpin;
    }
  }
  if (sstudent.redpin >= 3) {
    deleteStudent(index+1);
  }
  console.log(sstudent);
  x.displayData();
});
var x = classStudents();

// classStudents
function classStudents() {
  return {
    students: [],
    add: add,
    displayData: displayData,
    bluepin: 0,
    redpin: 0,
  };
}

function reduce(array, f, acc) {
  if (acc === undefined) {
    acc = array[0];
    array = array.slice(1);
  }
  each(array, function (element, i) {
    acc = f(acc, element, i);
  });
  return acc;
}
function each(coll, func) {
  if (Array.isArray(coll)) {
    for (var i = 0; i < coll.length; i++) {
      func(coll[i], i);
    }
  } else {
    for (var key in coll) {
      func(coll[key], key);
    }
  }
}
function filter(array, predicate) {
  var acc = [];
  each(array, function (element, index) {
    if (predicate(element, index)) {
      acc.push(element);
    }
  });
  return acc;
}
// search student
var searched = $("#searchstudent");
$("#btn-search").on("click", searchName);
function searchName() {
  var arr = filter(x.students, function (element) {
    return element.name === searched.val();
  });
  students = arr;

  displayData();
  searched.val("");
}
//delete student
function deleteStudent(index) {
  x.students.splice(index, 1);
  x.displayData();
}
