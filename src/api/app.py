from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
from joblib import load

# Load the pre-trained model
model = load('../model/my_model.joblib')
print("Model loaded:", model)

app = Flask(__name__)
CORS(app)

@app.route('/result', methods=['POST'])
def get_data():
    try:
        # Extract feature values from request data
        age = int(request.form['age'])
        sex = int(request.form['sex'])
        cp = int(request.form['cp'])
        trestbps = int(request.form['trestbps'])
        chol = int(request.form['chol'])
        fbs = int(request.form['fbs'])
        restecg = int(request.form['restecg'])
        thalach = int(request.form['thalach'])
        exang = int(request.form['exang'])
        oldspeak = float(request.form['oldspeak'])
        slope = int(request.form['slope'])
        ca = int(request.form['ca'])
        thal = int(request.form['thal'])

        # Print extracted values for debugging
        print(f"Received data: age={age}, sex={sex}, cp={cp}, trestbps={trestbps}, chol={chol}, fbs={fbs}, restecg={restecg}, thalach={thalach}, exang={exang}, oldspeak={oldspeak}, slope={slope}, ca={ca}, thal={thal} ")

        # Create a NumPy array from the data
        input_data =(age, sex, cp, trestbps, chol, fbs, restecg, thalach, exang, oldspeak, slope, ca, thal)
        
        input_data_as_numpy_array= np.asarray(input_data)

        # Reshape the array for prediction
        input_data_reshaped = input_data_as_numpy_array.reshape(1, -1)

        # Make prediction using the model
        prediction = model.predict(input_data_reshaped)
        
        if prediction == 0:
            print("Patient does not have heart disease")
        else :
            print( "Patient has heart disease")
        

        # Log the prediction and input data
        app.logger.info(f"Prediction: {prediction[0]} for input: {input_data}")

        # Return the prediction in JSON format
        return jsonify({'prediction': str(prediction[0])})

    except (KeyError, ValueError):
        # Handle missing or invalid data
        return jsonify({'error': 'Missing or invalid form data'}), 400

# app.run(debug=True)