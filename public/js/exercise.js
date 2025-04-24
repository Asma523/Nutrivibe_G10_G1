// Activity Chart
const activityCtx = document.getElementById('activityChart').getContext('2d');
new Chart(activityCtx, {
    type: 'bar',
    data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [
            {
                label: 'Strength',
                data: [45, 30, 60, 45, 60, 0, 0],
                backgroundColor: 'rgba(72, 187, 120, 0.8)',
                borderColor: 'rgba(72, 187, 120, 1)',
                borderWidth: 1
            },
            {
                label: 'Cardio',
                data: [20, 45, 15, 30, 15, 60, 30],
                backgroundColor: 'rgba(104, 211, 145, 0.8)',
                borderColor: 'rgba(104, 211, 145, 1)',
                borderWidth: 1
            },
            {
                label: 'Flexibility',
                data: [15, 15, 15, 15, 15, 30, 45],
                backgroundColor: 'rgba(129, 230, 217, 0.8)',
                borderColor: 'rgba(129, 230, 217, 1)',
                borderWidth: 1
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
                    color: 'var(--text-color)'
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    drawBorder: false,
                    color: 'rgba(0, 0, 0, 0.05)'
                },
                ticks: {
                    callback: function(value) {
                        return value + ' min';
                    }
                }
            },
            x: {
                grid: {
                    display: false
                },
                ticks: {
                    color: 'var(--text-color)'
                }
            }
        }
    }
});

// Workout Tab Functionality
document.querySelectorAll('.workout-tab').forEach(tab => {
    tab.addEventListener('click', function() {
        // Remove active class from all tabs
        document.querySelectorAll('.workout-tab').forEach(t => {
            t.classList.remove('active');
            t.classList.remove('btn-primary');
            t.classList.add('btn-outline-secondary');
        });
        
        // Add active class to clicked tab
        this.classList.add('active');
        this.classList.add('btn-primary');
        this.classList.remove('btn-outline-secondary');
        
        // Hide all workout sections
        document.querySelectorAll('.workout-section').forEach(section => {
            section.classList.add('d-none');
        });
        
        // Show the selected workout section
        const workoutType = this.getAttribute('data-workout');
        document.getElementById(`${workoutType}-workouts`).classList.remove('d-none');
    });
});