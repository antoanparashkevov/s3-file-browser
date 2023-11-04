import React, { BaseSyntheticEvent, useRef } from "react";
import styles from './DirectoryTreeItem.module.scss';
import classNames from "classnames/bind";

//redux
import { useDispatch, useSelector } from "react-redux";
import awsSlice, { awsActions } from "../../store/awsSlice";
import { State } from "../../store";

const cx = classNames.bind(styles);

interface DirectoryTreeItemProps {
    directoryName: string,
    hasSubDirectories?: boolean,
    onExpandSubDirectories?: (isExpanded: boolean) => void,
    absolutePath: string
}

const DirectoryTreeItem: React.FC<DirectoryTreeItemProps> = (
    {
        directoryName,
        hasSubDirectories = false,
        onExpandSubDirectories,
        absolutePath
    }
) => {
    const expandSubDirectories = useRef<boolean>(false);
    
    //redux
    const awsState = useSelector((state: State) => state.aws)
    const dispatch = useDispatch()
    
    const handleDoubleClick = (e: BaseSyntheticEvent) => {
        e.stopPropagation();
        dispatch(awsActions.changeAbsolutePath(absolutePath));
        dispatch(awsActions.changeCurrentDirectory(directoryName))
    }
    
    return (
        <li className={styles['tree_view_item']} onDoubleClick={handleDoubleClick}>
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
            {awsState.currentDirectory === directoryName &&
                <span className={styles['tree_view_item_current_directory_indicator']}></span>
            }
        </li>
    )
}

export default DirectoryTreeItem;