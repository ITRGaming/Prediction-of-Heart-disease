import React, { useState, useEffect } from 'react';
import  './App.css';
import diseaseImg from './images/Disease.gif'
import noDiseaseImg from './images/noDisease.gif'



const HeartDiseasePrediction = () => {

  const [showForm, setShowForm] = useState(true); // Initial state
  const [showResult, setShowResult] = useState(false);
  const [showTry, setShowTry] = useState(false);
  const [prediction, setPrediction] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    age: '',
    sex: '',
    cp: '',
    trestbps: '',
    chol: '',
    fbs: '',
    restecg: '',
    thalach: '',
    exang: '',
    oldspeak: '',
    slope: '',
    ca: '',
    thal: '',
  });

  const handleCloseForm = () => {
    if (prediction !== null) {
      setShowForm(false);
      setShowResult(true);
      setIsLoading(false);
      }
    else{
      setTimeout(() => {
        if (prediction !== null) {
          setIsLoading(false);
          console.log(prediction);
          handleCloseForm();
        } else if (error) {
          alert(error);
          setIsLoading(false);
        } else {
          setShowTry(true)
          setError('An unexpected error occurred. Please try again later.');
        }
      }, 2000);
      }
  };

  const handleBack = () => {
    setShowForm(true);
    setShowResult(false);
    setPrediction(null);
    setShowTry(null);
  }

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
    // console.log(formData)
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    setFormData({ ...formData, [event.target.name]: event.target.value });
    // console.log(formData)

    try {
      const finalFormData = new URLSearchParams();
      for (const [key, value] of Object.entries(formData)) {
        finalFormData.append(key, value);
        // console.log(finalFormData)
      }
  
      const response = await fetch('http://localhost:5000/result', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: finalFormData,
      });

      if (!response.ok) {
        if (response.status === 400) {
          const errorData = await response.json();
          throw new Error(errorData.error); // Handle 400 Bad Request error
        } else {
          const responseData = await response.json();
          throw new Error(`HTTP ${response.status}: ${responseData.message}`);
        }
      }

      const responseData = await response.json();
      console.log(responseData);
      setPrediction(responseData.prediction);
      console.log(prediction);
      handleCloseForm();
    } catch (error) {
      console.error('Error:', error);
      setError(error.message); // Handle error appropriately, e.g., display user-friendly message
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='container'>
      <h1>Prediction of Heart Disease</h1>
        <div className='formdiv'>
        {showForm ? (
          <form className='form' method='POST' onSubmit={handleSubmit}>
            <table cellSpacing={20} >
              <tr><td><label htmlFor="age">Age:</label></td>
              <td><input type="number" name="age" id="age" onChange={handleChange} required /></td></tr>
              <tr><td><label htmlFor="sex">Sex:</label></td>
              <td><select name="sex" id="sex" onChange={handleChange} required style={{width:'100%', textAlign:'center'}}>
                <option value="">Select</option>
                <option value="0">Male</option>
                <option value="1">Female</option>
              </select></td></tr>
              
              <tr><td><label htmlFor="cp">Chest Pain Type:</label></td>
              <td><input type="number" name="cp" id="cp" onChange={handleChange} required /></td></tr>
              
              <tr><td><label htmlFor="trestbps">Resting Blood Pressure:</label></td>
              <td><input type="number" name="trestbps" id="trestbps" onChange={handleChange} required /></td></tr>
              
              <tr><td><label htmlFor="chol">Cholesterol(mg/dl):</label></td>
              <td><input type="number" name="chol" id="chol" onChange={handleChange} required /></td></tr>
              
              <tr><td><label htmlFor="fbs">Fasting Blood Pressure:</label></td>
              <td><input type="number" name="fbs" id="fbs" onChange={handleChange} required /></td></tr>
              
              <tr><td><label htmlFor="restecg">Resting Electrocardiograph:</label></td>
              <td><input type="number" name="restecg" id="restecg" onChange={handleChange} required /></td></tr>
              
              <tr><td><label htmlFor="thalach">Maximum Heart Rate Achieved(thalach):</label></td>
              <td><input type="number" name="thalach" id="thalach" onChange={handleChange} required /></td></tr>
              
              <tr><td><label htmlFor="exang">Exercise Induced Angina(exang):</label></td>
              <td><input type="number" name="exang" id="exang" onChange={handleChange} required /></td></tr>
              
              <tr><td><label htmlFor="oldspeak">ST Depression introduced by exer(oldspeak):</label></td>
              <td><input type="number" step="0.01" name="oldspeak" id="oldspeak" onChange={handleChange} required /></td></tr>
              
              <tr><td><label htmlFor="slope">Slope of Peak Exercise ST segment:</label></td>
              <td><input type="number" name="slope" id="slope" onChange={handleChange} required /></td></tr>
              
              <tr><td><label htmlFor="ca">Number of Major Vessels:</label></td>
              <td><input type="number" name="ca" id="ca" onChange={handleChange} required /></td></tr>
              
              <tr><td><label htmlFor="thal">Defect type:</label></td>
              <td><input type="number" name="thal" id="thal" onChange={handleChange} required /></td></tr>
              
              <button className='submitBtn' type="submit" disabled={isLoading} >
                {isLoading ? 'Predicting...' : 'Predict'}
              </button>
              {showTry ? (
                <i className='clickAgain'>Click Again</i>
              ) : null}
            </table>
            {/* Add additional input fields here */}
          </form>
        ): null}
            {/* <img className ="imgHeart" src={Image}/> */}
        </div>
        {showResult ? (
          <div className='result'>
              {prediction == 1 ? (
                <>
                <p>Possible Heart Disease - consult your doctor</p>
                <img src={diseaseImg}/>
                </>
              ) : (
                <>
                <p>No signs of heart disease detected.</p>
                <img src={noDiseaseImg} />
                </>
              )}
            <button className='backBtn' onClick={handleBack}>Go Back</button>
          </div>
        ) : null}
    </div>
  );
};

export default HeartDiseasePrediction;
