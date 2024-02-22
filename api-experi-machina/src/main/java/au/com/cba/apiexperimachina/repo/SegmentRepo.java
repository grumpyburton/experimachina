package au.com.cba.apiexperimachina.repo;

import au.com.cba.apiexperimachina.domain.Segment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SegmentRepo extends JpaRepository<Segment, Long> {

}