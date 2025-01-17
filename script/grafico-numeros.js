const ctx = document.getElementById("myChart").getContext("2d");

// Função para calcular os valores acumulados
function calculateCumulative(data) {
  let cumulative = [];
  data.reduce((acc, value, index) => {
    cumulative[index] = acc + value;
    return cumulative[index];
  }, 0);
  return cumulative;
}

// Dados originais
const saudeIntegralData = [
  1780, 3304, 3534, 4773, 6978, 5141, 4755, 4257, 3912, 1839, 2698, 1781, 1605,
  1087,
];
const vivendoEAcolhendoData = [
  3439, 6227, 4114, 3308, 4637, 4555, 5488, 4604, 4477, 2614, 1429, 1167, 2400,
  1300,
];

// Dados acumulados
const saudeIntegralCumulative = calculateCumulative(saudeIntegralData);
const vivendoEAcolhendoCumulative = calculateCumulative(vivendoEAcolhendoData);

const anosLabels = [
  "2011",
  "2012",
  "2013",
  "2014",
  "2015",
  "2016",
  "2017",
  "2018",
  "2019",
  "2020",
  "2021",
  "2022",
  "2023",
  "2024",
];

const myChart = new Chart(ctx, {
  type: "line",
  data: {
    labels: anosLabels,
    datasets: [
      {
        label: "Saúde Integral",
        data: saudeIntegralCumulative,
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderWidth: 2,
      },
      {
        label: "Vivendo e Acolhendo",
        data: vivendoEAcolhendoCumulative,
        borderColor: "rgba(153, 102, 255, 1)",
        backgroundColor: "rgba(153, 102, 255, 0.2)",
        borderWidth: 2,
      },
    ],
  },
  options: {
    animation: {
      duration: 0,
    },
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          display: true,
        },
      },
      x: {
        ticks: {
          display: true,
        },
      },
    },
    plugins: {
      tooltip: {
        enabled: true,
      },
      legend: {
        display: true,
      },
    },
  },
});

// Funcao para criar checkboxes

function checkbox() {
  const legend = document.getElementById("legend");
  myChart.data.datasets.forEach((dataset, index) => {
    //adiciona checkboxes inputs do tipo "checkbox"
    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.name = dataset.label;

    checkbox.value = index;
    checkbox.id = `dataset${index}`;
    checkbox.checked = true;

    //adicionar label

    let label = document.createElement("label");
    label.htmlFor = `dataset${index}`;

    //adicionar textnode

    let labelText = document.createTextNode(dataset.label);

    label.appendChild(labelText);
    legend.appendChild(checkbox);
    legend.appendChild(label);
  });
}

checkbox();

function checkboxEffect(chart, element) {
  const index = element.target.value;
  if (chart.isDatasetVisible(index)) {
    chart.hide(index);
  } else {
    chart.show(index);
  }
}

const dataset0 = document.getElementById("dataset0");
const dataset1 = document.getElementById("dataset1");

dataset0.addEventListener("change", (e) => {
  checkboxEffect(myChart, e);
});
dataset1.addEventListener("change", (e) => {
  checkboxEffect(myChart, e);
});

// Funcao para criar Filtro de datas

function filterData() {
  const anosLabelsCopia = [...anosLabels];

  const startDate = document.getElementById("startDate");
  const endDate = document.getElementById("endDate");

  // Pegar o numero do indice do array

  const indexStartDate = anosLabelsCopia.indexOf(startDate.value);
  const indexEndDate = anosLabelsCopia.indexOf(endDate.value);

  // Fazer um slice do array para mostrar somente o intervalo selecionado

  const filtroAnos = anosLabelsCopia.slice(indexStartDate, indexEndDate + 1);

  //Substituir as labels do gráfico
  myChart.data.labels = filtroAnos;

  //datapoints
  myChart.data.datasets.forEach((dataset, index) => {
    const datapoints = dataset.data;
    const filtroDatapoints = datapoints.slice(indexStartDate, indexEndDate + 1);
    dataset.data = filtroDatapoints;
    myChart.update();
  });
  //resetar os valores
  myChart.data.datasets[0].data = saudeIntegralCumulative;
  myChart.data.datasets[1].data = vivendoEAcolhendoCumulative;
  myChart.data.labels = anosLabelsCopia;
}
