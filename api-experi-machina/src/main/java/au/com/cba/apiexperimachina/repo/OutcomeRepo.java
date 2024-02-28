package au.com.cba.apiexperimachina.repo;

import au.com.cba.apiexperimachina.domain.ControlGroup;
import au.com.cba.apiexperimachina.domain.Outcome;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OutcomeRepo extends JpaRepository<Outcome, Long> {
    public List<Outcome> findAllByActive(boolean active);
}