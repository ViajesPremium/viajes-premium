import { FaWhatsapp } from "react-icons/fa6";
import styles from "./whatsapp-fab.module.css";

const WHATSAPP_LINK = "https://wa.me/5215573728880";

export default function WhatsAppFab() {
  return (
    <a
      href={WHATSAPP_LINK}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escribir por WhatsApp"
      className={styles.fab}
    >
      <FaWhatsapp className={styles.icon} aria-hidden="true" />
    </a>
  );
}
