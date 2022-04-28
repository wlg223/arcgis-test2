import React from "react";
import styles from "../styles/Wrapper.module.scss";
//import * as globals from "../styles/globals.scss";

/**
 *  Component to wrap pages. Constrains content to a maxWidth of 900px and centers it.
 */
export default function Wrapper({ children }) {
  return (
    <div className={styles.page}>
      <div className={styles.wrapper}>{children}</div>
    </div>
  );
}
