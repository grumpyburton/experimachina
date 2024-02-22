package au.com.cba.apiexperimachina.repo;

import au.com.cba.apiexperimachina.domain.Outcome;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OutcomeRepo extends JpaRepository<Outcome, Long> {

}