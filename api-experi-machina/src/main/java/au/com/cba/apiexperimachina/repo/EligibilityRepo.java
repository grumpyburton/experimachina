package au.com.cba.apiexperimachina.repo;

import au.com.cba.apiexperimachina.domain.Eligibility;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EligibilityRepo extends JpaRepository<Eligibility, Long> {

}