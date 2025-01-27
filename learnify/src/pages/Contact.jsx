import Header from "../components/Header";
import ContactInfo from "../components/ContactInfo";
import Footer from "../components/Footer";
import ContactInfoPara from "../components/ContactInfoPara";

function Contact() {
    return (
        <div>
            <Header />
            <ContactInfoPara />
            <ContactInfo />
            <Footer />
        </div>
    );
}

export default Contact;