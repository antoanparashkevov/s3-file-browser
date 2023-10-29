import React from "react";
import styles from './CurrentDirectory.module.scss';

//components
import CurrentDirectoryActions from "./CurrentDirectoryActions";

interface CurrentDirectoryProps {//TODO remove question marks when we build the UI
    currentDirectory?: string,
    client: any,
    encodedcredentials: any
}

const CurrentDirectory: React.FC<CurrentDirectoryProps> = (
    {currentDirectory, client, encodedcredentials}
) => {
    // console.log('currentDirectory >>> ', currentDirectory)
    
    return (
        <section className={styles['current_directory']}>
            <CurrentDirectoryActions client={client} encodedcredentials={encodedcredentials} />
        </section>
    )
};

export default CurrentDirectory;