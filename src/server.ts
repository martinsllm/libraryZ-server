import app from './app';
import 'dotenv';

const PORT = process.env.NODE_DOCKER_PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running in port ${PORT}!`)
})