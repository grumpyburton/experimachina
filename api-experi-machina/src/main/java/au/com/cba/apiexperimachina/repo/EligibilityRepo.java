package au.com.cba.apiexperimachina.repo;

import au.com.cba.apiexperimachina.domain.Eligibility;
import au.com.cba.apiexperimachina.domain.Experiment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EligibilityRepo extends JpaRepository<Eligibility, Long> {
    public List<Eligibility> findAllByActive(boolean active);

    public Eligibility findByName(String name);
}