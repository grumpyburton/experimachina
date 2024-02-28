package au.com.cba.apiexperimachina.repo;

import au.com.cba.apiexperimachina.domain.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CustomerRepo extends JpaRepository<Customer, Long> {
    public List<Customer> findAllByActive(boolean active);
}