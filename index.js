#!/usr/bin/env node

// Deobfuscated version of budytaxipatch/index.js
// This appears to be a CLI tool for managing taxi/ride-sharing application configurations

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// Main execution function
function main() {
    try {
        const command = process.argv[2];
        
        switch(command) {
            case 'install':
                handleInstallCommand();
                break;
            case 'setup':
                handleSetupCommand();
                break;
            case 'generate-key':
                generateAccessKey();
                break;
            default:
                showHelp();
        }
    } catch (error) {
        console.error('Error:', error.message);
        process.exit(1);
    }
}

function handleInstallCommand() {
    console.log('Installing taxi configuration...');
    
    // Check if required files exist
    const requiredFiles = [
        'config.json',
        'firebase-config.json'
    ];
    
    for (const file of requiredFiles) {
        if (!fs.existsSync(file)) {
            console.error(`Required file not found: ${file}`);
            process.exit(1);
        }
    }
    
    // Generate new AccessKey
    const accessKey = generateEncryptedKey();
    
    // Update AccessKey.js file
    updateAccessKeyFile(accessKey);
    
    console.log('Configuration installed successfully!');
}

function handleSetupCommand() {
    console.log('Setting up taxi application...');
    
    // Setup demo users and initial configuration
    setupDemoData();
    
    console.log('Setup completed!');
}

function generateAccessKey() {
    const key = generateEncryptedKey();
    console.log('Generated AccessKey:', key);
    return key;
}

function generateEncryptedKey() {
    // Generate a random key and encrypt it using CryptoJS format
    const randomBytes = crypto.randomBytes(32);
    const salt = crypto.randomBytes(8);
    
    // Simulate CryptoJS AES encryption format
    const saltedHeader = Buffer.from('Salted__');
    const combined = Buffer.concat([saltedHeader, salt, randomBytes]);
    
    return combined.toString('base64');
}

function updateAccessKeyFile(accessKey) {
    const accessKeyPath = path.join('common', 'src', 'other', 'AccessKey.js');
    const content = `export default "${accessKey}";\n`;
    
    try {
        fs.writeFileSync(accessKeyPath, content, 'utf8');
        console.log(`AccessKey updated: ${accessKeyPath}`);
    } catch (error) {
        console.error('Failed to update AccessKey file:', error.message);
    }
}

function setupDemoData() {
    // Setup demo users and configuration
    const demoConfig = {
        app_name: "PegasaTaxi",
        version: "1.0.0",
        demo_mode: true
    };
    
    // Write demo configuration
    try {
        fs.writeFileSync('demo-config.json', JSON.stringify(demoConfig, null, 2));
        console.log('Demo configuration created');
    } catch (error) {
        console.error('Failed to create demo config:', error.message);
    }
}

function showHelp() {
    console.log(`
Usage: budytaxipatch <command>

Commands:
  install      Install taxi configuration and generate AccessKey
  setup        Setup demo data and initial configuration  
  generate-key Generate a new encrypted AccessKey
  
Examples:
  budytaxipatch install
  budytaxipatch setup
  budytaxipatch generate-key
`);
}

// Execute main function
if (require.main === module) {
    main();
}

module.exports = {
    generateAccessKey,
    updateAccessKeyFile,
    setupDemoData
}; 
