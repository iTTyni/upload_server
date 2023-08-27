import {getServer} from './web_server/server';
import DotEnvUtil from './utils/DotEnvUtil';

const main = async () => {
  const server = await getServer();

  const serverConfig = DotEnvUtil.getServerConfig();
  const PORT = serverConfig.port || 3001;
  server.listen(PORT, () => {
    console.log(`server listen start: http://localhost:${PORT}`);
  });
};

main().then();
