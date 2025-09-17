package pt.cursinhoinsercao.portalaluno.config;

import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.server.handler.HandlerList;
import org.eclipse.jetty.server.handler.ResourceHandler;
import org.eclipse.jetty.servlet.FilterHolder;
import org.eclipse.jetty.servlet.ServletContextHandler;
import org.eclipse.jetty.servlet.ServletHolder;
import org.eclipse.jetty.servlets.CrossOriginFilter;
import org.glassfish.jersey.media.multipart.MultiPartFeature;
import org.glassfish.jersey.server.ResourceConfig;
import org.glassfish.jersey.servlet.ServletContainer;

import javax.servlet.DispatcherType;
import java.util.EnumSet;

/**
 * Classe responsável por configurar e criar a instância do servidor Jetty.
 */
public class ServerConfigurator {

    public static Server createServer() {
        // Configuração do Jersey, onde dizemos quais pacotes ele deve procurar por endpoints.
        ResourceConfig config = new ResourceConfig();
        config.packages("pt.cursinhoinsercao.portalaluno");
        config.register(MultiPartFeature.class);

        // Cria um Servlet do Jersey com a nossa configuração.
        ServletHolder servlet = new ServletHolder(new ServletContainer(config));

        // Cria o servidor Jetty na porta 8080.
        Server server = new Server(8080);

        // --- CONFIGURAÇÃO PARA SERVIR IMAGENS ESTÁTICAS ---
        ResourceHandler resourceHandler = new ResourceHandler();
        resourceHandler.setDirectoriesListed(true);
        resourceHandler.setResourceBase("./uploads");

        ServletContextHandler staticContext = new ServletContextHandler(server, "/uploads");
        staticContext.setHandler(resourceHandler);

        // --- CONFIGURAÇÃO DA API ---
        ServletContextHandler apiContext = new ServletContextHandler(server, "/api");
        apiContext.addServlet(servlet, "/*");

        // Adiciona o filtro CORS ao contexto da API
        FilterHolder cors = new FilterHolder(new CrossOriginFilter());
        cors.setInitParameter(CrossOriginFilter.ALLOWED_ORIGINS_PARAM, "*");
        cors.setInitParameter(CrossOriginFilter.ACCESS_CONTROL_ALLOW_ORIGIN_HEADER, "*");
        cors.setInitParameter(CrossOriginFilter.ALLOWED_METHODS_PARAM, "GET,POST,PUT,DELETE,HEAD");
        cors.setInitParameter(CrossOriginFilter.ALLOWED_HEADERS_PARAM, "Authorization,X-Requested-With,Content-Type,Accept,Origin");
        apiContext.addFilter(cors, "/*", EnumSet.of(DispatcherType.REQUEST));

        // Junta os dois handlers (API e imagens) numa lista para o servidor usar
        HandlerList handlers = new HandlerList();
        handlers.addHandler(staticContext);
        handlers.addHandler(apiContext);
        server.setHandler(handlers);

        return server;
    }
}
