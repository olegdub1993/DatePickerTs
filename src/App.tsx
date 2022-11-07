import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { RegistrationForm } from './form/RegistrationForm';
import { DatePicker } from './DatePicker/DatePicker';

function App() {
  const [date, setDate] = useState(new Date())
  console.log(date.getDay())
  return (
    <div className="App">
      <DatePicker value={date} onChange={setDate} />
    </div>

  );
}

export default App;
