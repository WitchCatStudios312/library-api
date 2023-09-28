import express from 'express';
import cors from 'cors';
import './loadEnvironment.mjs';
import books from './routes/books.mjs';

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());

app.use('/book', books);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
