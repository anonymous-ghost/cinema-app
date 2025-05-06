import { useEffect } from "react";
import "../styles/Page.css";
import "../styles/animations.css";

const FAQ = () => {
  useEffect(() => {
    // Додавання обробника кліків для розгортання FAQ відповідей
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    const toggleFaq = (event: Event) => {
      // Отримання батьківського елемента faq-item
      const target = event.currentTarget as HTMLElement;
      const parent = target.parentElement;
      if (parent) {
        parent.classList.toggle('active');
      }
    };

    // Додавання обробника до всіх питань
    faqQuestions.forEach(question => {
      question.addEventListener('click', toggleFaq);
    });

    // Очищення при розмонтуванні
    return () => {
      faqQuestions.forEach(question => {
        question.removeEventListener('click', toggleFaq);
      });
    };
  }, []);

  return (
    <main>
      <div className="page-container">
        <h1 className="page-title animate-glow">FAQ</h1>
        
        <div className="page-section animate-slideInUp delay-100">
          <div className="faq-item">
            <div className="faq-question">
              <span>What is MovieApp?</span>
              <div className="faq-question-icon">+</div>
            </div>
            <div className="faq-answer">
              <p>
                MovieApp is a digital platform that allows users to discover, track, and stay updated about the latest
                movies and cinema sessions. Our service provides a comprehensive database of films with detailed
                information, ratings, and reviews to help you make informed viewing decisions.
              </p>
            </div>
          </div>

          <div className="faq-item">
            <div className="faq-question">
              <span>How do I create an account?</span>
              <div className="faq-question-icon">+</div>
            </div>
            <div className="faq-answer">
              <p>
                Creating an account on MovieApp is simple and free. Click on the "Sign Up" button in the upper right corner
                of the homepage. Fill out the registration form with your name, email address, and create a password.
                Verify your email address through the confirmation link we'll send, and you're ready to use all features
                of MovieApp.
              </p>
            </div>
          </div>

          <div className="faq-item">
            <div className="faq-question">
              <span>Is MovieApp available on mobile devices?</span>
              <div className="faq-question-icon">+</div>
            </div>
            <div className="faq-answer">
              <p>
                Yes, MovieApp is available on both iOS and Android platforms. You can download our mobile app from the
                Apple App Store or Google Play Store. The mobile app provides all the features available on the web
                version, with additional benefits like push notifications for movie releases and ticket availability.
              </p>
            </div>
          </div>

          <div className="faq-item">
            <div className="faq-question">
              <span>How do I add movies to my favorites?</span>
              <div className="faq-question-icon">+</div>
            </div>
            <div className="faq-answer">
              <p>
                To add a movie to your favorites, simply click on the heart icon displayed on the movie card or detail
                page. You need to be logged in to use this feature. You can view and manage your favorites list by
                navigating to the "Favorites" section in your profile dashboard.
              </p>
            </div>
          </div>

          <div className="faq-item">
            <div className="faq-question">
              <span>Can I purchase movie tickets through MovieApp?</span>
              <div className="faq-question-icon">+</div>
            </div>
            <div className="faq-answer">
              <p>
                Yes, MovieApp offers ticket purchasing for participating theaters. When browsing movie sessions, look for
                the "Buy Tickets" button. You'll be guided through a secure checkout process where you can select seats,
                apply any discount codes, and complete your purchase using our supported payment methods.
              </p>
            </div>
          </div>

          <div className="faq-item">
            <div className="faq-question">
              <span>How can I search for specific movies?</span>
              <div className="faq-question-icon">+</div>
            </div>
            <div className="faq-answer">
              <p>
                You can search for movies using the search bar located in the header of our website or app. Enter the title,
                actor, director, or genre you're interested in. Our advanced search functionality allows for filtering by
                release year, runtime, rating, and more to help you find exactly what you're looking for.
              </p>
            </div>
          </div>

          <div className="faq-item">
            <div className="faq-question">
              <span>What payment methods are accepted?</span>
              <div className="faq-question-icon">+</div>
            </div>
            <div className="faq-answer">
              <p>
                MovieApp accepts various payment methods including credit/debit cards (Visa, MasterCard, American Express),
                PayPal, Apple Pay, and Google Pay. All transactions are secured with industry-standard encryption to protect
                your financial information.
              </p>
            </div>
          </div>

          <div className="faq-item">
            <div className="faq-question">
              <span>How do I report a problem or bug?</span>
              <div className="faq-question-icon">+</div>
            </div>
            <div className="faq-answer">
              <p>
                If you encounter any issues while using MovieApp, please contact our support team through the "Help" section
                in your account settings or email us directly at support@movieapp.com. Please provide as much detail as
                possible about the problem, including what device and browser you're using, to help us resolve it quickly.
              </p>
            </div>
          </div>
        </div>

        <div className="page-contact animate-slideInUp delay-200">
          <p>Can't find what you're looking for?</p>
          <p>Contact our support team at <a href="mailto:support@movieapp.com">support@movieapp.com</a></p>
        </div>
        
        <p className="last-updated">Last updated: May 2025</p>
      </div>
    </main>
  );
};

export default FAQ; 