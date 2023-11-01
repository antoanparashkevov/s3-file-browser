import styles from "./CurrentDirectoryViewItem.module.scss";
import React from "react";

interface CurrentDirectoryViewItemInterface {
    name: string,
    isFolder: boolean
}

const CurrentDirectoryViewItem: React.FC<CurrentDirectoryViewItemInterface> = (
    {name, isFolder}
) => {
    
    return (
        <div className={styles['current_directory_view_grid_item']}>
            <img
                src={isFolder ? '/icons/folder.svg' : '/icons/file.svg'}
                alt="Folder"
                width={80}
                height={80}
            />
            {name}
        </div>
    )
}

export default CurrentDirectoryViewItem;