import colors from 'colors';

import app from './app';
import config from './config';

const port = config.port;

app.listen(port, () => {
  console.log(colors.bold(`\n\n\nServer listening at port ${port}\n\n\n`).green);
});

export default app;
