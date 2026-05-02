const fs = require('fs');

const targetPath = './src/environment/environment.ts';

console.log('--- INICIANDO INYECCIÓN DE VARIABLES ---');
console.log('¿API_URL detectada en el servidor?:', process.env.API_URL ? '✅ SÍ' : '❌ NO (Usando localhost)');
console.log('¿KEYCLOAK_URL detectada en el servidor?:', process.env.KEYCLOAK_URL ? '✅ SÍ' : '❌ NO');


const apiUrl = process.env.API_URL || 'http://localhost:8084';
const keycloakUrl = process.env.KEYCLOAK_URL || 'http://localhost:8180';
const keycloakRealm = process.env.KEYCLOAK_REALM || 'seguridad-app';
const keycloakClient = process.env.KEYCLOAK_CLIENT || 'front-app';

const envConfigFile = `
export const environment = {
  production: true,
  apiUrl: '${apiUrl}',
  keycloakUrl: '${keycloakUrl}',
  keycloakRealm: '${keycloakRealm}',
  keycloakClient: '${keycloakClient}'
};
`;

fs.writeFileSync(targetPath, envConfigFile);
console.log('--- environment.ts SOBREESCRITO CON ÉXITO ---');
