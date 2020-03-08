import express from 'express';
import politico_router from './routes/politicoRoutes';


const app = express();
app.use(express.json());

app.use('/', politico_router);
app.get('/', (req, res) => {
    res.send({
      status: 200,
      message: 'Welcome to the Politico application',
    });
});
const port = process.env.PORT || 3000;
app.listen(port, () => {console.log(`app is listening on ${port}`)});

export default app;