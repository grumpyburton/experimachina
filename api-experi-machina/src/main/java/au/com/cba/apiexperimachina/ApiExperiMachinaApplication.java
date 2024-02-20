package au.com.cba.apiexperimachina;

import au.com.cba.apiexperimachina.controller.BootstrapController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;

@SpringBootApplication
public class ApiExperiMachinaApplication {

	private static final Logger logger = LoggerFactory.getLogger(ApiExperiMachinaApplication.class);

	public static void main(String[] args) {



		//SpringApplication.run(ApiExperiMachinaApplication.class, args);
		ConfigurableApplicationContext context = SpringApplication.run(ApiExperiMachinaApplication.class, args);

		try {
			context.getBean(BootstrapController.class).init();
		}
		catch(Exception e)
		{
			logger.error(e.getMessage());
		}

	}

}
