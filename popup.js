const axios = require('axios');

// Salesforce OAuth 2.0 details
const salesforceLoginUrl = 'https://test.salesforce.com';
const salesforceUsername = 'integrationuser@lacitec.on.ca.devfull';
const salesforcePassword = 'a;kA5-8UdB';
const salesforceSecurityToken = 'zPe1wuotnE6eungIJDH1WyYM5';

// Salesforce REST API endpoint to query Account object
const salesforceApiUrl = 'https://collegelacite--devfull.sandbox.lightning.force.com/services/data/v58.0/query?q=SELECT+Name,+Type,+Industry+FROM+Account+LIMIT+1';

// Function to authenticate with Salesforce and retrieve access token
async function authenticateSalesforce() {
    try {
        const response = await axios.post(`${salesforceLoginUrl}/services/oauth2/token`, {
            grant_type: 'password',
            client_id: 'your_salesforce_client_id',
            client_secret: 'your_salesforce_client_secret',
            username: salesforceUsername,
            password: `${salesforcePassword}${salesforceSecurityToken}`
        });

        return response.data.access_token;
    } catch (error) {
        console.error('Error authenticating with Salesforce:', error.message);
        throw error;
    }
}

// Function to query Salesforce API with the access token
async function querySalesforceApi(accessToken) {
    try {
        const response = await axios.get(salesforceApiUrl, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });

        return response.data;
    } catch (error) {
        console.error('Error querying Salesforce API:', error.message);
        throw error;
    }
}

// Main function to execute the script
async function main() {
    try {
        // Authenticate with Salesforce to obtain access token
        const accessToken = await authenticateSalesforce();

        // Query Salesforce API with the obtained access token
        const accountData = await querySalesforceApi(accessToken);

        // Extract account information
        const accountName = accountData.records[0].Name;
        const accountType = accountData.records[0].Type;
        const accountIndustry = accountData.records[0].Industry;

        // Display account information
        console.log('Account Information:');
        console.log(`Name: ${accountName}`);
        console.log(`Type: ${accountType}`);
        console.log(`Industry: ${accountIndustry}`);
    } catch (error) {
        console.error('An error occurred:', error.message);
    }
}

// Call the main function to execute the script
main();
//test
