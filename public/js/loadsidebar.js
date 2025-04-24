// Initialize AOS animation
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true
});

// Set current date
const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
document.getElementById('current-date').textContent = new Date().toLocaleDateString('en-US', options);

document.addEventListener("DOMContentLoaded", function () {
    // Extract userId from URL dynamically
    const pathParts = window.location.pathname.split("/");
    const userId = pathParts.length > 2 ? pathParts[2] : "defaultUser"; // Fallback if no ID

    console.log("Detected user ID:", userId); // Debugging

    document.getElementById("sidebar-container").innerHTML = `
        <div class="logo-container floating mb-4">
            <a href="/"><img src="/assets/nutrivibe.png" alt="NUTRiViBE Logo" height="40"></a>
        </div>
        <div class="d-flex flex-column align-items-center">
            <a href="/dashboard/${userId}" class="sidebar-icon"><i class="fas fa-th-large"></i></a>
            <a href="/dashboard/${userId}/diet" class="sidebar-icon"><i class="fas fa-utensils"></i></a>
            <a href="/dashboard/${userId}/exercise" class="sidebar-icon"><i class="fas fa-dumbbell"></i></a>
            <a href="/dashboard/${userId}/streak" class="sidebar-icon"><i class="fas fa-fire"></i></a>
            <a href="/dashboard/${userId}/chatbot" class="sidebar-icon active"><i class="fas fa-robot"></i></a>
        </div>
    `;
});
