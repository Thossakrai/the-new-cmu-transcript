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
export { semesters, sems, grades, gpa, gpax };
