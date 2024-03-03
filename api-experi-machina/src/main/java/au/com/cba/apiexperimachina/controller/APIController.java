package au.com.cba.apiexperimachina.controller;

import au.com.cba.apiexperimachina.domain.*;
import au.com.cba.apiexperimachina.repo.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Pageable;

import java.util.Date;
import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/api")
public class APIController {
    private static final Logger logger = LoggerFactory.getLogger(APIController.class);
    private final ControlGroupRepo controlGroupRepo;
    private final CustomerRepo customerRepo;
    private final EligibilityRepo eligibilityRepo;
    private final ExperimentRepo experimentRepo;
    private final FeatureRepo featureRepo;
    private final OutcomeRepo outcomeRepo;
    private final SegmentRepo segmentRepo;
    private final SurveyRepo surveyRepo;

    public APIController(ControlGroupRepo controlGroupRepo, CustomerRepo customerRepo, EligibilityRepo eligibilityRepo, ExperimentRepo experimentRepo, FeatureRepo featureRepo, OutcomeRepo outcomeRepo, SegmentRepo segmentRepo, SurveyRepo surveyRepo) {
        this.controlGroupRepo = controlGroupRepo;
        this.customerRepo = customerRepo;
        this.eligibilityRepo = eligibilityRepo;
        this.experimentRepo = experimentRepo;
        this.featureRepo = featureRepo;
        this.outcomeRepo = outcomeRepo;
        this.segmentRepo = segmentRepo;
        this.surveyRepo = surveyRepo;
    }

    // control groups
    // -------------

    @GetMapping("/controls")
    public List<ControlGroup> getControlGroups(@RequestParam(required = false) Boolean activeOnly)
    {
        logger.debug("activeOnly: "+ activeOnly);
        if(activeOnly != null && activeOnly.booleanValue())
        {
            return controlGroupRepo.findAllByActive(true);
        }
        else {
            return controlGroupRepo.findAll();
        }
    }

    @PostMapping("/control")
    public List<ControlGroup> createControlGroup(@RequestBody ControlGroup controlGroup)
    {
        controlGroup.setCreateDate(new Date(System.currentTimeMillis()));
        this.controlGroupRepo.save(controlGroup);
        return controlGroupRepo.findAll();
    }

    @PutMapping(path = "/control/{id}")
    public List<ControlGroup> saveControlGroup(@PathVariable Integer id, @RequestBody ControlGroup controlGroup){
        controlGroupRepo.save(controlGroup);
        return (List<ControlGroup>) controlGroupRepo.findAll();
    }

    @DeleteMapping(path = "/control/{id}")
    public List<ControlGroup> deleteControlGroup(@PathVariable Long id){
        Optional<ControlGroup> controlGroup = controlGroupRepo.findById(id);
        if(controlGroup.isPresent())
        {
            controlGroupRepo.delete(controlGroup.get());
        }
        return (List<ControlGroup>) controlGroupRepo.findAll();
    }
    
    
    // customer
    // ---------------
    @GetMapping("/customers")
    public List<Customer> getCustomers(@RequestParam(required = false) Boolean activeOnly)
    {
        logger.debug("activeOnly: "+ activeOnly);
        if(activeOnly != null && activeOnly.booleanValue())
        {
            return customerRepo.findAllByActive(true);
        }
        else {
            return customerRepo.findAll();
        }
    }

    @PostMapping("/customer")
    public List<Customer> createCustomer(@RequestBody Customer customer)
    {
        customer.setCreateDate(new Date(System.currentTimeMillis()));
        customer.setUpdateDate(new Date(System.currentTimeMillis()));
        this.customerRepo.save(customer);
        return customerRepo.findAll();
    }

    @PutMapping(path = "/customer/{id}")
    public List<Customer> saveCustomer(@PathVariable Integer id, @RequestBody Customer customer){
        //logger.debug("save customer ----------------");
        customer.setUpdateDate(new Date(System.currentTimeMillis()));
        customerRepo.save(customer);
        return (List<Customer>) customerRepo.findAll();
    }

    @DeleteMapping(path = "/customer/{id}")
    public List<Customer> deleteCustomer(@PathVariable Long id){
        Optional<Customer> customer = customerRepo.findById(id);
        if(customer.isPresent())
        {
            customerRepo.delete(customer.get());
        }
        return (List<Customer>) customerRepo.findAll();
    }

    @GetMapping("/customers/count")
    public long getCustomersCount()
    {
        return customerRepo.count();
    }

    @GetMapping("/customersPage")
    public Page getCustomersPage(@RequestParam("pageNumber") int pageNumber,
                                 @RequestParam("pageSize") int pageSize,
                                 @RequestParam("sortBy") String sortBy)
    {
        Pageable sortedByName = PageRequest.of(pageNumber, pageSize, Sort.by(sortBy));
        Page p = customerRepo.findAll(sortedByName);
        return p;
    }

    // ELIGIBILITY
    // --------------
    @GetMapping("/eligibilities")
    public List<Eligibility> getEligibilities(@RequestParam(required = false) Boolean activeOnly)
    {
        logger.debug("activeOnly: "+ activeOnly);
        if(activeOnly != null && activeOnly.booleanValue())
        {
            return eligibilityRepo.findAllByActive(true);
        }
        else {
            return eligibilityRepo.findAll();
        }
    }

    @PostMapping("/eligibility")
    public List<Eligibility> createEligibility(@RequestBody Eligibility eligibility)
    {
        eligibility.setCreateDate(new Date(System.currentTimeMillis()));
        this.eligibilityRepo.save(eligibility);
        return eligibilityRepo.findAll();
    }

    @PutMapping(path = "/eligibility/{id}")
    public List<Eligibility> saveEligibility(@PathVariable Integer id, @RequestBody Eligibility eligibility){
        //logger.debug("save eligibility ----------------");
        eligibilityRepo.save(eligibility);
        return (List<Eligibility>) eligibilityRepo.findAll();
    }

    @DeleteMapping(path = "/eligibility/{id}")
    public List<Eligibility> deleteEligibility(@PathVariable Long id){
        Optional<Eligibility> eligibility = eligibilityRepo.findById(id);
        if(eligibility.isPresent())
        {
            eligibilityRepo.delete(eligibility.get());
        }
        return (List<Eligibility>) eligibilityRepo.findAll();
    }

    // experiments
    //--------------
    
    @GetMapping("/experiments")
    public List<Experiment> getExperiments(@RequestParam(required = false) Boolean activeOnly)
    {
        logger.debug("activeOnly: "+ activeOnly);
        if(activeOnly != null && activeOnly.booleanValue())
        {
            return experimentRepo.findAllByActive(true);
        }
        else {
            return experimentRepo.findAll();
        }
    }

    @PostMapping("/experiment")
    public List<Experiment> createExperiment(@RequestBody Experiment experiment)
    {
        experiment.setCreateDate(new Date(System.currentTimeMillis()));
        experiment.setUpdateDate(new Date(System.currentTimeMillis()));
        this.experimentRepo.save(experiment);
        return experimentRepo.findAll();
    }

    @PutMapping(path = "/experiment/{id}")
    public List<Experiment> saveExperiment(@PathVariable Integer id, @RequestBody Experiment experiment){
        //logger.debug("save experiment ----------------");
        experiment.setUpdateDate(new Date(System.currentTimeMillis()));
        experimentRepo.save(experiment);
        return (List<Experiment>) experimentRepo.findAll();
    }

    @DeleteMapping(path = "/experiment/{id}")
    public List<Experiment> deleteExperiment(@PathVariable Long id){
        Optional<Experiment> experiment = experimentRepo.findById(id);
        if(experiment.isPresent())
        {
            experimentRepo.delete(experiment.get());
        }
        return (List<Experiment>) experimentRepo.findAll();
    }
    
    @GetMapping("/outcomes")
    public List<Outcome> getOutcomes()
    {
        return outcomeRepo.findAll();
    }


    // feature
    // ---------------
    @GetMapping("/features")
    public List<Feature> getFeatures(@RequestParam(required = false) Boolean activeOnly)
    {
        logger.debug("activeOnly: "+ activeOnly);
        if(activeOnly != null && activeOnly.booleanValue())
        {
            return featureRepo.findAllByActive(true);
        }
        else {
            return featureRepo.findAll();
        }
    }

    @PostMapping("/feature")
    public List<Feature> createFeature(@RequestBody Feature feature)
    {
        feature.setCreateDate(new Date(System.currentTimeMillis()));
        feature.setUpdateDate(new Date(System.currentTimeMillis()));
        this.featureRepo.save(feature);
        return featureRepo.findAll();
    }

    @PutMapping(path = "/feature/{id}")
    public List<Feature> saveFeature(@PathVariable Integer id, @RequestBody Feature feature){
        //logger.debug("save feature ----------------");
        feature.setUpdateDate(new Date(System.currentTimeMillis()));
        featureRepo.save(feature);
        return (List<Feature>) featureRepo.findAll();
    }

    @DeleteMapping(path = "/feature/{id}")
    public List<Feature> deleteFeature(@PathVariable Long id){
        Optional<Feature> feature = featureRepo.findById(id);
        if(feature.isPresent())
        {
            featureRepo.delete(feature.get());
        }
        return (List<Feature>) featureRepo.findAll();
    }

    @GetMapping("/features/count")
    public long getFeaturesCount()
    {
        return featureRepo.count();
    }

    @GetMapping("/featuresPage")
    public Page getFeaturesPage(@RequestParam("pageNumber") int pageNumber,
                                 @RequestParam("pageSize") int pageSize,
                                 @RequestParam("sortBy") String sortBy)
    {
        Pageable sortedByName = PageRequest.of(pageNumber, pageSize, Sort.by(sortBy));
        Page p = featureRepo.findAll(sortedByName);
        return p;
    }
    
    // SEGMENTS ------------
    // ---------------------
    @GetMapping("/segments")
    public List<Segment> getSegments(@RequestParam(required = false) Boolean activeOnly)
    {
        logger.debug("activeOnly: "+ activeOnly);
        if(activeOnly != null && activeOnly.booleanValue())
        {
            return segmentRepo.findAllByActive(true);
        }
        else {
            return segmentRepo.findAll();
        }
    }

    @PostMapping("/segment")
    public List<Segment> createSegment(@RequestBody Segment segment)
    {
        segment.setCreateDate(new Date(System.currentTimeMillis()));
        segment.setUpdateDate(new Date(System.currentTimeMillis()));
        this.segmentRepo.save(segment);
        return segmentRepo.findAll();
    }

    @PutMapping(path = "/segment/{id}")
    public List<Segment> saveSegment(@PathVariable Integer id, @RequestBody Segment segment){
        //logger.debug("save segment ----------------");
        segment.setUpdateDate(new Date(System.currentTimeMillis()));
        segmentRepo.save(segment);
        return (List<Segment>) segmentRepo.findAll();
    }

    @DeleteMapping(path = "/segment/{id}")
    public List<Segment> deleteSegment(@PathVariable Long id){
        Optional<Segment> segment = segmentRepo.findById(id);
        if(segment.isPresent())
        {
            segmentRepo.delete(segment.get());
        }
        return (List<Segment>) segmentRepo.findAll();
    }
    @GetMapping("/segments/count")
    public long getSegmentsCount()
    {
        return segmentRepo.count();
    }

    // surveys
    // ------------------
    @GetMapping("/surveys")
    public List<Survey> getSurveys(@RequestParam(required = false) Boolean activeOnly)
    {
        logger.debug("activeOnly: "+ activeOnly);
        if(activeOnly != null && activeOnly.booleanValue())
        {
            return surveyRepo.findAllByActive(true);
        }
        else {
            return surveyRepo.findAll();
        }
    }

    @PostMapping("/survey")
    public List<Survey> createSurvey(@RequestBody Survey survey)
    {
        survey.setCreateDate(new Date(System.currentTimeMillis()));
        survey.setUpdateDate(new Date(System.currentTimeMillis()));
        this.surveyRepo.save(survey);
        return surveyRepo.findAll();
    }

    @PutMapping(path = "/survey/{id}")
    public List<Survey> saveSurvey(@PathVariable Integer id, @RequestBody Survey survey){
        //logger.debug("save survey ----------------");
        survey.setUpdateDate(new Date(System.currentTimeMillis()));
        surveyRepo.save(survey);
        return (List<Survey>) surveyRepo.findAll();
    }

    @DeleteMapping(path = "/survey/{id}")
    public List<Survey> deleteSurvey(@PathVariable Long id){
        Optional<Survey> survey = surveyRepo.findById(id);
        if(survey.isPresent())
        {
            surveyRepo.delete(survey.get());
        }
        return (List<Survey>) surveyRepo.findAll();
    }
    
    
    // statistics
    // ------------------
    
    
    @GetMapping("/statistics")
    public Statistics getStatistics()
    {
        Statistics s = new Statistics();
        s.setControls(controlGroupRepo.count());
        s.setSegments(segmentRepo.count());
        s.setCustomers(customerRepo.count());
        s.setSurveys(surveyRepo.count());
        s.setExperiments(experimentRepo.count());
        s.setEligibilities(eligibilityRepo.count());
        return s;
    }

}