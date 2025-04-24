document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("footer-placeholder").innerHTML = `
        <footer class="footer">
    <div class="container">
        <div class="row">
            <div class="col-lg-6 mb-5 mb-lg-0">
                <a href="/" class="footer-logo">
                    <img src="/assets/nutrivibe.png" alt="NUTRiViBE Logo">
                    NUTRiViBE
                </a>
                <p>Your complete health and wellness companion that helps you achieve your goals through smart tracking, personalized recommendations, and engaging tools.</p>
                
            </div>
            <div class="col-lg-2 col-md-6 mb-4 mb-md-0">
                <div class="footer-links">
                    <h5>Product</h5>
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="/#features">Features</a></li>
                        <li><a href="/#dashboard">Dashboard</a></li>
                        <li><a href="/faq">FAQ</a></li>
                    </ul>
                </div>
            </div>
            <div class="col-lg-2 col-md-6 mb-4 mb-md-0">
                <div class="footer-links">
                    <h5>Company</h5>
                    <ul>
                        <li><a href="/">About</a></li>
                        <li><a href="/team">Team</a></li>
                    </ul>
                </div>
            </div>
            <div class="col-lg-2 col-md-6">
                <div class="footer-links">
                    <h5>Legal</h5>
                    <ul>
                        <li><a href="/privacy">Privacy</a></li>
                        <li><a href="/terms">Terms</a></li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="copyright text-center">
            <p>&copy; <span id="year"></span> NUTRiViBE. All rights reserved.</p>
        </div>
    </div>
</footer>
    `;
});
