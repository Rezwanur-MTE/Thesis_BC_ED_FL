
import Content from './Content'
import styles from './Details.module.css'
import Transactions from './Transactions'

function Details() {
        return (
                <div className={styles.container}>
                <Content/>
                <div className={styles.divider}></div>
                    <Transactions/>
                </div>
        )
}

export default Details
