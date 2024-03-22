package au.com.cba.apiexperimachina.domain;

import jakarta.persistence.*;

@MappedSuperclass
public abstract class BaseGroup {
    @Id
    @GeneratedValue
    private Long id;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
