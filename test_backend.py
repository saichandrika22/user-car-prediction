#!/usr/bin/env python3
"""
Simple test script to verify backend functionality
"""

import requests
import json

def test_backend():
    base_url = "http://127.0.0.1:8000"
    
    print("🧪 Testing Backend API...")
    
    # Test health endpoint
    try:
        response = requests.get(f"{base_url}/health")
        print(f"✅ Health check: {response.status_code} - {response.json()}")
    except Exception as e:
        print(f"❌ Health check failed: {e}")
        return False
    
    # Test predict endpoint with sample data
    try:
        sample_data = {
            "brand": "Maruti",
            "model": "Swift",
            "year": 2020,
            "km_driven": 45000,
            "fuel": "Petrol",
            "seller_type": "Individual",
            "transmission": "Manual",
            "owner": "First Owner"
        }
        
        response = requests.post(
            f"{base_url}/predict",
            json=sample_data,
            headers={"Content-Type": "application/json"}
        )
        
        if response.status_code == 200:
            result = response.json()
            print(f"✅ Predict endpoint: {response.status_code}")
            print(f"   Predicted price: ₹{result['predicted_price']:,.2f}")
            print(f"   Confidence range: ₹{result['confidence_lower']:,.2f} - ₹{result['confidence_upper']:,.2f}")
        else:
            print(f"❌ Predict endpoint failed: {response.status_code} - {response.text}")
            return False
            
    except Exception as e:
        print(f"❌ Predict endpoint failed: {e}")
        return False
    
    # Test cars endpoint
    try:
        response = requests.get(f"{base_url}/cars?limit=5")
        print(f"✅ Cars endpoint: {response.status_code} - Found {len(response.json())} cars")
    except Exception as e:
        print(f"❌ Cars endpoint failed: {e}")
        return False
    
    # Test brands endpoint
    try:
        response = requests.get(f"{base_url}/brands")
        print(f"✅ Brands endpoint: {response.status_code} - Found {len(response.json())} brands")
    except Exception as e:
        print(f"❌ Brands endpoint failed: {e}")
        return False
    
    print("\n🎉 All backend tests passed!")
    return True

if __name__ == "__main__":
    test_backend()
