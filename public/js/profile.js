// // Placeholder function to populate profile data (replace with actual data source)
function loadProfileData() {

    // Create health metrics chart
    createHealthMetricsChart();

    // Create nutrition chart
    createNutritionChart();


    updateWeightProgress(user);
    getProgressStats(user)
}


function updateWeightProgress(user) {
    const currentWeight = parseFloat(user.weight); // treated as starting weight
    const targetWeight = parseFloat(user.healthGoals.targetWeight);

    const isWeightGain = targetWeight > currentWeight;
    const label = isWeightGain ? "Weight Gain Progress" : "Weight Loss Progress";

    const totalDifference = Math.abs(targetWeight - currentWeight); // full journey
    const stepSize = totalDifference / 10; // how much weight per step
    const stepProgress = stepSize; // we're showing only step 1 for now
    const progressPercent = (1 / 10 * 100).toFixed(1); // always 10% for now

    const labelElement = document.getElementById("progress-label");
    const valueElement = document.getElementById("progress-value");
    const barElement = document.getElementById("progress-bar");

    if (labelElement && valueElement && barElement) {
        labelElement.textContent = label;
        valueElement.textContent = `${stepProgress.toFixed(1)}/${totalDifference.toFixed(1)} kg (Step 1 of 10 - ${progressPercent}%)`;
        barElement.style.width = `${progressPercent}%`;
    }
}

function getProgressStats(user) {
    const startWeight = parseFloat(user.weight);
    const targetWeight = parseFloat(user.healthGoals.targetWeight);

    const totalDifference = targetWeight - startWeight;
    const tenPercentProgress = totalDifference * 0.10;
    const currentWeight = (startWeight + tenPercentProgress).toFixed(1);

    // Progress percentage is fixed as 10%
    const progressPercent = 10;

    // Assuming total goal duration is 4 weeks (1 month)
    const totalWeeks = 4;
    const weeks =  (progressPercent / 100) * totalWeeks;

    const weightChange = Math.abs(currentWeight - startWeight).toFixed(1);

    return {
        weeks,
        weightChange,
        progressPercent,
        currentWeight: parseFloat(currentWeight)
    };
}


// Update the DOM
const stats = getProgressStats(user);

document.getElementById("weeks").textContent = stats.weeks;
document.getElementById("weight-change").textContent = stats.weightChange;
document.getElementById("progress-percent").textContent = stats.progressPercent + "%";



// Function to calculate the target date
function getTargetDate() {
    // Example logic: today + 30 days
    const today = new Date();
    const target = new Date();
    target.setDate(today.getDate() + 30);

    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return target.toLocaleDateString(undefined, options);
}

// Display it on the page
document.addEventListener('DOMContentLoaded', function () {
    const targetDateElement = document.getElementById('targetDate');
    if (targetDateElement) {
        targetDateElement.textContent = getTargetDate();
    }
});


function createHealthMetricsChart() {
    const ctx = document.getElementById('healthMetricsChart').getContext('2d');
    const chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [
                {
                    label: 'Weight (kg)',
                    data: [78.2, 76.5, 74.8, 73.1, 71.4, 70.0],
                    borderColor: '#48bb78',
                    backgroundColor: 'rgba(72, 187, 120, 0.1)',
                    tension: 0.3,
                    fill: true
                },
                {
                    label: 'Body Fat %',
                    data: [28, 26.5, 25, 23.5, 22, 20.8],
                    borderColor: '#4299e1',
                    backgroundColor: 'rgba(66, 153, 225, 0.1)',
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
                    position: 'top',
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                }
            },
            scales: {
                y: {
                    beginAtZero: false
                }
            }
        }
    });
}

function createNutritionChart() {
    const ctx = document.getElementById('nutritionChart').getContext('2d');
    const chart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Carbs', 'Protein', 'Fat'],
            datasets: [{
                data: [45, 30, 25],
                backgroundColor: [
                    '#f6ad55',
                    '#68d391',
                    '#f687b3'
                ],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '70%',
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
}



// Load profile data on page load
window.onload = loadProfileData;