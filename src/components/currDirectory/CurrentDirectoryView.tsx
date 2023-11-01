import React from "react";
import styles from './CurrentDirectoryView.module.scss';
import CurrentDirectoryViewItem from "./CurrentDirectoryViewItem";

interface CurrentDirectoryViewInterface {
    modifiedDirectoryItems: string[]
}

const CurrentDirectoryView: React.FC<CurrentDirectoryViewInterface> = (
    {modifiedDirectoryItems}
) => {
    
    return (
        <div className={styles['current_directory_view']}>
            <div className={styles['current_directory_view_grid']}>
                {modifiedDirectoryItems.map(item => {
                    return (
                        <CurrentDirectoryViewItem key={item} name={item} isFolder={!item.includes('.txt')} />
                    )
                })}
            </div>
        </div>
    )
}
export default CurrentDirectoryView;