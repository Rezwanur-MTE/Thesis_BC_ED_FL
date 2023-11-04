import styles from "./Transactions.module.css";

function Transactions() {
  return (
    <div className={styles.container}>
      <h1 className={styles.h1}>Last Transactions</h1>
      <ul className={styles.ul}>
        <li className={styles.Transactions}>Transaction 1</li>
        <li className={styles.Transactions}>Transaction 2</li>
        <li className={styles.Transactions}>Transaction 3</li>
        <li className={styles.Transactions}>Transaction 4</li>
        <li className={styles.Transactions}>Transaction 5</li>
      </ul>
    </div>
  );
}

export default Transactions;
