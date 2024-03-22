package au.com.cba.apiexperimachina.controller;

import au.com.cba.apiexperimachina.domain.*;
import au.com.cba.apiexperimachina.repo.*;
import com.github.javafaker.Faker;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

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
        logger.info("segments");
        createSegments();
        createExperiments();

        createEligibilitiesWithSegments();

        createControlGroups();
        createOutcomes();
        createSurveys();
        logger.info("customer");
        createCustomers();
        //testJPA();
        logger.info("end init");
    }

    public void createCustomers()
    {
        Segment sSEG_20TO30 = this.segmentRepo.findSegmentByCode("SEG_20TO30");
        Segment sSEG_RBS = this.segmentRepo.findSegmentByCode("SEG_RBS");
        Segment sSEG_MKT = this.segmentRepo.findSegmentByCode("SEG_MKT");
        Segment sSEG_P1 = this.segmentRepo.findSegmentByCode("SEG_P1");

        int j = 1000;
        for(int i=0; i < j; i++)
        {
            Faker faker = new Faker();
            Customer c = new Customer();
            c.setFirstName(faker.name().firstName());
            c.setSurname(faker.name().lastName());
            c.setActive(true);
            c.addSegment(sSEG_MKT);
            c.addSegment(sSEG_20TO30);
            c.addSegment(sSEG_P1);
            c.addSegment(sSEG_RBS);
            c.setKey(UUID.randomUUID().toString());
            this.customerRepo.save(c);
        }
    }

    public void createControlGroups()
    {
        Eligibility e = this.eligibilityRepo.findByName("Over18");

        ControlGroup c = new ControlGroup();
        c.setName("Campaign1");
        c.setDescription("Marketing campaign 1");
        c.setCreateDate(new Date(System.currentTimeMillis()));
        c.setActive(true);
        c.addEligilbity(e);
        this.controlGroupRepo.save(c);

        c = new ControlGroup();
        c.setName("Campaign2");
        c.setDescription("Marketing campaign 2");
        c.setCreateDate(new Date(System.currentTimeMillis()));
        c.setActive(true);
        this.controlGroupRepo.save(c);

        c = new ControlGroup();
        c.setName("No eligibility set control group");
        c.setDescription("No eligibility set control group");
        c.setCreateDate(new Date(System.currentTimeMillis()));
        c.setActive(true);
        this.controlGroupRepo.save(c);

    }

    public void createEligibilitiesWithSegments()
    {
        Segment sRBS = new Segment();
        sRBS.setName("isRBSCustomer");
        sRBS.setDescription("Is a RBS segment customer");
        sRBS.setShared(true);
        sRBS.setCreateDate(new Date(System.currentTimeMillis()));
        sRBS.setActive(true);
        sRBS.setCode("SEG_RBS");
        //s.setCustomers(customersList);
        this.segmentRepo.save(sRBS);

        Segment sBB = new Segment();
        sBB.setName("isBBCustomer");
        sBB.setDescription("Is a BB segment customer");
        sBB.setShared(true);
        sBB.setCreateDate(new Date(System.currentTimeMillis()));
        sBB.setActive(true);
        sBB.setCode("SEG_BB");
        //s.setCustomers(customersList);
        this.segmentRepo.save(sBB);

        Segment sIBM = new Segment();
        sIBM.setName("isIBMCustomer");
        sIBM.setDescription("Is a IBM segment customer");
        sIBM.setShared(true);
        sIBM.setCreateDate(new Date(System.currentTimeMillis()));
        sIBM.setActive(true);
        sIBM.setCode("SEG_IBM");
        //s.setCustomers(customersList);
        this.segmentRepo.save(sIBM);

        Segment s2030 = new Segment();
        s2030.setName("is20-30yo");
        s2030.setDescription("Is a in the age range of 20-30 year old customer");
        s2030.setShared(true);
        s2030.setCreateDate(new Date(System.currentTimeMillis()));
        s2030.setActive(true);
        s2030.setCode("SEG_20TO30");
        //s.setCustomers(customersList);
        this.segmentRepo.save(s2030);

        Segment sMkt = new Segment();
        sMkt.setName("isMarketable");
        sMkt.setDescription("Is a marketing enabled segment customer");
        sMkt.setShared(true);
        sMkt.setCreateDate(new Date(System.currentTimeMillis()));
        sMkt.setActive(true);
        sMkt.setCode("SEG_MKT");
        //s.setCustomers(customersList);
        this.segmentRepo.save(sMkt);

        Segment sP1 = new Segment();
        sP1.setName("has P1");
        sP1.setDescription("Customer has Product 1");
        sP1.setShared(true);
        sP1.setCreateDate(new Date(System.currentTimeMillis()));
        sP1.setActive(true);
        sP1.setCode("SEG_P1");
        //s.setCustomers(customersList);
        this.segmentRepo.save(sP1);

        // elgibigilities

        Eligibility e = new Eligibility();
        e.setName("Over18");
        e.setDescription("Customer is over 18");
        e.setCreateDate(new Date(System.currentTimeMillis()));
        e.setActive(true);
        e.addSegment(s2030);
        this.eligibilityRepo.save(e);

        e = new Eligibility();
        e.setName("Product1");
        e.setDescription("Customer has product 1");
        e.setCreateDate(new Date(System.currentTimeMillis()));
        e.setActive(true);
        e.addSegment(sRBS);
        e.addSegment(sMkt);
        e.addSegment(sP1);
        this.eligibilityRepo.save(e);

        e = new Eligibility();
        e.setName("Is Marketable");
        e.setDescription("Customer is marketable. Miust have marketing flag and be over 18");
        e.setCreateDate(new Date(System.currentTimeMillis()));
        e.setActive(true);
        e.addSegment(s2030);
        e.addSegment(sMkt);
        this.eligibilityRepo.save(e);

        for(int i=0; i<10; i++)
        {
            e = new Eligibility();
            e.setName("Eligibility " + i);
            e.setDescription("Eligibility description " + i);
            e.setCreateDate(new Date(System.currentTimeMillis()));
            e.setActive(true);
            e.addSegment(sRBS);
            e.addSegment(sMkt);
            this.eligibilityRepo.save(e);
        }
    }

    public void createExperiments()
    {
        Experiment e = new Experiment();
        e.setName("Experiment1");
        e.setDescription("Customers like green better than brown");
        e.setCreateDate(new Date(System.currentTimeMillis()));
        e.setUpdateDate(e.getCreateDate());
        e.setHypothesis("green is sexy");
        e.setObjective("to prove once and for all what eye colour is the best");
        e.setOutcome("it's blue silly!");
        e.setProblem("eyes are all different colours");
        e.setActive(true);
        this.experimentRepo.save(e);

        e = new Experiment();
        e.setName("Experiment2");
        e.setDescription("Customers like apples better than oranges");
        e.setCreateDate(new Date(System.currentTimeMillis()));
        e.setUpdateDate(e.getCreateDate());
        e.setHypothesis("oranges rock");
        e.setObjective("to prove once and for all what fruit is the best");
        e.setOutcome("it's mango silly!");
        e.setProblem("comparing apples and oranges is hard");
        e.setActive(true);
        this.experimentRepo.save(e);

        e = new Experiment();
        e.setName("Experiment3");
        e.setDescription("Model X predicts rain better than model Y");
        e.setCreateDate(new Date(System.currentTimeMillis()));
        e.setUpdateDate(e.getCreateDate());
        e.setHypothesis("we can predict the rain");
        e.setObjective("pick the best day to go to the beach");
        e.setOutcome("you're going to get wet any way! so just go");
        e.setProblem("sticky sand!");
        e.setActive(true);
        this.experimentRepo.save(e);

        for(int i=4; i<10; i++)
        {
            e = new Experiment();
            e.setName("Experiment" + i);
            e.setDescription("description");
            e.setCreateDate(new Date(System.currentTimeMillis()));
            e.setUpdateDate(e.getCreateDate());
            e.setActive(true);
            this.experimentRepo.save(e);
        }
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
        o.setActive(true);
        this.surveyRepo.save(o);
    }
    
    public void createSegments()
    {
        //List<Customer> customersList = this.customerRepo.findAll();


    }

    public void testJPA()
    {

        List<Segment> segs = new ArrayList<>();

        Segment s = new Segment();
        s.setName("test segements");
        s.setDescription("Is a RBS segment customer");
        s.setShared(true);
        s.setCreateDate(new Date(System.currentTimeMillis()));
        s.setActive(true);
        s.setCode("SEG_RBS");
        //s.setCustomers(customersList);
        this.segmentRepo.save(s);

        segs.add(s);

        Segment s2 = new Segment();
        s2.setName("test segements2");
        s2.setDescription("Is a RBS segment customer");
        s2.setShared(true);
        s2.setCreateDate(new Date(System.currentTimeMillis()));
        s2.setActive(true);
        s2.setCode("SEG_RBS");
        //s.setCustomers(customersList);
        this.segmentRepo.save(s2);

        segs.add(s2);

        Faker faker = new Faker();
        Customer c = new Customer();
        c.setFirstName(faker.name().firstName());
        c.setSurname(faker.name().lastName());
        c.setActive(true);
        c.setKey(UUID.randomUUID().toString());
        c.getSegments().add(s);
        this.customerRepo.save(c);

        c = new Customer();
        c.setFirstName(faker.name().firstName());
        c.setSurname(faker.name().lastName());
        c.setActive(true);
        c.setKey(UUID.randomUUID().toString());
        c.getSegments().add(s2);
        this.customerRepo.save(c);


        c = new Customer();
        c.setFirstName(faker.name().firstName());
        c.setSurname(faker.name().lastName());
        c.setActive(true);
        c.setKey(UUID.randomUUID().toString());
        c.setSegments(segs);
        this.customerRepo.save(c);

        logger.debug("segs length: " + segs.size());

        if(segs != null && segs.size() > 0) {
            logger.debug("we have {} segements", segs.size());
            //TODO : work out how to do this as a query with ALL segments
            // Get the list of customer with the first segment
            List<Customer> firstSegList = this.customerRepo.findAllBySegments(s2);
            logger.debug("cs length with first seg only: " + firstSegList.size());

            // now loop through the rest of the segments and filter out customers who arent' in them
            for(Customer customer : firstSegList) {
                logger.debug(".");
                if(customer != null && customer.getSegments() != null && !customer.getSegments().containsAll(segs)) {
                    logger.debug("remove");
                    firstSegList.remove(customer);
                }
                logger.debug("cs length current" + firstSegList.size());
            }
            logger.debug("cs length: " + firstSegList.size());
        }

        //List<Customer> cs = this.customerRepo.findCustomerBySegmentsContaining(segs);



    }

}
