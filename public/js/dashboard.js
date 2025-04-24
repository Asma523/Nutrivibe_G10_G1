const bloodSugarCtx = document.getElementById('bloodSugarChart').getContext('2d');
new Chart(bloodSugarCtx, {
    type: 'line',
    data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        datasets: [{
            label: 'Blood Sugar',
            data: [80, 85, 78, 90, 88, 82, 80],
            borderColor: 'rgba(255, 193, 7, 1)',
            backgroundColor: 'rgba(255, 193, 7, 0.1)',
            fill: true,
            tension: 0.4,
            pointRadius: 0,
            borderWidth: 2
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            }
        },
        scales: {
            y: {
                beginAtZero: false,
                display: false,
                grid: {
                    display: false
                }
            },
            x: {
                display: false,
                grid: {
                    display: false
                }
            }
        }
    }
});

// Heart Rate Chart
const heartRateCtx = document.getElementById('heartRateChart').getContext('2d');
new Chart(heartRateCtx, {
    type: 'line',
    data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        datasets: [{
            label: 'Heart Rate',
            data: [98, 100, 95, 102, 99, 97, 98],
            borderColor: 'rgba(220, 53, 69, 1)',
            backgroundColor: 'rgba(220, 53, 69, 0.1)',
            fill: true,
            tension: 0.4,
            pointRadius: 0,
            borderWidth: 2
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            }
        },
        scales: {
            y: {
                beginAtZero: false,
                display: false,
                grid: {
                    display: false
                }
            },
            x: {
                display: false,
                grid: {
                    display: false
                }
            }
        }
    }
});

// Blood Pressure Chart
const bloodPressureCtx = document.getElementById('bloodPressureChart').getContext('2d');
new Chart(bloodPressureCtx, {
    type: 'line',
    data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        datasets: [{
            label: 'Blood Pressure',
            data: [102, 105, 100, 110, 108, 104, 102],
            borderColor: 'rgba(72, 187, 120, 1)',
            backgroundColor: 'rgba(72, 187, 120, 0.1)',
            fill: true,
            tension: 0.4,
            pointRadius: 0,
            borderWidth: 2
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            }
        },
        scales: {
            y: {
                beginAtZero: false,
                display: false,
                grid: {
                    display: false
                }
            },
            x: {
                display: false,
                grid: {
                    display: false
                }
            }
        }
    }
});

// Assuming userHeight and userWeight are already defined
const calculateBMI = (weight, height) => {
    const h = height / 100;
    return (weight / (h * h)).toFixed(1);
};

const getActivityBaseByBMI = (bmi) => {
    if (bmi < 18.5) {
        // Underweight: focus more on light yoga and meditation, avoid intense aerobics
        return {
            aerobics: 1.5,
            yoga: 3.5,
            meditation: 4
        };
    } else if (bmi < 24.9) {
        // Normal: balanced routine
        return {
            aerobics: 3.5,
            yoga: 3,
            meditation: 2
        };
    } else if (bmi < 29.9) {
        // Overweight: focus more on fat burning via aerobics, but include mindfulness
        return {
            aerobics: 4.5,
            yoga: 2.5,
            meditation: 2.5
        };
    } else {
        // Obese: strong focus on aerobic movement and mental calmness
        return {
            aerobics: 5,
            yoga: 1.5,
            meditation: 3.5
        };
    }
};


const generateProgression = (base) => {
    const progression = [];
    for (let i = 0; i < 7; i++) {
        progression.push(parseFloat((base + i * 0.2 * base).toFixed(1)));
    }
    return progression;
};

const bmi = calculateBMI(userWeight, userHeight);
const activityBase = getActivityBaseByBMI(bmi);

const aerobicsData = generateProgression(activityBase.aerobics);
const yogaData = generateProgression(activityBase.yoga);
const meditationData = generateProgression(activityBase.meditation);

// 🎯 Now plug this into Chart.js
const ctx = document.getElementById('activityGrowthChart').getContext('2d');
new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
        datasets: [
            {
                label: 'Aerobics',
                data: aerobicsData,
                backgroundColor: 'rgba(129, 230, 217, 0.7)',
                borderColor: 'rgba(129, 230, 217, 1)',
                borderWidth: 1
            },
            {
                label: 'Yoga',
                data: yogaData,
                backgroundColor: 'rgba(72, 187, 120, 0.7)',
                borderColor: 'rgba(72, 187, 120, 1)',
                borderWidth: 1
            },
            {
                label: 'Meditation',
                data: meditationData,
                backgroundColor: 'rgba(255, 193, 7, 0.7)',
                borderColor: 'rgba(255, 193, 7, 1)',
                borderWidth: 1
            }
        ]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom'
            },
            title: {
                display: true,
                text: `Your Weekly Wellness Plan (Based on BMI: ${bmi})`
            }
        },
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});
