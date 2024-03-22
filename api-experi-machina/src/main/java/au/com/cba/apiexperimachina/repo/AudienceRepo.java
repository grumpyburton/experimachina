package au.com.cba.apiexperimachina.repo;

import au.com.cba.apiexperimachina.domain.Audience;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AudienceRepo extends JpaRepository<Audience, Long> {
}