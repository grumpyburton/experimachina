package au.com.cba.apiexperimachina.repo;

import au.com.cba.apiexperimachina.domain.Survey;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SurveyRepo extends JpaRepository<Survey, Long> {

}