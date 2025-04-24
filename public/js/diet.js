 // Nutrition Chart
 const nutritionCtx = document.getElementById('nutritionChart').getContext('2d');
 new Chart(nutritionCtx, {
     type: 'doughnut',
     data: {
         labels: ['Protein', 'Carbs', 'Fat', 'Fiber'],
         datasets: [{
             data: [148, 210, 72, 25],
             backgroundColor: [
                 'rgba(72, 187, 120, 0.8)',
                 'rgba(255, 193, 7, 0.8)',
                 'rgba(220, 53, 69, 0.8)',
                 'rgba(104, 211, 145, 0.8)'
             ],
             borderColor: [
                 'rgba(72, 187, 120, 1)',
                 'rgba(255, 193, 7, 1)',
                 'rgba(220, 53, 69, 1)',
                 'rgba(104, 211, 145, 1)'
             ],
             borderWidth: 1
         }]
     },
     options: {
         responsive: true,
         maintainAspectRatio: false,
         plugins: {
             legend: {
                 position: 'right',
                 labels: {
                     boxWidth: 12,
                     padding: 20,
                     color: 'var(--text-color)'
                 }
             }
         },
         cutout: '70%'
     }
 });

 // Meal Tab Functionality
 document.querySelectorAll('.meal-tab').forEach(tab => {
     tab.addEventListener('click', function() {
         // Remove active class from all tabs
         document.querySelectorAll('.meal-tab').forEach(t => {
             t.classList.remove('active');
             t.classList.remove('btn-primary');
             t.classList.add('btn-outline-secondary');
         });
         
         // Add active class to clicked tab
         this.classList.add('active');
         this.classList.add('btn-primary');
         this.classList.remove('btn-outline-secondary');
         
         // Hide all meal sections
         document.querySelectorAll('.meal-section').forEach(section => {
             section.classList.add('d-none');
         });
         
         // Show the selected meal section
         const mealType = this.getAttribute('data-meal');
         document.getElementById(`${mealType}-meals`).classList.remove('d-none');
     });
 });