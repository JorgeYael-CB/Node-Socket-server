import { createServer } from 'http';
import { envs } from './config/envs';
import { AppRoutes } from './presentation/routes';
import { Server } from './presentation/server';
import { WssService } from './presentation/services/wss.service';


(async()=> {
  main();
})();


async function main() {

  const server = new Server({ port: envs.PORT });

  const httpServer = createServer(server.app); // creamos un servidor con el mismo de express
  WssService.initWss({ server: httpServer });

  //* Mandamos las rutas después para tener inicializaddo el websocketservice con las rutas
  server.setRoutes(AppRoutes.routes);

  httpServer.listen( envs.PORT, () => {
    console.log(`Server running on port: ${envs.PORT}`);
  });
};