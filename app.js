const fs = require('fs').promises;
const outputFilePath = './unfollowers.txt';

// Función para leer archivos JSON
const readJsonFile = async (filePath) => {
    try {
        const data = await fs.readFile(filePath, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        throw new Error(`Error al leer el archivo ${filePath}: ${err.message}`);
    }
};

// Ruta de los archivos JSON
const followersFilePath = './connections/followers_and_following/followers_1.json';
const followingFilePath = './connections/followers_and_following/following.json';

const findNonFollowers = async () => {
    try {
        // Lee los archivos JSON
        const followersData = await readJsonFile(followersFilePath);
        const followingData = await readJsonFile(followingFilePath);

        // Extrae los nombres de usuario de followers_1.json
        const followers = followersData.map(item => item.string_list_data[0].value);

        // Extrae los nombres de usuario de following.json
        const following = followingData.relationships_following.map(item => item.string_list_data[0].value);

        // Encuentra las personas que sigues y que no te siguen de vuelta
        const nonFollowers = following.filter(user => !followers.includes(user));
        console.log(`Total de personas que no te siguen de vuelta: ${nonFollowers.length}`);

        // Escribir los unfollowers en un archivo de texto
        await fs.writeFile(outputFilePath, nonFollowers.join('\n'));
        console.log(`Lista de unfollowers escrita en ${outputFilePath}`);

    } catch (error) {
        console.error('Error al procesar los datos:', error.message);
    }
};

findNonFollowers();
