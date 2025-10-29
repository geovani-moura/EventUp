import MainLayout from "../layout/MainLayout";

const Loading = ({ text = "Carregando..." }) => {
  return (
    <MainLayout>
      <div className="d-flex flex-column justify-content-center align-items-center vh-100 bg-light">
        <div
          className="spinner-border text-primary"
          role="status"
          style={{ width: "3rem", height: "3rem" }}
        >
          <span className="visually-hidden">Loading...</span>
        </div>
        <span className="mt-3 text-secondary fw-semibold">{text}</span>
      </div>
    </MainLayout>
  );
};

export default Loading;
