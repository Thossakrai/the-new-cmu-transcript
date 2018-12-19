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
  let obj = getDOM(selector);
  if (obj) return obj.innerText;
  return null;
}

let noCenter = 4;

const studentImage = document.querySelector(
  `body > center > table:nth-child(1) > tbody > tr:nth-child(1) > td > img`
);

const studentNumber = getDOMText(
  `body > center > table:nth-child(1) > tbody > tr:nth-child(3) > td:nth-child(2)`
);

const studentFullNameTh = getDOMText(
  `body > center > table:nth-child(1) > tbody > tr:nth-child(4) > td:nth-child(2)`
);

const studentFullNameEn = getDOMText(
  `body > center > table:nth-child(1) > tbody > tr:nth-child(5) > td`
);

const studentAdvisor = getDOMText(
  `body > center > table:nth-child(1) > tbody > tr:nth-child(6) > td:nth-child(2)`
);

const studentBorn = getDOMText(
  `body > center > table:nth-child(1) > tbody > tr:nth-child(7) > td:nth-child(2)`
);

const studentId = getDOMText(
  `body > center > table:nth-child(1) > tbody > tr:nth-child(8) > td:nth-child(2)`
);

const student = {
  img: studentImage,
  number: studentNumber.slice(1),
  nameTh: studentFullNameTh.slice(1),
  nameEn: studentFullNameEn.slice(1),
  advisor: studentAdvisor.slice(1),
  born: studentBorn.slice(1),
  id: studentId.slice(1)
};

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

let semesters = [];
let sems = [];
let grades = [];
let gpas = [];
let gpaxs = [];
let gradeCount = {
  a: 0,
  bp: 0,
  b: 0,
  cp: 0,
  c: 0,
  dp: 0,
  d: 0,
  f: 0,
  s: 0,
  u: 0,
  v: 0,
  w: 0,
  other: 0
};

for (i = 1; i <= numberPassedSemester; i++) {
  let semester = passedSemesterInfo[i - 1];
  semesters.push(semester);
  sems.push(
    semester
      .replace('ผลการเรียนภาค ฤดูร้อน ปีการศึกษา 25', 'S/')
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

grades = _.map(grades, grade => {
  return _.map(grade, course => {
    switch (course.course.grade) {
      case 'A':
        gradeCount.a++;
        break;
      case 'B+':
        gradeCount.bp++;
        break;
      case 'B':
        gradeCount.b++;
        break;
      case 'C+':
        gradeCount.cp++;
        break;
      case 'C':
        gradeCount.c++;
        break;
      case 'D+':
        gradeCount.dp++;
        break;
      case 'D':
        gradeCount.d++;
        break;
      case 'F':
        gradeCount.f++;
        break;
      case 'S':
        gradeCount.s++;
        break;
      case 'U':
        gradeCount.u++;
        break;
      case 'V':
        gradeCount.v++;
        break;
      case 'W':
        gradeCount.w++;
        break;
      default:
        gradeCount.other++;
        break;
    }

    return course.course;
  });
});

// start here
const theNewTranscriptHTML = ` <!DOCTYPE html> <html> <head> <meta charset="utf-8" /> <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" /> </head> <body> <nav class="navbar navbar-horizontal navbar-expand-lg navbar-dark bg-gradient-blue" > <div class="container"> <a class="navbar-brand text-white text-lg" href="#">THE Transcript</a> <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar-info" aria-controls="navbar-info" aria-expanded="false" aria-label="Toggle navigation" > <span class="navbar-toggler-icon"></span> </button> <div class="collapse navbar-collapse" id="navbar-info"> <div class="navbar-collapse-header"> <div class="row"> <div class="col-6 collapse-brand"> <a href="../../index.html"> THE NEW TRANSCRIPT </a> </div> <div class="col-6 collapse-close"> <button type="button" class="navbar-toggler" data-toggle="collapse" data-target="#navbar-info" aria-controls="navbar-info" aria-expanded="false" aria-label="Toggle navigation" > <span></span> <span></span> </button> </div> </div> </div> <ul class="navbar-nav ml-auto"> <li class="nav-item"> <a class="nav-link nav-link-icon" href="#GradeReveal"> <span class="nav-link-inner--text">Grade Reveal</span> </a> </li> <li class="nav-item"> <a class="nav-link nav-link-icon" href="#Overall"> <span class="nav-link-inner--text">Overall</span> </a> </li> <li class="nav-item"> <a class="nav-link nav-link-icon coming-soon" href=""> <span class="nav-link-inner--text">*GPA Calculator</span> </a> </li> </ul> </div> </div> </nav> <section id="GradeReveal" class="bg-gradient-blue" style="padding-bottom:280px"> <div class="container"> <div class="profile" style="padding: 30px 0"> <div class="row text-secondary text-lg" style="margin: 0 10vw; text-align: center"> <div class="col">${
  student.nameTh
}</div> <div class="col">${student.nameEn}</div> <div class="col">${
  student.number
}</div> </div> </div> <div style="padding: 0 20px"><h1><span> GRADE REVEALER </span></h1></div> <div id="table-component" class="tab-pane tab-example-result fade active show bg-white" role="tabpanel" aria-labelledby="table-component-tab" > <nav aria-label="Semester navigation"> <ul id="sems" class="pagination justify-content-end"> </ul> </nav> <div class="table-responsive"> <table class="table align-items-center"> <thead class="thead-light"> <tr> <th scope="col">NO</th> <th scope="col">COURSE NO</th> <th scope="col">COURSE TITLE</th> <th scope="col">CREDIT</th> <th scope="col">GRADE</th> </tr> </thead> <tbody id="grades-by-semester"> </tbody> </table> <div class="gpa-gpax-table"> <table class="table align-items-center"> <thead class="thead-light"> <tr> <th scope="col">Result</th> <th scope="col">All Credits</th> <th scope="col">Receive Credits</th> <th scope="col">GPA</th> </tr> </thead> <tbody id="gpa-by-semester"> </tbody> </table> </div> </div> </div> </div> </div> </section> <div id="Overall" class="container-fluid mt--7"> <div> <h1><span class="text-secondary text-uppercase"> Overall Score</span></h1> </div> <div class="row" style="margin: 50px"> <div class="col-lg-8 mt--5"> <div class="card bg-gradient-secondary shadow mb-5"> <div class="card-body"> <canvas id="bar-chart" width="200"></canvas> </div> </div> </div> <div class="col-lg-4 mt-1"> <div class="card bg-gradient-secondary shadow mb-5"> <div class="card-body"> <canvas id="pie-chart" height="200" width="200" style="max-height:400px; max-width:400px"></canvas> </div> </div> </div> </div> </div> <div class="container" style="padding-bottom:50px"> <div class="card bg-gradient-secondary shadow mt--7"> <div class="card-body"> <canvas id="line-chart" width="695" height="350" style="display: block; width: 500px; height: 300px;" ></canvas> </div> </div> </div> </div> <footer class="bg-dark"> <div class="text-center text-light py-3"> Contact me <a href="www.facebook.com/tusaveeiei" class="text-underline text-blue">tusaveeiei</a> </div> </footer> <!-- Core --> <script src="/assets/vendor/jquery/dist/jquery.min.js"></script> <script src="/assets/vendor/bootstrap/dist/js/bootstrap.bundle.min.js"></script> <!-- Optional JS --> <script src="./assets/vendor/chart.js/dist/Chart.min.js"></script> <script src="./assets/vendor/chart.js/dist/Chart.extension.js"></script> <!-- Argon JS --> <script src="/assets/js/argon.min.js"></script> <script type="module" src="index.js"></script> <script src="assets/js/lodash.js"></script> </body> </html> `;

//first time loading
let main = document.querySelector('body > center');
let headReg = _.forEach(getDOMs('body > center'), dom => (dom.innerHTML = ''));

main.innerHTML = '';
main.innerHTML += theNewTranscriptHTML;

_.forEach(sems, (sem, index) => {
  document.querySelector(
    '#sems'
  ).innerHTML += `<li id="sem_id${index}" class="page-item"><a class="page-link">${sem}</a></li>`;
});

document.querySelector('#grades-by-semester').innerHTML += ` 
<tr>
  <th scope="row" class="no"></th>
  <td class="course-no"></td>
  <td class="course-title">please select semester</td>
  <td class="course-credit"></td>
  <td class="course-grade">
  </td>
</tr>`;

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
              <span class="btn-inner--text">SHOW</span>
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
            <button id="just-show-grade" type="button" class="btn btn-primary">
              Just Show My Grade !
            </button>
          </td>
        </tr>`;

    let justShowButton = document.querySelector('#just-show-grade');
    justShowButton.addEventListener('click', () => {
      let ans = confirm('Show All?');
      if (ans) {
        _.forEach(grades[semester], course => {
          let button = document.querySelector(`#button-of-course${course.no}`);
          button.className += ' hide';
          let grade = document.querySelector(`#grade-of-course${course.no}`);
          grade.className = grade.className.replace('hide', '');
          // justShowButton.className += ' hide';
          justShowButton.setAttribute('disabled', true);

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

let gradeLabel = ['A', 'B+', 'B', 'C+', 'C', 'D+', 'D', 'F'];
let gradeCountData = [
  gradeCount.a,
  gradeCount.bp,
  gradeCount.b,
  gradeCount.cp,
  gradeCount.c,
  gradeCount.dp,
  gradeCount.d,
  gradeCount.f
];
let gradeColors = [
  '#66BB6A',
  '#4FC3F7',
  '#64B5F6',
  '#BA68C8',
  '#F06292',
  '#FFD54F',
  '#FFB74D',
  '#e57373'
];

var ctx = document.getElementById('pie-chart');
var myPieChart = new Chart(ctx, {
  type: 'doughnut',
  data: {
    labels: gradeLabel,

    datasets: [
      {
        label: 'Grades',
        backgroundColor: gradeColors,
        data: gradeCountData
      }
    ]
  },
  options: {
    responsive: true,
    title: {
      display: true,
      text: 'Overall Grades (Doughnut Chart)'
    }
  }
});

var ctx1 = document.getElementById('bar-chart');
var myPieChart = new Chart(ctx1, {
  type: 'bar',
  data: {
    labels: gradeLabel,

    datasets: [
      {
        backgroundColor: gradeColors,
        data: gradeCountData
      }
    ]
  },
  options: {
    responsive: true,
    legend: { display: false },
    title: {
      display: true,
      text: 'Overall Grades (Bar Chart)'
    },
    scales: {
      yAxes: [
        {
          ticks: {
            min: 0,
            stepSize: 1
          }
        }
      ]
    }
  }
});

let gpaOverall = _.map(gpa, g => {
  return g.gpa;
});

let gpaxOverall = _.map(gpax, g => {
  return g.gpa;
});

var ctx2 = document.getElementById('line-chart');
var myPieChart = new Chart(ctx2, {
  type: 'line',
  data: {
    labels: sems,
    datasets: [
      {
        label: 'GPA',
        borderColor: '#5e72e4',
        pointBackgroundColor: '#5e72e4',
        pointRadius: 3,
        data: gpaOverall,
        fill: false,
        lineTension: 0
      },
      {
        label: 'GPAX',
        borderColor: '#2dce89',
        pointRadius: 3,
        pointBackgroundColor: '#2dce89',
        data: gpaxOverall,
        fill: false,
        lineTension: 0
      }
    ]
  },

  options: {
    responsive: true,
    title: {
      display: true,
      text: 'Overall GPA and GPAX '
    },
    hover: {
      mode: 'nearest',
      intersect: true
    },
    scales: {
      xAxes: [
        {
          display: true,
          scaleLabel: {
            display: true,
            labelString: 'Semester'
          }
        }
      ],
      yAxes: [
        {
          ticks: {
            max: 4,
            min: 0,
            stepSize: 0.5
          },
          display: true,
          scaleLabel: {
            display: true,
            labelString: 'Grade'
          }
        }
      ]
    }
  }
});
