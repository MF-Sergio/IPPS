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

//Fazer a seleção do ano com dropdown

var selectStartDate = document.getElementById("startDate");

for (var i = 0; i < anosLabels.length; i++) {
  var opt = anosLabels[i];
  var el = document.createElement("option");
  el.textContent = opt;
  el.value = opt;
  selectStartDate.appendChild(el);
}

var selectEndDate = document.getElementById("endDate");

for (var i = anosLabels.length - 1; i >= 0; i--) {
  var opt = anosLabels[i];
  var el = document.createElement("option");
  el.textContent = opt;
  el.value = opt;
  selectEndDate.appendChild(el);
}

// Dados acumulados
const saudeIntegralCumulative = calculateCumulative(saudeIntegralData);
const vivendoEAcolhendoCumulative = calculateCumulative(vivendoEAcolhendoData);

const myChart = new Chart(ctx, {
  type: "line",
  data: {
    labels: anosLabels,
    datasets: [
      {
        label: "Saúde Integral",
        data: saudeIntegralCumulative,
        borderColor: "#00FFFF",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderWidth: 2,
      },
      {
        label: "Vivendo e Acolhendo",
        data: vivendoEAcolhendoCumulative,
        borderColor: "#FF69B4",
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
          color: '#ffffff'
        },
        grid: {
          color: '#ffffff'
        }
      },
      x: {
        ticks: {
          display: true,
          color: '#ffffff'
        },
        grid: {
          color: '#ffffff'
        }
      }
    },
    plugins: {
      tooltip: {
        enabled: true
      },
      legend: {
        display: true,
        labels: {
          color: '#ffffff',
          font: {
            size: 16, // Altere o número conforme desejar
            weight: 'bold',
            family: 'Arial'
          }
        }
      },
    }
  }
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
    label.id = `labelDataset${index}`;

    //adicionar textnode

    let labelText = document.createTextNode(dataset.label);

    label.appendChild(labelText);
    legend.appendChild(checkbox);
    legend.appendChild(label);
  });

  const legend_checkbox = document.querySelectorAll("#legend input");
  legend_checkbox.forEach((checkbox) => {
    checkbox.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        checkbox.checked = !checkbox.checked;
        checkboxEffect(myChart, event);
      }
    });
  });
}

checkbox();

// Funcao para criar efeitos de checkboxes

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

// Funcao para criar Filtro de Datas

function filterData() {
  // Cópia Dados originais
  const saudeIntegralDataCopia = [...saudeIntegralData];
  const vivendoEAcolhendoDataCopia = [...vivendoEAcolhendoData];
  const anosLabelsCopia = [...anosLabels];

  //Array contendo os arrays das cópias
  const arrayDadosCopia = [saudeIntegralDataCopia, vivendoEAcolhendoDataCopia];

  // Pegar as datas limite
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
    const datapoints = arrayDadosCopia[index];
    const filtroDatapoints = datapoints.slice(indexStartDate, indexEndDate + 1);
    const filtroDatapointsCumulative = calculateCumulative(filtroDatapoints);
    dataset.data = filtroDatapointsCumulative;
    myChart.update();
  });
}
