"use client";

import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa6";
import styles from "./whatsapp-fab.module.css";

const WHATSAPP_LINK = "https://wa.me/5215573728880";

export default function WhatsAppFab() {
  return (
    <motion.a
      href={WHATSAPP_LINK}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escribir por WhatsApp"
      className={styles.fab}
      // Animación continua estable
      animate={{
        // "Pulse" sutil: apenas un 5% de cambio de tamaño
        scale: [1, 1.05, 1],
        // Movimiento vertical mínimo para que no se salga de su lugar
        y: [0, -6, 0],
      }}
      transition={{
        duration: 3, // Ciclo lento para que no estrese
        ease: "easeInOut", // Movimiento orgánico
        repeat: Infinity, // Infinito
        repeatType: "loop", // Ciclo cerrado
      }}
      // Interacciones manuales (estas tienen prioridad sobre 'animate')
      whileHover={{
        scale: 1.1,
        y: -2,
        transition: { type: "spring", stiffness: 300 },
      }}
      whileTap={{ scale: 0.95 }}
    >
      <FaWhatsapp className={styles.icon} aria-hidden="true" />
    </motion.a>
  );
}
