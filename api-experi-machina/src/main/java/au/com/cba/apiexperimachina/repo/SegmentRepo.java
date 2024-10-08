package au.com.cba.apiexperimachina.repo;

import au.com.cba.apiexperimachina.domain.Segment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SegmentRepo extends JpaRepository<Segment, Long> {
    public List<Segment> findAllByActive(boolean active);
    public Segment findSegmentByCode(String code);
}