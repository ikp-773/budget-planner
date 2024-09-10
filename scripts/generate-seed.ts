import * as fs from 'fs';
import * as path from 'path';

// Get the seed name from the command line argument
const seedName = process.argv[2];

if (!seedName) {
    console.error('Please provide a name for the seed file.');
    process.exit(1);
}

// Generate a timestamp for the seed file name
const timestamp = new Date()
    .toISOString()
    .replace(/T/, '_')
    .replace(/\..+/, '')
    .replace(/:/g, '')
    .replace(/-/g, '');

// Define the file paths
const seedFileName = `${timestamp}-${seedName}.ts`;
const seedFilePath = path.join(__dirname, '../src/seeders', seedFileName);
const templateFilePath = path.join(__dirname, 'seeder-template.ts');

// Copy the template file to the new seeder file path
fs.copyFile(templateFilePath, seedFilePath, (err) => {
    if (err) {
        console.error('Error creating the seeder file:', err);
        process.exit(1);
    } else {
        console.log(`Seeder file created: ${seedFilePath}`);
    }
});
