import type { Metadata } from "next";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Aviso de Privacidad | Japón Premium",
};

export default function AvisoDePrivacidadPage() {
  return (
    <main className={styles.page}>
      <article className={styles.content}>
        <h1 className={styles.title}>Política de Privacidad</h1>

        <p className={styles.paragraph}>
          Por medio del presente AVISO DE PRIVACIDAD se hace del conocimiento
          al público en general que JAPÓN PREMIUM® es una persona moral
          legalmente constituida, teniendo su domicilio en calle Omega, número
          306, colonia Romero de Terreros, alcaldía Coyoacán, Ciudad de México,
          C.P. 04310.
        </p>

        <p className={styles.paragraph}>
          JAPÓN PREMIUM® es el responsable del tratamiento de los datos
          personales recabados del público en general que accede a través de
          sus páginas de internet y redes sociales, el público en general
          acepta que JAPÓN PREMIUM® almacene y recolecte sus datos personales.
        </p>

        <h2 className={styles.subtitle}>Compromiso con la privacidad</h2>
        <p className={styles.paragraph}>
          En JAPÓN PREMIUM® estamos comprometidos implementando la más estricta
          privacidad del público en general. El responsable de recabar y dar
          tratamiento a los datos personales pone a disposición del público en
          general los siguientes medios de contacto; domicilio ubicado en calle
          Omega, número 306, colonia Romero de Terreros, alcaldía Coyoacán,
          Ciudad de México, C.P. 04310, y el correo electrónico
          legal@viajespremium.com.mx.
        </p>

        <h2 className={styles.subtitle}>Tratamiento de los datos personales</h2>
        <p className={styles.paragraph}>
          JAPÓN PREMIUM® da tratamiento a los datos personales que le son
          proporcionados por los titulares, para llevar a cabo los siguientes
          objetivos:
        </p>
        <ul className={styles.list}>
          <li className={styles.listItem}>
            La recepción, almacenamiento y protección de los datos personales
            que se lleva a cabo conforme a lo establecido en los artículos 7 y
            8 de la Ley Federal de Protección de Datos Personales en Posesión
            de los Particulares (en lo subsecuente denominada “la Ley”).
          </li>
          <li className={styles.listItem}>
            Los datos personales son de orden privado, en consecuencia, no son
            transferidos, vendidos, arrendados ni divulgados a terceras
            personas ajenas que no tengan relaciones comerciales, conforme a lo
            establecido en el artículo 36 de la Ley.
          </li>
          <li className={styles.listItem}>
            La recolección de datos personales es la indispensable para llevar a
            cabo la prestación de los servicios que se ofrecen.
          </li>
          <li className={styles.listItem}>
            Para la personalización de publicidad, envío de promociones,
            prospección comercial, oferta de productos y servicios.
          </li>
        </ul>

        <h2 className={styles.subtitle}>
          Medios para ejercer los derechos ARCO
        </h2>
        <p className={styles.paragraph}>
          Los titulares de los datos personales en todo momento pueden ejercer
          sus derechos ARCO, a través, de un escrito libre presentado en el
          domicilio ubicado en calle Omega, número 306, colonia Romero de
          Terreros, alcaldía Coyoacán, Ciudad de México, C.P. 04310, o bien, al
          correo electrónico legal@viajespremium.com.mx se le dará tratamiento a
          la solicitud presentada, conforme a lo establecido en el artículo 28
          de la Ley.
        </p>

        <h2 className={styles.subtitle}>Uso de tecnologías</h2>
        <p className={styles.paragraph}>
          JAPÓN PREMIUM® hace uso de múltiples tecnologías con el objetivo de
          mejorar la experiencia en sus servicios. Algunas de las tecnologías
          que se emplean son las cookies, el uso de web beacons en conjunto con
          otras tecnologías de recolección de datos y soporte, propias y de
          terceros.
        </p>

        <h2 className={styles.subtitle}>
          Modificaciones en el aviso de privacidad
        </h2>
        <p className={styles.paragraph}>
          JAPÓN PREMIUM® siempre comprometido con el cuidado de los datos
          personales, podrá llevar a cabo modificaciones, cambios o
          actualizaciones por motivo de las reformas que se realicen a la ley.
        </p>
        <p className={styles.paragraph}>
          JAPÓN PREMIUM® se compromete con el público en general a mantenerlos
          informados sobre los cambios que se realice al presente AVISO DE
          PRIVACIDAD, a través de la página de internet.
        </p>
      </article>
    </main>
  );
}

