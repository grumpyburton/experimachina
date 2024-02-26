package au.com.cba.apiexperimachina.controller;

import au.com.cba.apiexperimachina.domain.*;
import au.com.cba.apiexperimachina.repo.*;
import com.github.javafaker.Faker;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;

@RestController
public class BootstrapController {

    private static final Logger logger = LoggerFactory.getLogger(BootstrapController.class);

    private final ControlGroupRepo controlGroupRepo;
    private final CustomerRepo customerRepo;
    private final EligibilityRepo eligibilityRepo;
    private final ExperimentRepo experimentRepo;
    private final OutcomeRepo outcomeRepo;
    private final SegmentRepo segmentRepo;
    private final SurveyRepo surveyRepo;

    public BootstrapController(ControlGroupRepo controlGroupRepo, CustomerRepo customerRepo,
                               EligibilityRepo eligibilityRepo, ExperimentRepo experimentRepo,
                               OutcomeRepo outcomeRepo, SegmentRepo segmentRepo, SurveyRepo surveyRepo) {
        this.controlGroupRepo = controlGroupRepo;
        this.customerRepo = customerRepo;
        this.eligibilityRepo = eligibilityRepo;
        this.experimentRepo = experimentRepo;
        this.outcomeRepo = outcomeRepo;
        this.segmentRepo = segmentRepo;
        this.surveyRepo = surveyRepo;
    }

    public void init(){
        logger.info("start init");
        logger.info("customer");
        createCustomers();
        logger.info("segments");
        createSegments();
        createExperiments();
        createControlGroups();
        createOutcomes();
        createEligibilities();
        createSurveys();
        
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

    public void createControlGroups()
    {
        ControlGroup c = new ControlGroup();
        c.setName("Campaign1");
        c.setDescription("Marketing campaign 1");
        c.setCreateDate(new Date(System.currentTimeMillis()));
        this.controlGroupRepo.save(c);

        c = new ControlGroup();
        c.setName("Campaign2");
        c.setDescription("Marketing campaign 2");
        c.setCreateDate(new Date(System.currentTimeMillis()));
        this.controlGroupRepo.save(c);
    }

    public void createEligibilities()
    {
        Eligibility e = new Eligibility();
        e.setName("Over18");
        e.setDescription("Customer is over 18");
        e.setCreateDate(new Date(System.currentTimeMillis()));
        this.eligibilityRepo.save(e);

        e = new Eligibility();
        e.setName("Product1");
        e.setDescription("Customer has product 1");
        e.setCreateDate(new Date(System.currentTimeMillis()));
        this.eligibilityRepo.save(e);
    }

    public void createExperiments()
    {
        Experiment e = new Experiment();
        e.setName("Experiment1");
        e.setDescription("Customers like green better than brown");
        e.setCreateDate(new Date(System.currentTimeMillis()));
        this.experimentRepo.save(e);

        e = new Experiment();
        e.setName("Experiment2");
        e.setDescription("Customers like apples better than oranges");
        e.setCreateDate(new Date(System.currentTimeMillis()));
        this.experimentRepo.save(e);

        e = new Experiment();
        e.setName("Experiment3");
        e.setDescription("Model X predicts rain better than model Y");
        e.setCreateDate(new Date(System.currentTimeMillis()));
        this.experimentRepo.save(e);
    }

    public void createOutcomes()
    {
        Outcome o = new Outcome();
        o.setName("Green is best");
        o.setDescription("Customers liked green better than brown");
        o.setCreateDate(new Date(System.currentTimeMillis()));
        this.outcomeRepo.save(o);
    }

    public void createSurveys()
    {
        Survey o = new Survey();
        o.setName("Green is best");
        o.setDescription("Customers liked green better than brown");
        o.setCreateDate(new Date(System.currentTimeMillis()));
        this.surveyRepo.save(o);
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
