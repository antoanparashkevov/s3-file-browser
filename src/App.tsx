import React from 'react';
import styles from './App.module.scss';

//components
import DirectoryTree from "./components/tree/DirectoryTree";
import CurrentDirectory from "./components/currDirectory/CurrentDirectory";

const App: React.FC = () => {
  
  return (
      <section className={styles["root_section"]}>
        <DirectoryTree />
        <CurrentDirectory />
      </section>
  );
}

export default App;
