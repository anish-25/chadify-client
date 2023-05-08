import React from 'react'
import styles from './AddPostButton.module.css'
import AddCircle from 'remixicon-react/AddCircleFillIcon'

const AddPostButton = ({onClick}) => {
    return (
        <button href="#" className={styles.button} onClick={onClick}>
            <span className={styles.icon}><AddCircle/></span>
            <span className={styles.text}>Add Post</span>
        </button>
    )
}

export default AddPostButton