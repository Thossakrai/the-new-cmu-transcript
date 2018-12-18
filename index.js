var ctx = document.getElementById('pie-chart');
var gradeSemester = '1 / 2560';
var myPieChart = new Chart(ctx, {
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

var ctx2 = document.getElementById('line-chart');
var myPieChart = new Chart(ctx2, {
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
