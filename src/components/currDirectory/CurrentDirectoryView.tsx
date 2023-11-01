import styles from './CurrentDirectoryView.module.scss';

const CurrentDirectoryView = () => {
    
    return (
        <div className={styles['current_directory_view']}>
            <div className={styles['current_directory_view_grid']}>
                <div className={styles['current_directory_view_grid_item']}>
                    <img
                        src="/icons/folder.svg"
                        alt="Folder"
                        width={80}
                        height={80}
                    />
                    Folder name
                </div> 
                <div className={styles['current_directory_view_grid_item']}>
                    <img
                        src="/icons/folder.svg"
                        alt="Folder"
                        width={80}
                        height={80}
                    />
                    Folder name
                </div> 
                <div className={styles['current_directory_view_grid_item']}>
                    <img
                        src="/icons/folder.svg"
                        alt="Folder"
                        width={80}
                        height={80}
                    />
                    Folder name
                </div> 
                <div className={styles['current_directory_view_grid_item']}>
                    <img
                        src="/icons/folder.svg"
                        alt="Folder"
                        width={80}
                        height={80}
                    />
                    Folder name
                </div> 
                <div className={styles['current_directory_view_grid_item']}>
                    <img
                        src="/icons/folder.svg"
                        alt="Folder"
                        width={80}
                        height={80}
                    />
                    Folder name
                </div> 
                <div className={styles['current_directory_view_grid_item']}>
                    <img
                        src="/icons/folder.svg"
                        alt="Folder"
                        width={80}
                        height={80}
                    />
                    Folder name
                </div>
            </div>
        </div>
    )
}
export default CurrentDirectoryView;