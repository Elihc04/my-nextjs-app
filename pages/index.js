// pages/index.js

import Head from 'next/head';
import AlgorithmForm from '../components/AlgorithmForm';
import styles from '../styles/Home.module.css';

const Home = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>CPU Scheduling App</title>
      </Head>
      <h1 className={styles.title}>Welcome to CPU Scheduling App!</h1>
      <AlgorithmForm />
    </div>
  );
};

export default Home;