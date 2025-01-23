import "./Footer.css"

function Footer() {
    return (
        <footer class="Footer">
            <div class="container">
                {/* CopyRight */}
                <p class="mb-2">© 2025 Learnify. All rights reserved.</p>

                {/* Mission Statement */}
                <p class="small mb-4">
                    Learn smarter, not harder—one flashcard at a time.
                </p>

                {/* Links */}
                <div class="mb-3 mediaLinks">
                    {/* Github Link */}
                    <a
                        href="https://github.com/opey9519"
                        class="text-light mx-2 mediaLink"
                        aria-label="GitHub"
                    >
                        <i class="fab fa-github">
                            <img id="githubPhoto" src="./images/github-mark.png" alt="" />
                            GitHub
                            </i>
                    </a>
                    {/* LinkedIn Link */}
                    <a
                        href="https://linkedin.com/in/yourprofile"
                        class="text-light mx-2 mediaLink"
                        aria-label="LinkedIn"
                    >
                        <i class="fab fa-linkedin">
                            <img id="linkedinPhoto" src="./images/LI-In-Bug.png" alt="" />
                            LinkedIn
                        </i>
                    </a>
                </div>

                {/* Nav */}
                <div>
                    <a href="/about" class="text-light text-decoration-none mx-3 specLinks">
                        About
                    </a>
                    <a href="/privacy-policy" class="text-light text-decoration-none mx-3 specLinks">
                        Privacy Policy
                    </a>
                    <a href="/terms-of-service" class="text-light text-decoration-none mx-3 specLinks">
                        Terms of Service
                    </a>
                    <a href="/contact" class="text-light text-decoration-none mx-3 specLinks">
                        Contact
                    </a>
                </div>

                {/* Web App Version */}
                <p class="small mt-3">Version 1.0.0</p>
            </div>
        </footer>

    );
}

export default Footer;