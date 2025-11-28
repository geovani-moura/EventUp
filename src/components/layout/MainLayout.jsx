import Header from "./Header";
import Navigation from "./Navigation";
import Footer from "./Footer";
import useSwipe from "../../utils/useSwipe";
import { useNavigate } from "react-router-dom";

const MainLayout = ({ children }) => {
  const navigate = useNavigate();

  // Minimal gesture support: swipe right -> go back, swipe left -> go forward (if history exists)
  useSwipe({
    onSwipeRight: () => {
      // try go back
      try {
        window.history.back();
      } catch (e) {
        // noop
      }
    },
    onSwipeLeft: () => {
      // no reliable forward target; keep minimal: navigate to /events as example
      navigate("/events");
    },
  });

  return (
    <>
      <Header />
      <Navigation />

      <main className="flex-grow-1">{children}</main>

      <Footer />
    </>
  );
};

export default MainLayout;
