import React, { useState } from "react";
import styles from './DirectoryTree.module.scss';

//components
import TreeViewDirectoryItem from "./TreeViewDirectoryItem";

//interfaces
import { directoryElement } from "../../aws/directory";

interface DirectoryTreeProps {//TODO remove question marks when we build the UI
    directories?: directoryElement[],
    onDirectoryClick?: (directory: string) => void;
    currentDirectory?: string,
}

const DirectoryTree: React.FC<DirectoryTreeProps> = (
    {directories, onDirectoryClick, currentDirectory}
) => {
    // console.log('directories >>> ', directories)
    // console.log('currentDirectory >>> ', currentDirectory)
    
    return (
        <section className={styles['tree_view']}>
            <ul role='list' className={styles['tree_view_list']}>
                {directories && directories.length > 0 ?
                    directories.map(directory=> {
                        return <TreeViewDirectoryItem key={directory.id} directoryItem={directory} />
                    }) :
                    <p>You don't have any directories!</p>
                }
            </ul>
        </section>
    )
};

export default DirectoryTree;