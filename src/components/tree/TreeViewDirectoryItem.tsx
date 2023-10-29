import styles from './TreeViewDirectoryItem.module.scss';

const TreeViewDirectoryItem = () => {
    
    return (
        <li className={styles['tree_view_item']}>
            <img 
                className={styles['tree_view_item_folder_img']}
                src="/icons/folder.svg" 
                alt="Folder" 
                width={40} 
                height={40}
            />
            <span className={styles['tree_view_item_folder_name']}>Folder Name</span>
            <img 
                className={styles['tree_view_item_arrow_img']}
                src="/icons/arrow.svg" 
                alt="Arrow" 
                width={24} 
                height={24}
            />
        </li>
    )
}

export default TreeViewDirectoryItem;