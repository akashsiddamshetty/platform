export const getTotalGameCount = (type, gameInfo) => {
  const data = gameInfo ? JSON.parse(gameInfo).history : [];
  return data.reduce((pre, month) => {
    pre += month[type] ? Number(month[type]) : 0
    return pre;
  }, 0);
};

const getMonthByMonthGameCount = (type, data) => {
  return data.reduce((pre, month) => {
    if(month[type]) {
      return [...pre, month[type]];
    } else return [...pre, 0]
    
  }, []).reverse();
};

const getMonthByMonthRating = (type, data) => {
  return data.reduce((pre, cur) => {
    if(cur[type] || cur[type] === 0) {
      return [...pre, cur[type]];
    } else return [...pre]
  }, []).reverse();
};

const getMonths = (data) => {
  return data.reduce((pre, { month }) => {
    return [...pre, month] 
  }, []);
}

export const RatingProgressChart = (
  ratingInfo
) => {

  const data = ratingInfo ? JSON.parse(ratingInfo) : [];
  const months = getMonths(data).reverse();
  const longPlayRatings = getMonthByMonthRating("standard", data);
  const rapidplayRatings = getMonthByMonthRating("rapid", data);

  return {
    data: {
      labels: [...months],
      datasets: [
        {
          label: "Standard",
          backgroundColor: "#0694a2",
          borderColor: "#0694a2",
          data: [...longPlayRatings],
          fill: false,
        },
        {
          label: "Rapid",
          fill: false,
          backgroundColor: "#f0802b",
          borderColor: "#f0802b",
          data: [...rapidplayRatings],
        },
      ],
    },
    options: {
      responsive: true,
      tooltips: {
        mode: "index",
        intersect: false,
      },
      hover: {
        mode: "nearest",
        intersect: true,
      },
      scales: {
        x: {
          display: true,
          scaleLabel: {
            display: true,
            labelString: "Month",
          },
        },
        y: {
          display: true,
          scaleLabel: {
            display: true,
            labelString: "Value",
          },
        },
      },
    },
    legend: {
      display: false,
    },
  };
};

export const GamesChart = (gameInfo) => {

  const data = gameInfo ? JSON.parse(gameInfo).history : [];
  const months = getMonths(data);
  const standardGamesCount = getMonthByMonthGameCount("standard", data);
  const rapidGamesCount = getMonthByMonthGameCount("rapid", data);

  return {
    data: {
      labels: [...months],
      datasets: [
        {
          label: "Standard",
          backgroundColor: "#0694a2",
          borderWidth: 1,
          data: [...standardGamesCount],
        },
        {
          label: "Rapid",
          backgroundColor: "#f0802b",
          borderWidth: 1,
          data: [...rapidGamesCount],
        },
      ],
    },
    options: {
      responsive: true,
    },
    legend: {
      display: false,
    },
  };
};

export const ResultsDoughnut = (gameInfo) => {

  const stats = gameInfo ? JSON.parse(gameInfo).stats : {};

  const data = {
    datasets: [
      {
        label: '# result',
        data: [stats.wins, stats.draws, stats.losses],
        backgroundColor: [
          "#0694a2",
          "#d53f8c",
          "#f0802b"
        ],
        borderColor: [
          "#0694a2",
          "#d53f8c",
          "#f0802b"
        ],
        borderWidth: 1,
      },
    ],
  };

  return { data }
}
