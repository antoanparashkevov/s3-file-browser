import React from "react";
import styles from './DirectoryTree.module.scss';

//UI components
import TreeViewDirectoryItem from "./UI/TreeViewDirectoryItem";

let array = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25];

interface DirectoryTreeProps {//TODO remove question marks when we build the UI
    directories?: string[],
    onDirectoryClick?: (directory: string) => void;
    currentDirectory?: string,
}

const DirectoryTree: React.FC<DirectoryTreeProps> = (
    {directories, onDirectoryClick, currentDirectory}
) => {
    console.log('directories >>> ', directories)
    console.log('currentDirectory >>> ', currentDirectory)
    
    return (
        <section className={styles['tree_view']}>
            <ul role='list' className={styles['tree_view_list']}>
                {
                    array.map(el=> {
                        return <TreeViewDirectoryItem />
                    })
                }
            </ul>
        </section>
    )
};

export default DirectoryTree;