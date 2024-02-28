package au.com.cba.apiexperimachina.repo;

import au.com.cba.apiexperimachina.domain.Experiment;
import au.com.cba.apiexperimachina.domain.Survey;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SurveyRepo extends JpaRepository<Survey, Long> {
    public List<Survey> findAllByActive(boolean active);
}