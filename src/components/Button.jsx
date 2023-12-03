import styles from './Button.module.css'

const Button = ({children, type, handleClick}) => {
  return (
    <button className={`${styles[type]} ${styles.btn}`} onClick={handleClick}>
        {children}
    </button>
  )
}

export default Button;