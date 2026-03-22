// Simple frontend API test
// Run this in browser console or with node

const API_BASE = 'http://127.0.0.1:8000';

async function testFrontendAPI() {
    console.log('🧪 Testing Frontend API Integration...');
    
    try {
        // Test predict endpoint
        const response = await fetch(`${API_BASE}/predict`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                brand: 'Maruti',
                model: 'Swift',
                year: 2020,
                km_driven: 45000,
                fuel: 'Petrol',
                seller_type: 'Individual',
                transmission: 'Manual',
                owner: 'First Owner'
            })
        });
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        const result = await response.json();
        console.log('✅ Predict API works:', result);
        console.log(`   Price: ₹${result.predicted_price.toLocaleString('en-IN')}`);
        
        // Test other endpoints
        const carsResponse = await fetch(`${API_BASE}/cars?limit=3`);
        const cars = await carsResponse.json();
        console.log('✅ Cars API works:', cars.length, 'cars found');
        
        const brandsResponse = await fetch(`${API_BASE}/brands`);
        const brands = await brandsResponse.json();
        console.log('✅ Brands API works:', brands.length, 'brands found');
        
        console.log('\n🎉 All frontend API tests passed!');
        
    } catch (error) {
        console.error('❌ Frontend API test failed:', error);
    }
}

// Auto-run if in browser
if (typeof window !== 'undefined') {
    testFrontendAPI();
}

// Export for Node.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { testFrontendAPI };
}
