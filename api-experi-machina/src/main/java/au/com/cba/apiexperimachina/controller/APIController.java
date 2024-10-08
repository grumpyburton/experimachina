package au.com.cba.apiexperimachina.controller;

import au.com.cba.apiexperimachina.domain.*;
import au.com.cba.apiexperimachina.repo.*;
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVRecord;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/api")
public class APIController {
    private static final Logger logger = LoggerFactory.getLogger(APIController.class);
    private final AudienceRepo audienceRepo;
    private final ControlGroupRepo controlGroupRepo;
    private final CustomerRepo customerRepo;
    private final EligibilityRepo eligibilityRepo;
    private final ExperimentRepo experimentRepo;
    private final FeatureRepo featureRepo;
    private final OutcomeRepo outcomeRepo;
    private final SegmentRepo segmentRepo;
    private final SurveyRepo surveyRepo;
    private final FileRepo fileRepo;

    public APIController(AudienceRepo audienceRepo, ControlGroupRepo controlGroupRepo, CustomerRepo customerRepo,
                         EligibilityRepo eligibilityRepo, ExperimentRepo experimentRepo, FeatureRepo featureRepo,
                         OutcomeRepo outcomeRepo, SegmentRepo segmentRepo, SurveyRepo surveyRepo,
                         FileRepo fileRepo) {
        this.audienceRepo = audienceRepo;
        this.controlGroupRepo = controlGroupRepo;
        this.customerRepo = customerRepo;
        this.eligibilityRepo = eligibilityRepo;
        this.experimentRepo = experimentRepo;
        this.featureRepo = featureRepo;
        this.outcomeRepo = outcomeRepo;
        this.segmentRepo = segmentRepo;
        this.surveyRepo = surveyRepo;
        this.fileRepo = fileRepo;
    }

    // AUDIENCE
    // --------------
    @GetMapping("/audiences")
    public List<Audience> getAudiences()
    {
        return audienceRepo.findAll();
    }

    @PostMapping("/audience")
    public List<Audience> createAudience(@RequestBody Audience audience)
    {
        audience.setCreateDate(new Date(System.currentTimeMillis()));
        audience.setUpdateDate(new Date(System.currentTimeMillis()));
        this.audienceRepo.save(audience);
        return audienceRepo.findAll();
    }

    @PutMapping(path = "/audience/{id}")
    public List<Audience> saveAudience(@PathVariable Integer id, @RequestBody Audience audience){
        //logger.debug("save audience ----------------");
        audience.setUpdateDate(new Date(System.currentTimeMillis()));
        audienceRepo.save(audience);
        return (List<Audience>) audienceRepo.findAll();
    }

    @DeleteMapping(path = "/audience/{id}")
    public List<Audience> deleteAudience(@PathVariable Long id){
        Optional<Audience> audience = audienceRepo.findById(id);
        if(audience.isPresent())
        {
            audienceRepo.delete(audience.get());
        }
        return (List<Audience>) audienceRepo.findAll();
    }
    
    // file handling
    // ----------------------------------
    @PostMapping("/uploadFile")
    public String saveFile(@RequestParam("file") MultipartFile file){
        try {
            logger.debug("saveFile");
            String fileName = file.getOriginalFilename();
            String contentType = file.getContentType();
            byte[] fileContent = file.getBytes();
            File savefile = new File(fileName, contentType, fileContent);
            savefile.setSize(fileContent.length);
            fileRepo.save(savefile);
            return "File saved successfully";
        }
        catch(Exception e) {
            logger.error(e.toString());
            return "File not saved";
        }
    }

    @GetMapping("/files")
    public List<File> getFiles(@RequestParam(required = false) Boolean activeOnly)
    {
        logger.debug("activeOnly: "+ activeOnly);
        if(activeOnly != null && activeOnly.booleanValue())
        {
            return fileRepo.findAll();
        }
        else {
            return fileRepo.findAll();
        }
    }

    @GetMapping("/file/{id}/import")
    public String processFile(@PathVariable Long id) throws Exception
    {
        Optional<File> file = fileRepo.findById(id);
        if(file.isPresent())
        {
           File f = file.get();

            String[] HEADERS = { "Customer", "Segment"};

            InputStream in = new ByteArrayInputStream(f.getData());

            CSVFormat csvFormat = CSVFormat.DEFAULT.builder()
                    .setHeader(HEADERS)
                    .setSkipHeaderRecord(true)
                    .build();

            Iterable<CSVRecord> records = csvFormat.parse(new InputStreamReader(in));
            for (CSVRecord record : records) {

                logger.debug("record: " + record);

                String custIdStr = record.get("Customer");
                String segment_code = record.get("Segment");
                logger.debug(custIdStr);
                if(custIdStr != null && !custIdStr.trim().isEmpty())
                {
                    long custId = Long.parseLong(custIdStr);
                    Customer c = this.customerRepo.getReferenceById(custId);
                    Segment s = this.segmentRepo.findSegmentByCode(segment_code);
                    s.addCustomer(c);
                    this.segmentRepo.save(s);
                }
                else {
                    logger.debug("custIdStr is null");
                }
            }
            return "done";
        }
        return "file not found";
    }

    @DeleteMapping(path = "/file/{id}")
    public List<File> deleteFile(@PathVariable Long id){
        Optional<File> file = fileRepo.findById(id);
        if(file.isPresent())
        {
            fileRepo.delete(file.get());
        }
        return (List<File>) fileRepo.findAll();
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

    @GetMapping("/customers/noa")
    public List<Customer> getCustomersNoAudience()
    {
        logger.debug("customers/noa");
        // TODO: work out if this can be done in the database....
        List<Customer> allCustomers = customerRepo.findAll();
        List<Audience> audiencesList = audienceRepo.findAll();

        logger.debug("before all customers {}", allCustomers.size());

        for(Audience a: audiencesList)
        {
            List<Customer> aCustomers = a.getCustomers();
            // remove customers from allCustomers
            allCustomers.removeAll(aCustomers);
        }
        logger.debug("after all customers {}", allCustomers.size());

        return allCustomers;

    }

    @GetMapping("/customers/segments")
    public List<Customer> getCustomersBySegments(@RequestParam List<Long> ids)
    {
        logger.debug("getCustomersBySegments()");

        List <Segment> segs = new ArrayList<Segment>();
        for(Long id : ids)
        {
            Optional<Segment> o = this.segmentRepo.findById(id);
            if(o.isPresent()) {
                segs.add(o.get());
            }
        }

        List<Customer> firstSegList = new ArrayList<Customer>();

        if(segs != null && segs.size() > 0) {
            logger.debug("we have {} segments", segs.size());
            //TODO : work out how to do this as a query with ALL segments
            // Get the list of customer with the first segment
            firstSegList = this.customerRepo.findAllBySegments(segs.getFirst());
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
            logger.debug("customers with all segments: " + firstSegList.size());
        }
        else {
            logger.info("getCustomersBySegments had no segments, so return full list");
            return this.customerRepo.findAll();
        }
        return firstSegList;
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
        s.setFeatures(featureRepo.count());
        s.setAudiences(audienceRepo.count());
        return s;
    }

}