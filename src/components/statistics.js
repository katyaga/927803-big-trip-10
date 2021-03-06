import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import moment from 'moment';
import AbstractSmartComponent from './abstract-smart-component.js';
import {TRANSFER_NAMES} from "../const";

const getUniqItems = (item, index, array) => {
  return array.indexOf(item) === index;
};

const getTravelTypes = (points) => {
  return points.flat().map((point) => point.type)
    .filter(getUniqItems);
};

const createChart = (ctx, title, labels, getValues) => {
  return new Chart(ctx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: labels.map((typeName) => typeName.toUpperCase()),
      datasets: [{
        data: getValues(),
        backgroundColor: `white`,
        hoverBackgroundColor: `white`,
        borderColor: `transparent`,
        borderWidth: 0,
        barThickness: 40,
        datalabels: {
          align: `left`,
          anchor: `end`,
        }
      }]
    },
    options: {
      plugins: {
        datalabels: {
          fontSize: 14,
          color: `#000000`,
          formatter(value) {
            if (title === `MONEY`) {
              return `$ ` + value;
            } else if (title === `TRANSPORT`) {
              return value + `x`;
            } else if (title === `TIME SPENT`) {
              const getHours = () => {
                const hours = Math.floor(moment.duration(value).asHours());

                if (hours) {
                  return `${hours < 10 ? `0${hours}H ` : `${hours}H `}`;
                } else {
                  return ``;
                }
              };

              const getMinutes = () => {
                const minutes = moment.duration(value).get(`minutes`);
                if (minutes) {
                  return `${minutes < 10 ? `0${minutes}M ` : `${minutes}M `}`;
                } else {
                  return ``;
                }
              };

              return (`${getHours()}${getMinutes()}`);
            }
            return null;
          },
        }
      },
      title: {
        display: true,
        text: title,
        position: `left`,
        fontSize: 20,
        fontStyle: `bold`,
        fontColor: `#000000`
      },
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true,
            display: true,
            fontSize: 14,
            fontColor: `#000000`,
            position: `left`,
          },
          gridLines: {
            display: false,
            drawBorder: false
          }
        }],
        xAxes: [{
          ticks: {
            min: 0,
            display: false,
          },
          gridLines: {
            display: false,
            drawBorder: false
          }
        }]
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false
      }
    }
  });
};

const renderPricesChart = (pricesCtx, points) => {
  const uniqTravelTypes = getTravelTypes(points);

  const typesPrices = uniqTravelTypes.map((uniqTravelType) => {
    return {
      name: uniqTravelType,
      price: 0,
    };
  });

  const getTravelPrices = () => {
    points.forEach((point) => {
      const uniqTravelType = typesPrices.find(
          (item) => item.name === point.type
      );
      uniqTravelType.price += point.price;
    });

    return typesPrices.map((uniqTravelType) => uniqTravelType.price);
  };

  createChart(pricesCtx, `MONEY`, uniqTravelTypes, getTravelPrices);
};

const renderTransportCountChart = (transportCountCtx, points) => {
  const uniqTransportTypes = getTravelTypes(points).filter(
      (travelType) => TRANSFER_NAMES.includes(travelType)
  );

  const typesCounts = uniqTransportTypes.map((uniqTransportType) => {
    return {
      name: uniqTransportType,
      count: 0,
    };
  });

  const getTransportCount = () => {
    points.forEach((point) => {
      if (TRANSFER_NAMES.includes(point.type)) {
        const uniqTransportType = typesCounts.find(
            (item) => item.name === point.type
        );

        uniqTransportType.count += 1;
      }
    });

    return typesCounts.map((uniqTransportType) => uniqTransportType.count);
  };

  createChart(transportCountCtx, `TRANSPORT`, uniqTransportTypes, getTransportCount);
};

const renderTimeChart = (timeSpentCtx, points) => {
  const uniqTravelTypes = getTravelTypes(points);
  const typesTime = uniqTravelTypes.map((uniqTravelType) => {
    return {
      name: uniqTravelType,
      duration: 0,
    };
  });

  const getTimeSpent = () => {
    points.forEach((point) => {
      const duration = point.dateEnd - point.dateStart;
      const uniqTravelType = typesTime.find(
          (item) => item.name === point.type
      );
      uniqTravelType.duration += duration;
    });

    return typesTime.map((uniqTravelType) => uniqTravelType.duration);
  };

  createChart(timeSpentCtx, `TIME SPENT`, uniqTravelTypes, getTimeSpent);
};

const createStatisticsTemplate = () => {
  return (
    `<section class="statistics">
          <h2>Trip statistics</h2>

          <div class="statistics__item statistics__item--money">
            <canvas class="statistics__chart  statistics__chart--money" width="900"></canvas>
          </div>

          <div class="statistics__item statistics__item--transport">
            <canvas class="statistics__chart  statistics__chart--transport" width="900"></canvas>
          </div>

          <div class="statistics__item statistics__item--time-spend">
            <canvas class="statistics__chart  statistics__chart--time" width="900"></canvas>
          </div>
        </section>`
  );
};

export default class Statistics extends AbstractSmartComponent {
  constructor(points) {
    super();

    this._points = points;

    this._priceChart = null;
    this._transportCountChart = null;
    this._timeChart = null;

    this._renderCharts();
  }

  getTemplate() {
    return createStatisticsTemplate();
  }

  show() {
    super.show();

    this.rerender(this._points);
  }

  recoveryListeners() {}

  rerender(points) {

    this._points = points;

    super.rerender();

    this._renderCharts();
  }

  _renderCharts() {
    const element = this.getElement();

    const pricesCtx = element.querySelector(`.statistics__chart--money`);
    const transportCountCtx = element.querySelector(`.statistics__chart--transport`);
    const timeSpentCtx = element.querySelector(`.statistics__chart--time`);

    this._resetCharts();

    this._priceChart = renderPricesChart(pricesCtx, this._points);
    this._transportCountChart = renderTransportCountChart(transportCountCtx, this._points);
    this._timeChart = renderTimeChart(timeSpentCtx, this._points);
  }

  _resetCharts() {
    if (this._priceChart) {
      this._priceChart.destroy();
      this._priceChart = null;
    }

    if (this._transportCountChart) {
      this._transportCountChart.destroy();
      this._transportCountChart = null;
    }

    if (this._timeChart) {
      this._timeChart.destroy();
      this._timeChart = null;
    }
  }
}
