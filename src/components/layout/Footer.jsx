const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-light text-center py-4 mt-5 border-top">
      <div className="container">
        <p className="mb-1">
          <strong>EventUp</strong> &copy; {currentYear} — Todos os direitos reservados.
        </p>
        <small className="text-muted">
          Feito com ❤️ para conectar pessoas e experiências.
        </small>
      </div>
    </footer>
  );
};

export default Footer;
