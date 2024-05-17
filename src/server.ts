import app from './app';
import 'dotenv';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running in port ${PORT}!`)
})