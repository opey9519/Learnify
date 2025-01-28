import "./PrivacyPolicyContent.css"

function PrivacyPolicyContent() {
    return (
        <div className="container PrivacyPolicy">
            <h1 className="privacyHeader">Privacy Policy</h1>

            <section>
                <h2 className="privacySubHeader">1. Introduction</h2>
                <p>
                    At Learnify, we value your privacy and are committed to protecting your personal information. This Privacy Policy outlines how we collect, use, and safeguard your data when you use our app.
                </p>
            </section>

            <section>
                <h2 className="privacySubHeader">2. Information We Collect</h2>
                <p>
                    We collect the following information to improve your experience:
                </p>
                <ul>
                    <li>Personal information: Name, email address, and account details.</li>
                    <li>Flashcard data: Content you create or generate using AI tools.</li>
                    <li>Technical data: IP address, device information, and usage statistics.</li>
                    <li>Cookies: To enhance app performance and usability.</li>
                </ul>
            </section>

            <section>
                <h2 className="privacySubHeader">3. How We Use Your Information</h2>
                <p>
                    We use your information for the following purposes:
                </p>
                <ul>
                    <li>To create and manage your account.</li>
                    <li>To improve app functionality and user experience.</li>
                    <li>To provide study insights and notifications.</li>
                    <li>To communicate with you regarding updates or support.</li>
                </ul>
            </section>

            <section>
                <h2 className="privacySubHeader">4. Sharing of Information</h2>
                <p>
                    We do not sell or rent your personal data to third parties. However, we may share data with:
                </p>
                <ul>
                    <li>Service providers: To maintain and improve the app (e.g., hosting, analytics).</li>
                    <li>Legal authorities: If required by law or to protect Learnify's rights.</li>
                </ul>
            </section>

            <section>
                <h2 className="privacySubHeader">5. Data Storage and Security</h2>
                <p>
                    Your data is stored on secure servers with industry-standard encryption. We take every precaution to protect your data from unauthorized access.
                </p>
            </section>

            <section>
                <h2 className="privacySubHeader">6. Your Rights</h2>
                <p>
                    You have the right to:
                </p>
                <ul>
                    <li>Access and review the data we have collected about you.</li>
                    <li>Request deletion of your account and data.</li>
                    <li>Opt-out of receiving non-essential notifications.</li>
                </ul>
            </section>

            <section>
                <h2 className="privacySubHeader">7. Third-Party Services</h2>
                <p>
                    Learnify uses third-party services such as OpenAI API for AI-generated content. These services have their own privacy policies, which we encourage you to review.
                </p>
            </section>

            <section>
                <h2 className="privacySubHeader">8. Children’s Privacy</h2>
                <p>
                    Learnify is not intended for children under 13. We do not knowingly collect personal data from children. If you believe a child under 13 has provided us with personal data, please contact us.
                </p>
            </section>

            <section>
                <h2 className="privacySubHeader">9. Policy Updates</h2>
                <p>
                    We may update this Privacy Policy from time to time. Significant changes will be communicated via email or app notifications. The latest version will always be available on this page.
                </p>
            </section>

            <section>
                <h2 className="privacySubHeader">10. Contact Us</h2>
                <p>
                    If you have any questions or concerns about this Privacy Policy, please email us at <span>MessageLearnify@gmail.com</span>.
                </p>
            </section>
        </div>
    );
}

export default PrivacyPolicyContent;