package au.com.cba.apiexperimachina.repo;

import au.com.cba.apiexperimachina.domain.ControlGroup;
import au.com.cba.apiexperimachina.domain.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ControlGroupRepo extends JpaRepository<ControlGroup, Long> {
    public List<ControlGroup> findAllByActive(boolean active);
}