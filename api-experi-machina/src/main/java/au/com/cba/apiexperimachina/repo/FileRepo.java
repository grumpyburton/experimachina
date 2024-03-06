package au.com.cba.apiexperimachina.repo;

import au.com.cba.apiexperimachina.domain.File;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FileRepo extends JpaRepository<File, Long> {
}
