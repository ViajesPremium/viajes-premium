"use client";

import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa6";
import styles from "./whatsapp-fab.module.css";

/**
 * Explicación del Link:
 * - 5215573728880: Tu número.
 * - ?text=: El parámetro para el mensaje predefinido.
 * - %20: Es el código para los espacios.
 */
const MESSAGE = "Hola!, quiero mi viaje premium";
const WHATSAPP_LINK = `https://wa.me/5215573728880?text=${encodeURIComponent(MESSAGE)}`;

export default function WhatsAppFab() {
  return (
    <motion.a
      href={WHATSAPP_LINK}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escribir por WhatsApp"
      className={styles.fab}
      // La animación fluida que ya aprobaste
      animate={{
        scale: [1, 1.05, 1],
        y: [0, -6, 0],
      }}
      transition={{
        duration: 3,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "loop",
      }}
      whileHover={{
        scale: 1.1,
        backgroundColor: "#1ebea5",
        transition: { type: "spring", stiffness: 300 },
      }}
      whileTap={{ scale: 0.95 }}
    >
      <FaWhatsapp className={styles.icon} aria-hidden="true" />
    </motion.a>
  );
}
