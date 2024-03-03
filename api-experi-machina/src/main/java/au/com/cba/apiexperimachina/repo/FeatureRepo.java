package au.com.cba.apiexperimachina.repo;

import au.com.cba.apiexperimachina.domain.Feature;
import au.com.cba.apiexperimachina.domain.Survey;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FeatureRepo extends JpaRepository<Feature, Long> {
    public List<Feature> findAllByActive(boolean active);
}