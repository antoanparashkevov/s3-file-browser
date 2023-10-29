import React from "react";
import styles from './TreeViewDirectoryItem.module.scss';

//interfaces
import { directoryElement } from "../../aws/directory";

interface TreeViewDirectoryItemProps {
    directoryItem: directoryElement
}

const TreeViewDirectoryItem: React.FC<TreeViewDirectoryItemProps> = ({directoryItem}) => {
    
    return (
        <li className={styles['tree_view_item']}>
            <img 
                className={styles['tree_view_item_folder_img']}
                src="/icons/folder.svg" 
                alt="Folder" 
                width={40} 
                height={40}
            />
            <span className={styles['tree_view_item_folder_name']}>{directoryItem.name}</span>
            {directoryItem.subDirectoriesCount > 0 &&
                <img
                    className={styles['tree_view_item_arrow_img']}
                    src="/icons/arrow.svg"
                    alt="Arrow"
                    width={24}
                    height={24}
                />
            }
        </li>
    )
}

export default TreeViewDirectoryItem;