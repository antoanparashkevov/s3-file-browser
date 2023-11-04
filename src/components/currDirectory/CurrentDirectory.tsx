import React, { useEffect, useState } from "react";
import styles from './CurrentDirectory.module.scss';

//components
import CurrentDirectoryActions from "./CurrentDirectoryActions";
import CurrentDirectoryView from "./CurrentDirectoryView";

interface CurrentDirectoryProps {//TODO remove question marks when we build the UI
    currentPrefix: string,
    onChangeFolder: (absolutePath: string) => void
}

const CurrentDirectory: React.FC<CurrentDirectoryProps> = (
    {
        currentPrefix,
        onChangeFolder
    }
) => {
    
    return (
        <section className={styles['current_directory']}>
            <CurrentDirectoryActions 
                onPrevAction={
                    (changedPrefix) => onChangeFolder(changedPrefix)
                } 
                currentPrefix={currentPrefix}
            />
            <CurrentDirectoryView 
                onChangeFolder={
                    (absolutePath) => onChangeFolder(absolutePath)
                } 
                currentPrefix={currentPrefix}
            />
        </section>
    )
};

export default CurrentDirectory;