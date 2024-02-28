package au.com.cba.apiexperimachina.repo;

import au.com.cba.apiexperimachina.domain.Experiment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ExperimentRepo extends JpaRepository<Experiment, Long> {
    public List<Experiment> findAllByActive(boolean active);
}