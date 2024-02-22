package au.com.cba.apiexperimachina.controller;

import au.com.cba.apiexperimachina.domain.Customer;
import au.com.cba.apiexperimachina.domain.Segment;
import au.com.cba.apiexperimachina.domain.Statistics;
import au.com.cba.apiexperimachina.repo.CustomerRepo;
import au.com.cba.apiexperimachina.repo.SegmentRepo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.data.domain.Pageable;
import java.util.List;


@RestController
@RequestMapping("/api")
public class APIController {
    private static final Logger logger = LoggerFactory.getLogger(APIController.class);
    private final CustomerRepo customerRepo;
    private final SegmentRepo segmentRepo;

    public APIController(CustomerRepo customerRepo, SegmentRepo segmentRepo) {
        this.customerRepo = customerRepo;
        this.segmentRepo = segmentRepo;
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
        s.setControls(0);
        s.setSegments(segmentRepo.count());
        s.setCustomers(customerRepo.count());
        s.setSurveys(0);
        return s;
    }

}