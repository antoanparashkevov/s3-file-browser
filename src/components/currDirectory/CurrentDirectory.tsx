import React from "react";
import styles from './CurrentDirectory.module.scss';

//components
import CurrentDirectoryActions from "./CurrentDirectoryActions";
import CurrentDirectoryView from "./CurrentDirectoryView";

interface CurrentDirectoryProps {//TODO remove question marks when we build the UI
    currentDirectory?: string,
}

const CurrentDirectory: React.FC<CurrentDirectoryProps> = (
    {currentDirectory}
) => {
    
    return (
        <section className={styles['current_directory']}>
            <CurrentDirectoryActions/>
            <CurrentDirectoryView />
        </section>
    )
};

export default CurrentDirectory;