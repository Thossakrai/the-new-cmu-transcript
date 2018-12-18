import { semesters, sems, grades, gpa, gpax } from './data.js';

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
              <span class="btn-inner--icon">
                <i class="ni ni-active-40"></i>
              </span>
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

const ctx = document.getElementById('pie-chart');
const gradeSemester = '1 / 2560';
const myPieChart = new Chart(ctx, {
  type: 'pie',
  data: {
    labels: ['A', 'B+', 'B', 'C+', 'C', 'D+', 'D', 'F'],

    datasets: [
      {
        label: 'Grades',
        backgroundColor: [
          '#2dce89',
          '#11cdef',
          '#5e72e4',
          '#172b4d',
          '#fb6340',
          '#fb6340',
          '#f4f5f7',
          '#f5365c'
        ],
        data: [5, 3, 2, 1, 1, 1, 1, 1]
      }
    ]
  },
  options: {
    responsive: true,
    title: {
      display: true,
      text: 'Total Grade in ' + gradeSemester
    }
  }
});

const ctx2 = document.getElementById('line-chart');
const myLineChart = new Chart(ctx2, {
  type: 'line',
  data: {
    labels: ['1/60', '2/60', '1/61', '2/61', '1/62', '2/62'],
    datasets: [
      {
        label: 'GPA',
        borderColor: '#5e72e4',
        pointBackgroundColor: '#5e72e4',
        pointRadius: 3,
        data: [1.3, 2.4, 4, 3.1, 2.1, 3.1],
        fill: false
      },
      {
        label: 'GPAX',
        borderColor: '#2dce89',
        pointRadius: 3,
        pointBackgroundColor: '#2dce89',
        data: [1.4, 2.2, 4, 3.1, 2.1, 3.2],
        fill: false
      }
    ]
  },

  options: {
    responsive: true,
    title: {
      display: true,
      text: 'Chart.js Line Chart'
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
