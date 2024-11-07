// src/Pages/TermsPage.jsx
import styled from 'styled-components';

const Container = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
  font-family: Arial, sans-serif;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 20px;
`;

const Section = styled.section`
  margin-bottom: 20px;
`;

const Subtitle = styled.h2`
  margin-top: 20px;
  color: orange;
`;

const TermsPage = () => {
  return (
    <Container>
      <Title>Terms and Conditions</Title>
      <Section>
        <Subtitle>1. Introduction</Subtitle>
        <p>
          Welcome to the [Your Organization Name] Terms and Conditions page. These terms outline the rules and regulations for the use of our services and website. By accessing this website, you accept these terms and conditions in full. Do not continue to use our website if you do not accept all of the terms and conditions stated on this page.
        </p>
      </Section>
      <Section>
        <Subtitle>2. User Responsibilities</Subtitle>
        <p>
          By using our services, you agree to: 
          <ul>
            <li>Provide accurate and truthful information.</li>
            <li>Not misuse the services in any way.</li>
            <li>Respect the privacy and rights of others.</li>
          </ul>
        </p>
      </Section>
      <Section>
        <Subtitle>3. Donations</Subtitle>
        <p>
          Donations made through our platform are non-refundable. Please ensure that you are fully aware of your decision to donate before proceeding.
        </p>
      </Section>
      <Section>
        <Subtitle>4. Intellectual Property</Subtitle>
        <p>
          All content on our website, including text, graphics, logos, and images, is the property of [Your Organization Name] and is protected by applicable intellectual property laws. Unauthorized use of this content is strictly prohibited.
        </p>
      </Section>
      <Section>
        <Subtitle>5. Limitation of Liability</Subtitle>
        <p>
          [Your Organization Name] will not be liable for any indirect, incidental, or consequential damages arising from the use of our services or website.
        </p>
      </Section>
      <Section>
        <Subtitle>6. Changes to Terms</Subtitle>
        <p>
          We reserve the right to modify these terms and conditions at any time. Any changes will be posted on this page, and it is your responsibility to review them periodically. Your continued use of the site following the posting of changes constitutes your acceptance of those changes.
        </p>
      </Section>
      <Section>
        <Subtitle>7. Governing Law</Subtitle>
        <p>
          These terms and conditions are governed by the laws of [Your Country/State]. Any disputes arising from these terms shall be resolved in accordance with the applicable laws.
        </p>
      </Section>
      <Section>
        <Subtitle>8. Contact Information</Subtitle>
        <p>
          If you have any questions about these terms, please contact us at: <br />
          Email: [Your Email Address] <br />
          Phone: [Your Phone Number]
        </p>
      </Section>
    </Container>
  );
};

export default TermsPage;
