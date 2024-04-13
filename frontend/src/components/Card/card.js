import styles from "./Card.module.css" 

const card = ({children, cardClass}) => {
  return (
    <div className={ `${styles.card}  ${cardClass}`}> 
       {children}
    </div>
  )
}

export default card