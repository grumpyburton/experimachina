package au.com.cba.apiexperimachina.controller;

import au.com.cba.apiexperimachina.domain.Customer;
import au.com.cba.apiexperimachina.repo.CustomerRepo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.data.domain.Pageable;
import java.util.List;


@RestController
@RequestMapping("/api")
public class APIController {
    private static final Logger logger = LoggerFactory.getLogger(APIController.class);
    private final CustomerRepo customerRepo;

    public APIController(CustomerRepo customerRepo) {
        this.customerRepo = customerRepo;
    }

    @GetMapping("/customers")
    public List<Customer> getCustomers()
    {
        Pageable sortedByName = PageRequest.of(0, 3, Sort.by("id"));
        Page p = customerRepo.findAll(sortedByName);

        return p.getContent();
    }

    @GetMapping("/customersPage")
    public Page getCustomersPage()
    {
        Pageable sortedByName = PageRequest.of(0, 10, Sort.by("id"));
        Page p = customerRepo.findAll(sortedByName);

        return p;
    }
}