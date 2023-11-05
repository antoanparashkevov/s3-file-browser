import styles from "./DirectoryTree.module.scss";
import React, { Fragment, useState } from "react";

//UI components
import DirectoryTreeItem from "./DirectoryTreeItem";

//interfaces
import { tree } from "../../util/getObjectTree";

interface DirectoryTreeProps {
    tree: tree,
    name: string,
    absolutePath: string
}

//Recursive component to render the tree view
const DirectoryTree: React.FC<DirectoryTreeProps> = (
    {
        tree,
        name,
        absolutePath
    }
) => {
    const [expandSubDir, setExpandSubDir] = useState<boolean>(false);
    const keys: string[] = Object.keys(tree);

    return (
        <ul role='list' className={styles['tree_view_list']}>
            {keys.length === 0 ?//a folder without sub folders
                <DirectoryTreeItem 
                    absolutePath={absolutePath}
                    directoryName={name} 
                /> :
                 (
                    <Fragment>
                        {keys.map((key, index) => {
                            return (
                                <Fragment key={key}>
                                    {index === 0 &&//when we have 2 sibling folders, we want to display the name of the parent folder only once
                                        <DirectoryTreeItem 
                                            directoryName={name}
                                            absolutePath={absolutePath}
                                            hasSubDirectories={keys.length > 0}
                                            onExpandSubDirectories={(isExpanded) => setExpandSubDir(isExpanded)}
                                        />
                                    }
                                    {expandSubDir &&//when we have at least one sub folder, we want to call the entire component recursively
                                        <DirectoryTree 
                                            tree={tree[key]} 
                                            name={key} 
                                            absolutePath={absolutePath + key + '/'} 
                                        />
                                    }
                                </Fragment>
                            )
                        })}
                    </Fragment>
                )
            }
        </ul>
    )
}

export default DirectoryTree;