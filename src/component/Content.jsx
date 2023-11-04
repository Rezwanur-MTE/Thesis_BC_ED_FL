import styles from './Content.module.css'

function Content() {
        return (
            <div className={styles.container}>
                <div>
                    <div className={styles.Latency}></div>
                    <p className={styles.LatencyName}>Latency</p>
                    <div className={styles.viewContent}>
                        View Content
                    </div>
                    <div className={styles.share}>Share Disk</div>
                </div>
                <div className={styles.user}>
                    Toatal Users:
                </div>
            </div>
        )
}

export default Content
