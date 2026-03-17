import styles from "./page.module.css"

export default function() {
    return(
        <div className={styles.main}>
             <div className={styles.signIn}>
                <h2>Sign in</h2>
             </div>
             <div className={styles.signUp}>
                <h2>Sign up</h2>
             </div>
        </div>
    )
}