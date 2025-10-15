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

public class ServerConfigurator {

    public static Server createServer() {

        //Porta
        Server server = new Server(8080);

        ServletContextHandler apiContext = new ServletContextHandler(ServletContextHandler.NO_SESSIONS);
        apiContext.setContextPath("/");

        // Configuração robusta do Filtro CORS
        FilterHolder cors = apiContext.addFilter(CrossOriginFilter.class, "/api/*", EnumSet.of(DispatcherType.REQUEST));
        cors.setInitParameter(CrossOriginFilter.ALLOWED_ORIGINS_PARAM, "*");
        cors.setInitParameter(CrossOriginFilter.ALLOWED_METHODS_PARAM, "GET,POST,PUT,DELETE,HEAD,OPTIONS");
        cors.setInitParameter(CrossOriginFilter.ALLOWED_HEADERS_PARAM, "Authorization,X-Requested-With,Content-Type,Accept,Origin");
        cors.setInitParameter(CrossOriginFilter.ALLOW_CREDENTIALS_PARAM, "true");

        // Configuração do Jersey
        ResourceConfig config = new ResourceConfig();
        config.packages("pt.cursinhoinsercao.portalaluno");
        config.register(MultiPartFeature.class);
        ServletHolder servlet = new ServletHolder(new ServletContainer(config));
        apiContext.addServlet(servlet, "/api/*");

        // --- Configuração dos Ficheiros Estáticos (Imagens/Relatórios)
        ResourceHandler staticResourceHandler = new ResourceHandler();
        staticResourceHandler.setResourceBase("./uploads");
        staticResourceHandler.setDirectoriesListed(false); // Desativar listagem de diretórios por segurança

        ServletContextHandler staticContext = new ServletContextHandler();
        staticContext.setContextPath("/uploads");
        staticContext.setHandler(staticResourceHandler);

        HandlerList handlers = new HandlerList();
        handlers.addHandler(staticContext);
        handlers.addHandler(apiContext);

        server.setHandler(handlers);
        return server;
    }
}
