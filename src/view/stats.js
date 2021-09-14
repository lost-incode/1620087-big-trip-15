// import dayjs from 'dayjs';
import SmartView from './smart.js';
import {countSpentMoney, countTypes, durationTypes} from '../utils/stats.js';
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {POINT_TYPES} from '../mock/point.js';
import {formatDuration} from '../utils/point.js';

// Рассчитаем высоту канваса в зависимости от того, сколько данных в него будет передаваться
const BAR_HEIGHT = 55;

const renderTypeChart = (typeCtx, points) => {
  const types = POINT_TYPES.map((type) => type.toUpperCase());
  const countOfTypes = POINT_TYPES.map((type) => countTypes(type, points));

  return new Chart(typeCtx, {
    plugins: [ChartDataLabels],
    type: 'horizontalBar',
    data: {
      labels: types,
      datasets: [{
        data: countOfTypes,
        backgroundColor: '#ffffff',
        hoverBackgroundColor: '#ffffff',
        anchor: 'start',
      }],
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13,
          },
          color: '#000000',
          anchor: 'end',
          align: 'start',
          formatter: (val) => `${val}x`,
        },
      },
      title: {
        display: true,
        text: 'TYPE',
        fontColor: '#000000',
        fontSize: 23,
        position: 'left',
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: '#000000',
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
          barThickness: 27,
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
          minBarLength: 50,
        }],
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
    },
  });
};

const renderMoneyChart = (moneyCtx, points) => {
  const types = POINT_TYPES.map((type) => type.toUpperCase());
  const spentMoney = POINT_TYPES.map((type) => countSpentMoney(type, points));

  return new Chart(moneyCtx, {
    plugins: [ChartDataLabels],
    type: 'horizontalBar',
    data: {
      labels: types,
      datasets: [{
        data: spentMoney,
        backgroundColor: '#ffffff',
        hoverBackgroundColor: '#ffffff',
        anchor: 'start',
      }],
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13,
          },
          color: '#000000',
          anchor: 'end',
          align: 'start',
          formatter: (val) => `€ ${val}`,
        },
      },
      title: {
        display: true,
        text: 'MONEY',
        fontColor: '#000000',
        fontSize: 23,
        position: 'left',
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: '#000000',
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
          barThickness: 27,
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
          minBarLength: 50,
        }],
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
    },
  });
};

const renderTimeSpendChart = (timeCtx, points) => {
  const types = POINT_TYPES.map((type) => type.toUpperCase());
  const timeSpentDurations = POINT_TYPES.map((type) => durationTypes(type, points));

  return new Chart(timeCtx, {
    plugins: [ChartDataLabels],
    type: 'horizontalBar',
    data: {
      labels: types,
      datasets: [{
        data: timeSpentDurations,
        backgroundColor: '#ffffff',
        hoverBackgroundColor: '#ffffff',
        anchor: 'start',
      }],
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13,
          },
          color: '#000000',
          anchor: 'end',
          align: 'start',
          formatter: (val) => `${formatDuration(val)}`,
        },
      },
      title: {
        display: true,
        text: 'TIME-SPEND',
        fontColor: '#000000',
        fontSize: 23,
        position: 'left',
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: '#000000',
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
          barThickness: 27,
          barPercentage: 0.7,
          categoryPercentage: 0.7,
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
          minBarLength: 100,
        }],
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
    },
  });
};

const createStatsTemplate = () => `<section class="statistics">
    <h2 class="visually-hidden">Trip statistics</h2>

    <div class="statistics__item">
      <canvas class="statistics__chart" id="money" width="900"></canvas>
    </div>

    <div class="statistics__item">
      <canvas class="statistics__chart" id="type" width="900"></canvas>
    </div>

    <div class="statistics__item">
      <canvas class="statistics__chart" id="time-spend" width="900"></canvas>
    </div>
  </section>`;

export default class Stats extends SmartView {
  constructor(points) {
    super();

    this._data = points;

    this._moneyChart = null;
    this._typeChart = null;
    this._timeSpendChart = null;

    this._setCharts();
  }

  removeElement() {
    super.removeElement();

    if (this._moneyChart !== null || this._typeChart !== null || this._timeSpendChart !== null) {
      this._moneyChart = null;
      this._typeChart = null;
      this._timeSpendChart = null;
    }
  }

  getTemplate() {
    return createStatsTemplate(this._data);
  }

  restoreHandlers() {
    this._setCharts();
  }

  _dateChangeHandler([dateFrom, dateTo]) {
    if (!dateFrom || !dateTo) {
      return;
    }

    this.updateData({
      dateFrom,
      dateTo,
    });
  }

  _setCharts() {
    if (this._moneyChart !== null || this._typeChart !== null || this._timeSpendChart !== null) {
      this._moneyChart = null;
      this._typeChart = null;
      this._timeSpendChart = null;
    }

    const moneyCtx = this.getElement().querySelector('#money');
    const typeCtx = this.getElement().querySelector('#type');
    const timeCtx = this.getElement().querySelector('#time-spend');

    moneyCtx.height = BAR_HEIGHT * 5;
    typeCtx.height = BAR_HEIGHT * 5;
    timeCtx.height = BAR_HEIGHT * 5;

    this._moneyChart = renderMoneyChart(moneyCtx, this._data);
    this._typeChart = renderTypeChart(typeCtx, this._data);
    this._timeSpendChart = renderTimeSpendChart(timeCtx, this._data);
  }
}
