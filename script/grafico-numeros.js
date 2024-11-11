const ctx = document.getElementById('myChart').getContext('2d');
const myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024'],
        datasets: [
            {
                label: 'Saúde Integral',
                data: [1780, 3304, 3534, 4773, 6978, 5141, 4755, 4257, 3912, 1839, 2698, 1781, 1605, 1087],
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderWidth: 2
            },
            {
                label: 'PSE',
                data: [3439, 6227, 4114, 3308, 4637, 4555, 5488, 4604, 4477, 2614, 1429, 1167, 2400, 1300],
                borderColor: 'rgba(153, 102, 255, 1)',
                backgroundColor: 'rgba(153, 102, 255, 0.2)',
                borderWidth: 2
            }
        ]
    },
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});