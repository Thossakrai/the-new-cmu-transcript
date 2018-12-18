const theNewTranscriptHTML = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1, shrink-to-fit=no"
    />

  </head>

  <body>

    
    <nav
      class="navbar navbar-horizontal navbar-expand-lg navbar-dark bg-gradient-blue"
    >
      <div class="container">
        <a class="navbar-brand" href="#">THE NEW Transcript</a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbar-info"
          aria-controls="navbar-info"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbar-info">
          <div class="navbar-collapse-header">
            <div class="row">
              <div class="col-6 collapse-brand">
                <a href="../../index.html"> THE NEW TRANSCRIPT </a>
              </div>
              <div class="col-6 collapse-close">
                <button
                  type="button"
                  class="navbar-toggler"
                  data-toggle="collapse"
                  data-target="#navbar-info"
                  aria-controls="navbar-info"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span></span> <span></span>
                </button>
              </div>
            </div>
          </div>
          <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <a class="nav-link nav-link-icon" href="#GradeReveal">
                <span class="nav-link-inner--text">Grade Reveal</span>
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link nav-link-icon" href="#Overall">
                <span class="nav-link-inner--text">Overall</span>
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link nav-link-icon" href="#GPACalculator">
                <span class="nav-link-inner--text">GPA Calculator</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    
    
    <section id="GradeReveal" class="bg-gradient-blue">
      <div class="text-center py-3 text-uppercase">
        <h1 class="text-secondary text-underline text-lg-center"><span>the new transcript</span></h1>
      </div>
      <div class="container">
        <h1><span> GRADE REVEALER </span></h1>
        <div
          id="table-component"
          class="tab-pane tab-example-result fade active show bg-white"
          role="tabpanel"
          aria-labelledby="table-component-tab"
        >
          <nav aria-label="Semester navigation">
            <ul id="sems" class="pagination justify-content-end">
            </ul>
          </nav>

          <div class="table-responsive">
            <table class="table align-items-center">
              <thead class="thead-light">
                <tr>
                  <th scope="col">NO</th>
                  <th scope="col">COURSE NO</th>
                  <th scope="col">COURSE TITLE</th>
                  <th scope="col">CREDIT</th>
                  <th scope="col">GRADE</th>
                </tr>
              </thead>
              <tbody id="grades-by-semester">
              </tbody>
            </table>

            <div class="gpa-gpax-table">
              <table class="table align-items-center">
                <thead class="thead-light">
                  <tr>
                    <th scope="col">Result</th>
                    <th scope="col">All Credits</th>
                    <th scope="col">Receive Credits</th>
                    <th scope="col">GPA</th>
                  </tr>
                </thead>
                <tbody id="gpa-by-semester">
                </tbody>
              </table>
              
            </div>
  
            </div>
          </div>
        </div>
      </div>
    </section>


    <footer class="bg-dark"> 
      <div class="text-center text-light py-3">
        Contact me
        <a href="www.facebook.com/tusaveeiei">tusaveeiei</a>
      </div>
    </footer>

    <!-- Core -->
    <script src="/assets/vendor/jquery/dist/jquery.min.js"></script>
    <script src="/assets/vendor/bootstrap/dist/js/bootstrap.bundle.min.js"></script>

    <!-- Optional JS -->
    <script src="./assets/vendor/chart.js/dist/Chart.min.js"></script>
    <script src="./assets/vendor/chart.js/dist/Chart.extension.js"></script>

    <!-- Argon JS -->
    <script src="/assets/js/argon.min.js"></script>
    <script type="module" src="index.js"></script>
    <script src="assets/js/lodash.js"></script>
  </body>
</html>

`;

const REGEX_SPACE = /&nbsp;/g;
const CHAR_SPACEY = '	';
const REGEX_NORMAL_SPACE = / /g;
const REGEX_NEWLINE = /\n/g;
let i;

function getDOM(selector) {
  return document.querySelector(selector);
}
function getDOMs(selector) {
  return document.querySelectorAll(selector);
}
function getDOMText(selector) {
  return getDOM(selector).innerText;
}

const student = {
  number: 0,
  name: ''
};

const studentNumber = getDOMText(
  'body > center:nth-child(5) > table:nth-child(1) > tbody > tr:nth-child(3) > td:nth-child(2)'
);

const studentFullName = document
  .querySelector(
    'body > center:nth-child(5) > table:nth-child(1) > tbody > tr:nth-child(5) > td'
  )
  .innerText.replace(' ', '');

student.number = studentNumber.slice(1);
student.name = studentFullName.slice(1);

const passedSemester = document.querySelectorAll('td.msan12');
const numberPassedSemester = passedSemester.length;
let passedSemesterInfo = _.map(passedSemester, semester => semester.innerText);

function nthSemesterTableSelector(n) {
  return `table:nth-child(${7 * n -
    3}) > tbody > tr:nth-child(2) > td > table:nth-child(1)`;
}

function nthSemesterGPATableSelector(n) {
  return `table:nth-child(${7 * n - 1}) > tbody`;
}

function getSemesterResultDOMInfo(dom) {
  return _.map(dom.innerText.split(CHAR_SPACEY), data => {
    return data.replace(REGEX_NORMAL_SPACE, '');
  });
}

function nthSemesterGPAInfo(n) {
  const dom = getDOMs(`table:nth-child(${7 * n - 1}) > tbody > tr`)[1];
  return getSemesterResultDOMInfo(dom);
}

function nthSemesterGPAXInfo(n) {
  const dom = getDOMs(`table:nth-child(${7 * n - 1}) > tbody > tr`)[2];
  return getSemesterResultDOMInfo(dom);
}

function coursesInSemesterSelector(n) {
  return nthSemesterTableSelector(n) + '> tbody > tr';
}

function noCoursesInSemester(n) {
  return getDOMs(coursesInSemesterSelector(n)).length - 1;
}

function coursesInSemester(n) {
  return Array.from(getDOMs(coursesInSemesterSelector(n))).slice(1);
}

function coursesInSemesterInfo(n) {
  const courses = coursesInSemester(n);
  return _.map(courses, course => {
    const info = course.innerText.replace(REGEX_NEWLINE, '').split(CHAR_SPACEY);
    return {
      no: info[0],
      course: {
        no: info[1],
        title: info[2],
        credit: info[3],
        grade: info[4]
      }
    };
  });
}

console.log(student);

let semesters = [];
let sems = [];
let grades = [];
let gpas = [];
let gpaxs = [];

for (i = 1; i <= numberPassedSemester; i++) {
  let semester = passedSemesterInfo[i - 1];
  semesters.push(semester);
  sems.push(
    semester
      .replace('ผลการเรียนภาคเรียนที่ ', '')
      .replace(' ปีการศึกษา 25', '/')
  );
  grades.push(coursesInSemesterInfo(i));
  let gpa = nthSemesterGPAInfo(i);
  let gpax = nthSemesterGPAXInfo(i);

  gpas.push({
    title: gpa[0],
    allCredit: gpa[1],
    gotCredit: gpa[2],
    gpa: gpa[3]
  });
  gpaxs.push({
    title: gpax[0],
    allCredit: gpax[1],
    gotCredit: gpax[2],
    gpa: gpax[3]
  });
}

let gpa = gpas;
let gpax = gpaxs;
console.log({ semesters, sems, grades, gpa, gpax });

grades = _.map(grades, grade => {
  return _.map(grade, course => course.course);
});

// start here
let main = document.querySelector('body > center:nth-child(5)');

main.innerHTML = '';
main.innerHTML += theNewTranscriptHTML;

_.forEach(sems, (sem, index) => {
  document.querySelector(
    '#sems'
  ).innerHTML += `<li id="sem_id${index}" class="page-item"><a class="page-link">${sem}</a></li>`;
});

//first time loading
let semester = sems.length - 1;

_.forEach(sems, (sem, index) => {
  semester = index;
  document.querySelector(`#sem_id${index}`).addEventListener('click', () => {
    _.forEach(sems, (sem, index) => {
      let it = document.querySelector(`#sem_id${index}`);
      it.className = it.className.replace(' active', '');
    });

    let it = document.querySelector(`#sem_id${index}`);
    it.className += ' active';

    let semester = index;
    let courses = document.querySelector('#grades-by-semester');
    courses.innerHTML = '';
    let courseNo = 0;
    let courseGrade;
    _.forEach(grades[semester], (course, index) => {
      switch (course.grade) {
        case 'A':
          courseGrade = '<span class="text-success">A</span>';
          break;
        case 'B+':
          courseGrade = '<span class="text-cyan">B+</span>';
          break;
        case 'B':
          courseGrade = '<span class="text-blue">B</span>';
          break;
        case 'C+':
          courseGrade = '<span class="text-info">C+</span>';
          break;
        case 'C':
          courseGrade = '<span class="text-purple">C</span>';
          break;
        case 'D+':
          courseGrade = '<span class="text-orange">D+</span>';
          break;
        case 'D':
          courseGrade = '<span class="text-warning">D</span>';
          break;
        case 'F':
          courseGrade = '<span class="text-danger">F</span>';
          break;
        default:
          courseGrade = course.grade;
          break;
      }
      document.querySelector('#grades-by-semester').innerHTML += ` 
        <tr>
          <th scope="row" class="no">${index}</th>
          <td class="course-no">${course.no}</td>
          <td class="course-title">${course.title}</td>
          <td class="course-credit">${course.credit}</td>
          <td class="course-grade">
            <button
              id="button-of-course${course.no}"
              class="course-grade-reveal-button btn btn-icon btn-2 btn-secondary btn-sm"
              type="button"
            >
              <span class="btn-inner--text">Show</span>
            </button>
            <span id="grade-of-course${
              course.no
            }" class="hide text-lg">${courseGrade}
            </span>
          </td>
        </tr>`;
    });

    let semGPA = gpa[semester];
    let semGPAX = gpax[semester];
    document.querySelector('#grades-by-semester').innerHTML += `
        <tr>
          <th scope="row" class="no"></th>
          <td class="course-no"></td>
          <td class="course-title"></td>
          <td class="course-credit"></td>
          <td class="course-grade">
            <button id="just-show-grade" type="button" class="btn btn-info">
              Just Show My Grade !
            </button>
          </td>
        </tr>`;

    let justShowButton = document.querySelector('#just-show-grade');
    justShowButton.addEventListener('click', () => {
      let ans = confirm('SHOW MY GRADE !!?');
      if (ans) {
        _.forEach(grades[semester], course => {
          let button = document.querySelector(`#button-of-course${course.no}`);
          button.className += ' hide';
          let grade = document.querySelector(`#grade-of-course${course.no}`);
          grade.className = grade.className.replace('hide', '');
          justShowButton.className += ' hide';

          document.querySelector('#gpa-by-semester').innerHTML = '';
          document.querySelector('#gpa-by-semester').innerHTML += `  
            <tr>
              <th scope="row">${semGPA.title}</th>
              <td >${semGPA.allCredit}</td>
              <td >${semGPA.gotCredit}</td>
              <td class="text-dark">${semGPA.gpa}</td>
            </tr>
            <tr>
              <th scope="row">${semGPAX.title}</th>
              <td >${semGPAX.allCredit}</td>
              <td >${semGPAX.gotCredit}</td>
              <td class="text-dark">${semGPAX.gpa}</td>
            </tr>`;
        });
      }
    });

    _.forEach(grades[semester], course => {
      let button = document.querySelector(`#button-of-course${course.no}`);
      button.addEventListener('click', () => {
        button.className += ' hide';
        let grade = document.querySelector(`#grade-of-course${course.no}`);
        grade.className = grade.className.replace('hide', '');
      });
    });
  });
});
