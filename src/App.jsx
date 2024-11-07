import { BrowserRouter as Router, Routes, Route, } from 'react-router-dom';
import { useState } from 'react';
import HomePage from './Pages/HomePage';
import LoginPage from './Pages/LoginPage';
import AboutUs from './Pages/AboutUs';
import Programs from './Pages/Programs';
import VolunteerPage from './Pages/VolunteerPage';
import VolunteerList from './Pages/volunteersListPage';
import DonationPage from './Pages/DoantePage'
import AdminDonorPage from './Pages/DonorsPage';
// import ContactUs from './pages/ContactUs';
// import Gallery from './pages/Gallery';
import Navbar from './component/Navbar';
import TermsPage from './Pages/Termspage';
import Footer from './component/Footer';

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);


  const handleLogin = () => {
    setIsAuthenticated(true);
    console.log(setIsAuthenticated);

  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    console.log(setIsAuthenticated);

  };

  return (
    <Router>

      <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/programs" element={<Programs />} />
        <Route path='/volunteers' element={<VolunteerPage />} />
        <Route path='/donate' element={<DonationPage />} />
        <Route
          path="/volunteers-list"
          element={
            isAuthenticated ? <VolunteerList /> : <LoginPage onLogin={handleLogin} />
          }
        />
        <Route
          path="/donors"
          element={
            isAuthenticated ? <AdminDonorPage /> : <LoginPage onLogin={handleLogin} />
          }
        />
        <Route path="/terms" element={<TermsPage />} />
        {/* <Route path="/contact" element={<ContactUs />} /> */}
        {/* <Route path="/gallery" element={<Gallery />} /> */}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
