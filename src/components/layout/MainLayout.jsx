import Header from "./Header";
import Navigation from "./Navigation";
import Footer from "./Footer";

const MainLayout = ({ children }) => {
  return (
    <>
      <Header />
      <Navigation />

      <main className="flex-grow-1">
        {children}
      </main>

      <Footer />
    </>
  );
};

export default MainLayout;
