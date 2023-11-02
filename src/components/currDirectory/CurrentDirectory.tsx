import React, { useEffect, useState } from "react";
import styles from './CurrentDirectory.module.scss';

//components
import CurrentDirectoryActions from "./CurrentDirectoryActions";
import CurrentDirectoryView from "./CurrentDirectoryView";

//utils
import getCurrDirectoryView from "../../utils/getCurrDirectoryView";

interface CurrentDirectoryProps {//TODO remove question marks when we build the UI
    currentDirectory: string[],
    currentPrefix: string,
}

const CurrentDirectory: React.FC<CurrentDirectoryProps> = (
    {currentDirectory, currentPrefix}
) => {
    const [modifiedDirectoryItems, setModifiedDirectoryItems] = useState<string[]>([])
    
    useEffect(() => {
        setModifiedDirectoryItems(getCurrDirectoryView(currentDirectory))
    }, [currentDirectory]);
    
    return (
        <section className={styles['current_directory']}>
            <CurrentDirectoryActions currentPrefix={currentPrefix}/>
            <CurrentDirectoryView currentPrefix={currentPrefix} modifiedDirectoryItems={modifiedDirectoryItems} />
        </section>
    )
};

export default CurrentDirectory;