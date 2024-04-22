import React, { useState, useEffect } from 'react';
import  './App.css';
import Image from './images/giphy.gif'

const HeartDiseasePrediction = () => {
  const [formData, setFormData] = useState({
    age: '',
    sex: '',
    // ... other input fields (e.g., blood pressure, cholesterol)
  });
  const [prediction, setPrediction] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('YOUR_FLASK_API_URL', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Error fetching data: ${response.status}`);
      }

      const responseData = await response.json();
      setPrediction(responseData.prediction);
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
          <form className='form' onSubmit={handleSubmit}>
            <table cellSpacing={20} >
              <tr><td><label htmlFor="age">Age:</label></td>
              <td><input type="number" name="age" id="age" value={formData.age} onChange={handleChange} required /></td></tr>
              <tr><td><label htmlFor="sex">Sex:</label></td>
              <td><select name="sex" id="sex" value={formData.sex} onChange={handleChange} required style={{width:'100%', textAlign:'center'}}>
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select></td></tr>
              
              <tr><td><label htmlFor="cp">Chest Pain Type:</label></td>
              <td><input type="number" name="cp" id="cp" value={formData.cp} onChange={handleChange} required /></td></tr>
              
              <tr><td><label htmlFor="trestbps">Resting Blood Pressure:</label></td>
              <td><input type="number" name="trestbps" id="trestbps" value={formData.trestbps} onChange={handleChange} required /></td></tr>
              
              <tr><td><label htmlFor="chol">Cholesterol(mg/dl):</label></td>
              <td><input type="number" name="chol" id="chol" value={formData.chol} onChange={handleChange} required /></td></tr>
              
              <tr><td><label htmlFor="fbs">Fasting Blood Pressure:</label></td>
              <td><input type="number" name="fbs" id="fbs" value={formData.fbs} onChange={handleChange} required /></td></tr>
              
              <tr><td><label htmlFor="restecg">Resting Electrocardiograph:</label></td>
              <td><input type="number" name="restecg" id="restecg" value={formData.restecg} onChange={handleChange} required /></td></tr>
              
              <tr><td><label htmlFor="thalach">Maximum Heart Rate Achieved(thalach):</label></td>
              <td><input type="number" name="thalach" id="thalach" value={formData.thalach} onChange={handleChange} required /></td></tr>
              
              <tr><td><label htmlFor="exang">Exercise Induced Angina(exang):</label></td>
              <td><input type="number" name="exang" id="exang" value={formData.exang} onChange={handleChange} required /></td></tr>
              
              <tr><td><label htmlFor="oldspeak">ST Depression introduced by exer(oldspeak):</label></td>
              <td><input type="number" name="oldspeak" id="oldspeak" value={formData.oldspeak} onChange={handleChange} required /></td></tr>
              
              <tr><td><label htmlFor="slope">Slope of Peak Exercise ST segment:</label></td>
              <td><input type="number" name="slope" id="slope" value={formData.slope} onChange={handleChange} required /></td></tr>
              
              <tr><td><label htmlFor="ca">Number of Major Vessels:</label></td>
              <td><input type="number" name="ca" id="ca" value={formData.ca} onChange={handleChange} required /></td></tr>
              
              <tr><td><label htmlFor="thal">Defect type:</label></td>
              <td><input type="number" name="thal" id="thal" value={formData.thal} onChange={handleChange} required /></td></tr>
              
              <button className='submitBtn' type="submit" disabled={isLoading} style={{width:'163%', height:'5vh'} }>
                {isLoading ? 'Predicting...' : 'Predict'}
              </button>
            </table>
            {/* Add additional input fields here */}
          </form>
            {/* <img className ="imgHeart" src={Image}/> */}
        </div>
      {prediction !== null && (
        <div>
          {error ? (
            <p className="error">Error: {error}</p>
          ) : (
            <p>
              Prediction: {prediction === 1 ? 'Possible Heart Disease' : 'Low Risk'}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default HeartDiseasePrediction;
