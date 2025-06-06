document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("navbar-placeholder").innerHTML = `
<nav class="navbar navbar-expand-lg navbar-light fixed-top">
    <div class="container">
        <a class="navbar-brand" href="/">
            <img src="/assets/nutrivibe.png" alt="NUTRiViBE Logo">
            NUTRiViBE
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav ms-auto">
                <li class="nav-item">
                    <a class="nav-link active" href="/">Home</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/#features">Features</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/#dashboard">Dashboard</a>
                </li>
                
                <li class="nav-item ms-lg-3 mt-2 mt-lg-0">
                    <a class="btn btn-primary" href="/login">Get Started</a>
                </li>
            </ul>
        </div>
    </div>
</nav>
    `;
});
