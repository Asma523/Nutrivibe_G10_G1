document.addEventListener("DOMContentLoaded", function () {
    const ctx = document.getElementById('streakHistoryChart').getContext('2d');

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
            datasets: [
                {
                    label: 'Nutrition',
                    data: [12, 19, 15, 28, 24, 32, 42],
                    borderColor: 'rgba(40, 167, 69, 1)',
                    backgroundColor: 'rgba(40, 167, 69, 0.1)',
                    tension: 0.3,
                    fill: true
                },
                {
                    label: 'Exercise',
                    data: [8, 12, 10, 15, 18, 25, 28],
                    borderColor: 'rgba(220, 53, 69, 1)',
                    backgroundColor: 'rgba(220, 53, 69, 0.1)',
                    tension: 0.3,
                    fill: true
                },
                {
                    label: 'Hydration',
                    data: [10, 14, 12, 18, 20, 28, 35],
                    borderColor: 'rgba(23, 162, 184, 1)',
                    backgroundColor: 'rgba(23, 162, 184, 0.1)',
                    tension: 0.3,
                    fill: true
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        boxWidth: 12,
                        padding: 20,
                        color: '#333' // You can make this '#fff' for dark mode
                    }
                },
                tooltip: {
                    mode: 'index',
                    intersect: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Days',
                        color: '#555'
                    },
                    ticks: {
                        color: '#444'
                    },
                    grid: {
                        color: 'rgba(200,200,200,0.2)'
                    }
                },
                x: {
                    ticks: {
                        color: '#444'
                    },
                    grid: {
                        color: 'rgba(200,200,200,0.1)'
                    }
                }
            }
        }
    });
});
