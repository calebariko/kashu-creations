const WHATSAPP_NUMBER = "254716351444"; // TODO: replace with client number

export function whatsappLink(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
