const WHATSAPP_NUMBER = "254702011192"; // TODO: replace with client number

export function whatsappLink(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
