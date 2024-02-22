package au.com.cba.apiexperimachina.repo;

import au.com.cba.apiexperimachina.domain.Experiment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExperimentRepo extends JpaRepository<Experiment, Long> {

}