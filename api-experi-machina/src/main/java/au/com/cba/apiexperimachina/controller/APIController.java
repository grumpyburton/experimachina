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
    private final OutcomeRepo outcomeRepo;
    private final SegmentRepo segmentRepo;
    private final SurveyRepo surveyRepo;

    public APIController(ControlGroupRepo controlGroupRepo, CustomerRepo customerRepo, EligibilityRepo eligibilityRepo, ExperimentRepo experimentRepo, OutcomeRepo outcomeRepo, SegmentRepo segmentRepo, SurveyRepo surveyRepo) {
        this.controlGroupRepo = controlGroupRepo;
        this.customerRepo = customerRepo;
        this.eligibilityRepo = eligibilityRepo;
        this.experimentRepo = experimentRepo;
        this.outcomeRepo = outcomeRepo;
        this.segmentRepo = segmentRepo;
        this.surveyRepo = surveyRepo;
    }

    @GetMapping("/controlGroups")
    public List<ControlGroup> getControlGroups()
    {
        return controlGroupRepo.findAll();
    }
    
    @GetMapping("/customers")
    public List<Customer> getCustomers()
    {
        return customerRepo.findAll();
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
    @GetMapping("/eligibilities")
    public List<Eligibility> getEligibilities()
    {
        return eligibilityRepo.findAll();
    }

    @GetMapping("/experiments")
    public List<Experiment> getExperiments()
    {
        return experimentRepo.findAll();
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
    
    // SEGMENTS ------------
    // ---------------------
    @GetMapping("/segments")
    public List<Segment> getSegments()
    {
        return segmentRepo.findAll();
    }
    @GetMapping("/segments/count")
    public long getSegmentsCount()
    {
        return segmentRepo.count();
    }

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