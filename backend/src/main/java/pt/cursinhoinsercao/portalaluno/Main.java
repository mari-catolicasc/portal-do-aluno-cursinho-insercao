package pt.cursinhoinsercao.portalaluno;

import org.eclipse.jetty.server.Server;
import pt.cursinhoinsercao.portalaluno.config.ServerConfigurator;

public class Main {
    public static void main(String[] args) {
        // Cria e configura o servidor usando a nossa nova classe de configuração
        Server server = ServerConfigurator.createServer();

        try {

            server.start();
            System.out.println("Servidor iniciado em http://localhost:8080");
            server.join();

        } catch (Exception e) {

            e.printStackTrace();

        } finally {
            server.destroy();
        }
    }
}
