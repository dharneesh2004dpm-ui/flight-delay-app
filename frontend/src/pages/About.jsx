export default function About() {
  return (
    <div className="card">
      <h2>About Flight Delay Predictor</h2>
      <p>Built by an Aeronautical Engineering graduate transitioning into Full Stack &amp; ML, this app analyzes 150,000+ Indian domestic flights to predict departure delay risk in advance.</p>
      <h3>Model Performance (Test Set: 30,000 flights)</h3>
      <ul>
        <li><strong>XGBoost (Selected):</strong> 87.2% Accuracy | 0.924 F1 | 0.837 ROC-AUC</li>
        <li><strong>Logistic Regression (Baseline):</strong> 82.0% Accuracy | 0.888 F1 | 0.835 ROC-AUC</li>
        <li><strong>Random Forest:</strong> 79.7% Accuracy | 0.874 F1 | 0.820 ROC-AUC</li>
      </ul>
      <p><strong>Key EDA Insight:</strong> Peak departure windows (7–10 AM &amp; 5–9 PM) show ~95% delay rates compared to ~80% during off-peak hours.</p>
    </div>
  );
}