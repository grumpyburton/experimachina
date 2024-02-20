package au.com.cba.apiexperimachina.controller;

import au.com.cba.apiexperimachina.domain.Customer;
import au.com.cba.apiexperimachina.repo.CustomerRepo;
import com.github.javafaker.Faker;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class BootstrapController {

    private static final Logger logger = LoggerFactory.getLogger(BootstrapController.class);

    private final CustomerRepo customerRepo;

    public BootstrapController(CustomerRepo customerRepo) {
        this.customerRepo = customerRepo;
    }

    public void init(){
        logger.info("start init");
        logger.info("customer");
        createCustomers();
        logger.info("end init");
    }

    public void createCustomers()
    {
        /*
        Faker faker = new Faker();

        String name = faker.name().fullName(); // Miss Samanta Schmidt
        String firstName = faker.name().firstName(); // Emory
        String lastName = faker.name().lastName(); // Barton

        String streetAddress = faker.address().streetAddress(); // 60018 Sawayn Brooks Suite 449
*/

        int j = 1000;
        for(int i=0; i < j; i++)
        {
            Faker faker = new Faker();
            Customer c = new Customer();
            c.setFirstName(faker.name().firstName());
            c.setSurname(faker.name().lastName());
            this.customerRepo.save(c);
        }
    }
}
