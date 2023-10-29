import React from "react";
import styles from './CurrentDirectory.module.scss';

//components
import CurrentDirectoryActions from "./CurrentDirectoryActions";

interface CurrentDirectoryProps {//TODO remove question marks when we build the UI
    currentDirectory?: string
}

const CurrentDirectory: React.FC<CurrentDirectoryProps> = (
    {currentDirectory}
) => {
    // console.log('currentDirectory >>> ', currentDirectory)
    
    return (
        <section className={styles['current_directory']}>
            <CurrentDirectoryActions />
        </section>
    )
};

export default CurrentDirectory;