// BMRS API Authentication Diagnostic Tool
// Run this to diagnose BMRS API authentication issues

async function runBMRSDiagnostic() {
  const apiKey = process.env.BMRS_API_KEY;
  console.log('🔍 BMRS API Authentication Diagnostic Starting...\n');
  
  if (!apiKey) {
    console.error('❌ BMRS_API_KEY not found in environment');
    return;
  }

  console.log(`✅ API Key found: ${apiKey.substring(0, 8)}...${apiKey.substring(apiKey.length - 4)}\n`);

  // Test different API URLs and endpoints
  const testEndpoints = [
    {
      name: 'BMRS v1 API (Current)',
      url: `https://bmrs.elexon.co.uk/api/v1/demand/actual/total?from=2025-06-30T00:00:00Z&to=2025-06-30T01:00:00Z&APIKey=${apiKey}`
    },
    {
      name: 'Alternative BMRS API',
      url: `https://api.bmreports.com/BMRS/DETSYSPRICES/V1?APIKey=${apiKey}&SettlementDate=2025-06-30&Period=1&ServiceType=xml`
    },
    {
      name: 'Elexon Portal API',
      url: `https://data.elexon.co.uk/bmrs/api/v1/demand/actual/total?from=2025-06-30T00:00:00Z&to=2025-06-30T01:00:00Z&APIKey=${apiKey}`
    },
    {
      name: 'BMRS Data Portal',
      url: `https://www.bmreports.com/api/v1/demand/actual/total?from=2025-06-30T00:00:00Z&to=2025-06-30T01:00:00Z&APIKey=${apiKey}`
    }
  ];

  for (const endpoint of testEndpoints) {
    console.log(`🧪 Testing: ${endpoint.name}`);
    try {
      const response = await fetch(endpoint.url, {
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'GridMix/1.0'
        }
      });

      console.log(`   Status: ${response.status} ${response.statusText}`);
      const text = await response.text();
      
      if (text.includes('<!doctype') || text.includes('<html>')) {
        console.log('   ❌ Returned HTML (likely invalid endpoint)');
      } else if (text.includes('{') || text.includes('[')) {
        console.log('   ✅ Returned JSON-like data');
        console.log(`   Preview: ${text.substring(0, 100)}...`);
      } else if (text.includes('<?xml')) {
        console.log('   ℹ️  Returned XML data');
      } else {
        console.log(`   ❓ Unknown format: ${text.substring(0, 50)}...`);
      }
    } catch (error) {
      console.log(`   ❌ Error: ${error}`);
    }
    console.log('');
  }

  console.log('\n');

  // Test 2: Header method
  console.log('🧪 Test 2: Header Authentication');
  try {
    const url = `https://bmrs.elexon.co.uk/api/v1/demand/actual/total?from=2025-06-30T00:00:00Z&to=2025-06-30T01:00:00Z`;
    
    const response = await fetch(url, {
      headers: {
        'X-API-Key': apiKey,
        'Accept': 'application/json',
        'User-Agent': 'GridMix/1.0'
      }
    });

    console.log(`   Status: ${response.status} ${response.statusText}`);
    const text = await response.text();
    
    if (text.includes('<!doctype') || text.includes('<html>')) {
      console.log('   ❌ Returned HTML (authentication failed)');
    } else {
      console.log('   ✅ Returned JSON data');
      try {
        const data = JSON.parse(text);
        console.log(`   📊 Records: ${Array.isArray(data) ? data.length : 'Not an array'}`);
      } catch (e) {
        console.log('   ⚠️  Response not valid JSON');
      }
    }
  } catch (error) {
    console.log(`   ❌ Error: ${error}`);
  }

  console.log('\n🏁 Diagnostic Complete\n');
}

export { runBMRSDiagnostic };

// Auto-run when executed
runBMRSDiagnostic().catch(console.error);