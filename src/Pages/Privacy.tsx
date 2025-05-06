import "../styles/Page.css";
import "../styles/animations.css";

const Privacy = () => {
  return (
    <main>
      <div className="page-container">
        <h1 className="page-title animate-glow">PRIVACY POLICY</h1>
        
        <div className="page-section animate-slideInUp delay-100">
          <h2>1. Introduction</h2>
          <p>
            Welcome to MovieApp's Privacy Policy. Your privacy is important to us. This Privacy Policy explains how MovieApp 
            ("we", "our", or "us") collects, uses, shares, and protects your personal information when you use our website, 
            mobile applications, and services (collectively, the "Services").
          </p>
          <p>
            By using our Services, you agree to the collection and use of information in accordance with this policy. If you 
            do not agree with any part of this policy, please do not use our Services.
          </p>
        </div>
        
        <div className="page-section animate-slideInUp delay-200">
          <h2>2. Information We Collect</h2>
          <p>We collect several types of information for various purposes to provide and improve our Services to you:</p>
          <ul>
            <li>
              <strong>Personal Information:</strong> When you create an account, we collect information such as your name, email 
              address, and password. If you make purchases through our platform, we collect payment information, billing 
              address, and transaction history.
            </li>
            <li>
              <strong>Usage Information:</strong> We collect information about how you interact with our Services, including the 
              movies you view, search queries, pages visited, time spent on the platform, and features used.
            </li>
            <li>
              <strong>Device Information:</strong> We collect information about the devices you use to access our Services, 
              including device type, operating system, browser, IP address, and mobile device identifiers.
            </li>
            <li>
              <strong>Location Information:</strong> With your consent, we collect information about your general location to 
              show you relevant movie sessions and theaters near you.
            </li>
          </ul>
        </div>
        
        <div className="page-section animate-slideInUp delay-300">
          <h2>3. How We Use Your Information</h2>
          <p>We use the information we collect for various purposes, including:</p>
          <ul>
            <li>Providing, maintaining, and improving our Services</li>
            <li>Processing transactions and sending related information</li>
            <li>Sending administrative messages and service announcements</li>
            <li>Personalizing your experience and delivering content relevant to your interests</li>
            <li>Analyzing usage patterns to enhance our Services</li>
            <li>Detecting, preventing, and addressing technical issues and fraudulent activities</li>
            <li>Complying with legal obligations</li>
          </ul>
        </div>
        
        <div className="page-section animate-slideInUp delay-400">
          <h2>4. Sharing of Information</h2>
          <p>We may share your information with:</p>
          <ul>
            <li>
              <strong>Service Providers:</strong> Third-party companies that perform services on our behalf, such as payment 
              processing, data analysis, email delivery, and customer service.
            </li>
            <li>
              <strong>Business Partners:</strong> Theater operators and film distributors to facilitate ticket purchases and 
              provide relevant information about movie showings.
            </li>
            <li>
              <strong>Legal Requirements:</strong> When required by law or when we believe disclosure is necessary to protect 
              our rights, protect your safety or the safety of others, investigate fraud, or respond to a government request.
            </li>
            <li>
              <strong>Business Transfers:</strong> In connection with any merger, sale of company assets, financing, or 
              acquisition of all or a portion of our business.
            </li>
          </ul>
          <p>
            We do not sell your personal information to third parties for marketing purposes without your explicit consent.
          </p>
        </div>
        
        <div className="page-section animate-slideInUp delay-500">
          <h2>5. Data Security</h2>
          <p>
            We implement appropriate technical and organizational measures to protect the security of your personal information. 
            However, please be aware that no method of transmission over the Internet or method of electronic storage is 100% 
            secure. While we strive to use commercially acceptable means to protect your personal information, we cannot 
            guarantee its absolute security.
          </p>
        </div>
        
        <div className="page-section animate-slideInUp">
          <h2>6. Your Choices and Rights</h2>
          <p>Depending on your location, you may have certain rights regarding your personal information, including:</p>
          <ul>
            <li>Accessing, updating, or deleting your personal information</li>
            <li>Objecting to our processing of your data</li>
            <li>Requesting that we restrict the processing of your personal information</li>
            <li>Requesting a copy of your personal information in a structured, machine-readable format</li>
            <li>Withdrawing consent at any time where we rely on consent to process your personal information</li>
          </ul>
          <p>
            To exercise these rights, please contact us at privacy@movieapp.com. Please note that we may ask you to verify 
            your identity before responding to such requests.
          </p>
        </div>
        
        <div className="page-section animate-slideInUp">
          <h2>7. Changes to This Privacy Policy</h2>
          <p>
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy 
            Policy on this page and updating the "Last updated" date. You are advised to review this Privacy Policy 
            periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
          </p>
        </div>
        
        <div className="page-contact animate-slideInUp">
          <h2>Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at:
          </p>
          <p>Email: <a href="mailto:privacy@movieapp.com">privacy@movieapp.com</a></p>
          <p>
            MovieApp LLC<br />
            24 Kinoshna St.<br />
            Kyiv, Ukraine, 02000
          </p>
        </div>
        
        <p className="last-updated">Last updated: May 2025</p>
      </div>
    </main>
  );
};

export default Privacy; 