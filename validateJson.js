import { readFile } from 'fs';
const path = './src/i18n/en/validation.json'; // substitua pelo caminho do seu arquivo JSON

readFile(path, 'utf8', (err, data) => {
  if (err) {
    console.error('Erro ao ler o arquivo:', err);
    return;
  }

  try {
    JSON.parse(data);
    console.log('JSON está válido!');
  } catch (e) {
    console.error('JSON inválido:', e.message);
  }
});
