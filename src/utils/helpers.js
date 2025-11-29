export const formatDate = (dateString) => {
  if (!dateString) return "";

  // Tenta parsear com Date (suporta 'YYYY-MM-DD' e ISO 'YYYY-MM-DDTHH:mm:ssZ')
  const date = new Date(dateString);
  if (!isNaN(date)) {
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  }

  // Fallback: extrair parte YYYY-MM-DD com regex
  const m = String(dateString).match(/(\d{4})-(\d{2})-(\d{2})/);
  if (m) {
    const [, y, mo, d] = m;
    return `${d}/${mo}/${y}`;
  }

  // Se tudo falhar, retornar a string original
  return String(dateString);
};