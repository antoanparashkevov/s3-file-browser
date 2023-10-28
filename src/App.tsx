import React from 'react';
import styles from './App.module.scss';

//components
import DirectoryTree from "./components/tree/DirectoryTree";
import CurrentDirectory from "./components/currDirectory/CurrentDirectory";
import SubmitForm from "./components/submit/SubmitForm";

//UI components
import BaseDialog from "./components/UI/BaseDialog";

const App: React.FC = () => {
  
    return (
        <section className={styles["root_section"]}>
            <BaseDialog>
                <SubmitForm />
            </BaseDialog>
            <DirectoryTree />
            <CurrentDirectory />
        </section>
    );
}

export default App;
