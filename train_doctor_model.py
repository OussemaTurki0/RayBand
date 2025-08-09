import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier

# Load dataset
df = pd.read_csv('health_dataset.csv')

# Convert sex to numeric
df['sex'] = df['sex'].map({'M': 0, 'F': 1})

# Features and label
X = df[['heart_rate', 'oxygen', 'temp', 'age', 'sex']]
y = df['condition']

# Split data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train model
model = RandomForestClassifier()
model.fit(X_train, y_train)

# Test prediction
example = [[95, 90, 38.5, 55, 0]]  # HR, Oxygen, Temp, Age, Sex(M=0/F=1)
pred = model.predict(example)
print("Predicted condition:", pred[0])
