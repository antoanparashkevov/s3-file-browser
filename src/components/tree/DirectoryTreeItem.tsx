import React, { Fragment, ReactNode, useRef, useState } from "react";
import styles from './DirectoryTreeItem.module.scss';
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

interface DirectoryTreeItemProps {
    directoryName: string,
    hasSubDirectories?: boolean,
    onExpandSubDirectories?: (isExpanded: boolean) => void
}

const DirectoryTreeItem: React.FC<DirectoryTreeItemProps> = (
    {
        directoryName,
        hasSubDirectories = false,
        onExpandSubDirectories
    }
) => {
    const expandSubDirectories = useRef<boolean>(false)
    
    return (
        <li className={styles['tree_view_item']}>
            <img 
                src="/icons/folder.svg" 
                alt="Folder" 
                width={40} 
                height={40}
            />
            <span className={styles['tree_view_item_folder_name']}>{directoryName}</span>
            {hasSubDirectories &&
                <img
                    onClick={() => {
                        if( onExpandSubDirectories ) {
                            expandSubDirectories.current = !expandSubDirectories.current;
                            onExpandSubDirectories(expandSubDirectories.current);
                        }
                    }}
                    className={cx('tree_view_item_arrow_img', {'rotate_arrow': hasSubDirectories && expandSubDirectories.current})}
                    src="/icons/arrow.svg"
                    alt="Arrow"
                    width={24}
                    height={24}
                />
            }
        </li>
    )
}

export default DirectoryTreeItem;