package au.com.cba.apiexperimachina.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class APIController {

    @GetMapping("/customers")
    public String getCustomers()
    {
        return "return something sensible";
    }
}
