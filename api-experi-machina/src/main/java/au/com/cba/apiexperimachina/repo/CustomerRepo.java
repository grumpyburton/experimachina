package au.com.cba.apiexperimachina.repo;


import au.com.cba.apiexperimachina.domain.Customer;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;

public interface CustomerRepo extends JpaRepository<Customer, Long> {

    //List<Customer> findAllCustomers(Pageable pageable);
}