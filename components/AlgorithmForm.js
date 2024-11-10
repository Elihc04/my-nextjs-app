// components/AlgorithmForm.js

import { useState } from 'react';
import ResultDisplay from './ResultDisplay';
import styles from '../styles/Home.module.css';

const AlgorithmForm = () => {
  const [processes, setProcesses] = useState('');
  const [priorities, setPriorities] = useState('');
  const [algorithm, setAlgorithm] = useState('FCFS');
  const [result, setResult] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const processArray = processes.split(',').map(p => parseInt(p.trim()));
    const priorityArray = priorities.split(',').map(p => parseInt(p.trim()));
    let schedule = [];

    // Gọi hàm tính toán theo thuật toán đã chọn
    if (algorithm === 'FCFS') {
      schedule = FCFS(processArray);
    } else if (algorithm === 'SJF') {
      schedule = SJF(processArray);
    } else if (algorithm === 'RR') {
      schedule = RR(processArray, 2); // quantum = 2
    } else if (algorithm === 'Priority') {
      schedule = PriorityScheduling(processArray, priorityArray);
    }

    setResult(schedule);
  };

  const FCFS = (processes) => {
    return processes; // Chỉ trả về danh sách tiến trình cho ví dụ đơn giản
  };

  const SJF = (processes) => {
    return processes.sort((a, b) => a - b); // Sắp xếp theo thời gian ngắn nhất
  };

  const RR = (processes, quantum) => {
    let queue = [...processes];
    let schedule = [];
    while (queue.length) {
      const process = queue.shift();
      schedule.push(process);
      if (process > quantum) {
        queue.push(process - quantum);
      }
    }
    return schedule;
  };

  const PriorityScheduling = (processes, priorities) => {
    const processWithPriority = processes.map((process, index) => ({
      id: process,
      priority: priorities[index],
    }));
    
    // Sắp xếp theo độ ưu tiên (thấp hơn là ưu tiên cao hơn)
    processWithPriority.sort((a, b) => a.priority - b.priority);
    
    return processWithPriority.map(p => p.id);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label className={styles.label}>
        Nhập tiến trình (cách nhau bằng dấu phẩy):
        <input
          type="text"
          value={processes}
          onChange={(e) => setProcesses(e.target.value)}
        />
      </label>
      <label className={styles.label}>
        Nhập độ ưu tiên (cách nhau bằng dấu phẩy):
        <input
          type="text"
          value={priorities}
          onChange={(e) => setPriorities(e.target.value)}
        />
      </label>
      <label className={styles.label}>
        Chọn thuật toán:
        <select value={algorithm} onChange={(e) => setAlgorithm(e.target.value)}>
          <option value="FCFS">FCFS</option>
          <option value="SJF">SJF</option>
          <option value="RR">Round Robin</option>
          <option value="Priority">Priority Scheduling</option>
        </select>
      </label>
      <button type="submit">Tính toán</button>
      {result && <ResultDisplay result={result} />}
    </form>
  );
};

export default AlgorithmForm;