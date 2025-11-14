// === دالة حساب الإجمالي ===
export const calculateTotal = (panier) => {
  return panier.reduce((acc, item) => acc + item.prix_vente * item.quantite, 0);
};

// === دالة توليد رقم إيصال فريد ===
const generateReceiptNumber = () => {
  const now = new Date();
  const timestamp = now
    .toISOString()
    .replace(/[-:.TZ]/g, "")
    .slice(0, 14);
  return `RCPT-${timestamp}`;
};

export default generateReceiptNumber;
