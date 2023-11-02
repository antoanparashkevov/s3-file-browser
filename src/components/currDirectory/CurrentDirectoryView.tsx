import React, { Fragment } from "react";
import styles from './CurrentDirectoryView.module.scss';
import classNames from "classnames/bind";

//currDir
import CurrentDirectoryViewItem from "./CurrentDirectoryViewItem";
import currentDirectory from "./CurrentDirectory";

const cx = classNames.bind(styles)

interface CurrentDirectoryViewInterface {
    modifiedDirectoryItems: string[],
    currentPrefix: string,
    onChangeFolder: (absolutePath: string) => void
}

const CurrentDirectoryView: React.FC<CurrentDirectoryViewInterface> = (
    {modifiedDirectoryItems, currentPrefix, onChangeFolder}
) => {
    
    return (
        <div className={styles['current_directory_view']}>
            <div className={cx("current_directory_view_grid", {"current_directory_view_grid_no_data": modifiedDirectoryItems.length === 0})}>
                {modifiedDirectoryItems.length > 0 ?
                    <Fragment>
                        {modifiedDirectoryItems.map(item => {
                            return (
                                <CurrentDirectoryViewItem 
                                    onChangeFolder={(absolutePath) => onChangeFolder(absolutePath)}
                                    key={item} 
                                    currentPrefix={currentPrefix} 
                                    name={item}
                                    isFolder={!item.includes('.txt')} 
                                />
                            )
                        })}
                    </Fragment> :
                    <p>No Files and Folders</p>
                }
            </div>
        </div>
    )
}
export default CurrentDirectoryView;