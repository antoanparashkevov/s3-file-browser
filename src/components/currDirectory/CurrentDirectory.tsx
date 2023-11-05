import React from "react";
import styles from './CurrentDirectory.module.scss';

//components
import CurrentDirectoryActions from "./CurrentDirectoryActions";
import CurrentDirectoryView from "./CurrentDirectoryView";

const CurrentDirectory: React.FC = () => {
    
    return (
        <section className={styles['current_directory']}>
            <CurrentDirectoryActions />
            <CurrentDirectoryView />
        </section>
    )
};

export default CurrentDirectory;