package au.com.cba.apiexperimachina.controller;

import au.com.cba.apiexperimachina.domain.Customer;
import au.com.cba.apiexperimachina.domain.Segment;
import au.com.cba.apiexperimachina.repo.CustomerRepo;
import au.com.cba.apiexperimachina.repo.SegmentRepo;
import com.github.javafaker.Faker;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;

@RestController
public class BootstrapController {

    private static final Logger logger = LoggerFactory.getLogger(BootstrapController.class);

    private final CustomerRepo customerRepo;
    private final SegmentRepo segmentRepo;

    public BootstrapController(CustomerRepo customerRepo, SegmentRepo segmentRepo) {
        this.customerRepo = customerRepo;
        this.segmentRepo = segmentRepo;
    }

    public void init(){
        logger.info("start init");
        logger.info("customer");
        createCustomers();
        logger.info("segments");
        createSegments();
        logger.info("end init");
    }

    public void createCustomers()
    {
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

    public void createSegments()
    {
        Segment s = new Segment();
        s.setName("isRBSCustomer");
        s.setDescription("Is a RBS segment customer");
        s.setShared(true);
        s.setCreateDate(new Date(System.currentTimeMillis()));
        this.segmentRepo.save(s);

        s = new Segment();
        s.setName("isBBCustomer");
        s.setDescription("Is a BB segment customer");
        s.setShared(true);
        s.setCreateDate(new Date(System.currentTimeMillis()));
        this.segmentRepo.save(s);

        s = new Segment();
        s.setName("isIBMCustomer");
        s.setDescription("Is a IBM segment customer");
        s.setShared(true);
        s.setCreateDate(new Date(System.currentTimeMillis()));
        this.segmentRepo.save(s);

        s = new Segment();
        s.setName("is20-30yo");
        s.setDescription("Is a in the age range of 20-30 year old customer");
        s.setShared(true);
        s.setCreateDate(new Date(System.currentTimeMillis()));
        this.segmentRepo.save(s);

        s = new Segment();
        s.setName("isMarketable");
        s.setDescription("Is a markting enabled segment customer");
        s.setShared(true);
        s.setCreateDate(new Date(System.currentTimeMillis()));
        this.segmentRepo.save(s);
    }
}
