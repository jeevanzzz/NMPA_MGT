from flask import Flask, jsonify
from flask_cors import CORS
import pandas as pd
import numpy as np
from sklearn.linear_model import LinearRegression

app = Flask(__name__)
CORS(app)  # Enable CORS for the React frontend

@app.route('/api/insights', methods=['GET'])
def get_insights():
    # Simulate generating insights using pandas and simple logic
    insights = [
        {
            "title": "Vessel Delay Prediction Model",
            "description": "Based on historical maritime data and current weather patterns, SS Global Navigator has a 65% probability of delay. Rerouting suggested.",
            "impact": "high"
        },
        {
            "title": "Automated Dock Allocation (AI)",
            "description": "Algorithm recommends reserving Berth A-2 for the next ultra-large container vessel to optimize turnaround time by 18%.",
            "impact": "medium"
        },
        {
            "title": "Revenue Forecasting Engine",
            "description": "Predictive models indicate a 12% increase in Q2 revenue driven by optimized bulk cargo processing and reduced idle times.",
            "impact": "positive"
        }
    ]
    return jsonify(insights)

@app.route('/api/performance', methods=['GET'])
def get_performance():
    # Use Pandas to generate operational efficiency trends
    months = ['Jan', 'Feb', 'Mar', 'Apr', 'May']
    efficiency = np.array([85, 88, 82, 90, 92])
    congestion = np.array([30, 25, 35, 20, 18])
    delays = np.array([5, 4, 7, 3, 2])
    
    df = pd.DataFrame({
        'month': months,
        'efficiency': efficiency,
        'congestion': congestion,
        'delays': delays
    })
    
    # Return as list of dicts
    return jsonify(df.to_dict(orient='records'))

@app.route('/api/predictions', methods=['GET'])
def get_predictions():
    # Use Scikit-Learn to predict future vessel traffic based on historical data
    # Mock historical data: [week_number, marketing_spend, seasonal_factor]
    X_train = np.array([[1], [2], [3], [4], [5], [6], [7]])
    y_train = np.array([50, 55, 62, 60, 68, 70, 71])  # actual traffic
    
    # Train Linear Regression model
    model = LinearRegression()
    model.fit(X_train, y_train)
    
    # Predict for next 4 weeks
    X_test = np.array([[8], [9], [10], [11]])
    y_pred = model.predict(X_test)
    
    weeks = ['Week 8', 'Week 9', 'Week 10', 'Week 11']
    predictions_data = []
    
    for i in range(len(weeks)):
        predictions_data.append({
            'week': weeks[i],
            'predicted': round(y_pred[i], 1),
            'actual': 0  # future weeks have no actuals yet
        })
        
    return jsonify(predictions_data)

if __name__ == '__main__':
    app.run(debug=True, port=5000)
