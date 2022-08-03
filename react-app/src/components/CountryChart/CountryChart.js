import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import {
  Chart as ChartJS, ArcElement, Tooltip, Legend
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const options = {
  plugins: {
    legend: {
      position: 'bottom',
      labels: {
      }
    },
    datalabels: {
      color: 'black',
      formatter: (val, ctx) => {
        // Grab the label for this value
        const label = ctx.chart.data.labels[ctx.dataIndex];

        // Add percentage sign
        const formattedVal = `${val}%`;

        // Put them together
        return `${label}: ${formattedVal}`;
      },
    }
  }
};

/**
 * Extract data from randomuser.me, into format understandable by chars.js
 *
 * @param users
 * @returns {{datasets: [{backgroundColor: string[], data: *[], borderWidth: number}], labels: *[]}}
 */
const extractData = (users) => {
  const oUsersCountByCountry = {};
  const arrUsersCountByCountry = [];

  users.forEach((user) => {
    oUsersCountByCountry[user.location.country] = oUsersCountByCountry[user.location.country] ? oUsersCountByCountry[user.location.country] + 1 : 1;
  });

  for (const country in oUsersCountByCountry) {
    arrUsersCountByCountry.push({
      country, userCount: oUsersCountByCountry[country]
    });
  }

  // Sort by highest user count first to lowest user count
  arrUsersCountByCountry.sort((a, b) => b.userCount - a.userCount);

  const labels = [];
  const data = [];
  let othersPercentage = 100;

  arrUsersCountByCountry.slice(0, 5).forEach((o) => {
    labels.push(o.country);
    const countryPercentage = ((100 * o.userCount) / users.length).toFixed(2);

    data.push( countryPercentage );
    othersPercentage -= countryPercentage;
  });

  if (arrUsersCountByCountry.length > 5) {
    labels.push('Others');
    data.push(othersPercentage.toFixed(2));
  }

  return {
    labels,
    datasets: [
      {
        data,
        backgroundColor: [
          '#5383EC',
          '#58A65C',
          '#F1BF42',
          '#ED762F',
          '#69BBC4',
          '#D85140',
        ],
        borderWidth: 0,
      },
    ]
  };
};

export default function CountryChart(props) {
  const { users } = props;
  const data = extractData(users);

  return <Pie data={data} options={options} />;
}
