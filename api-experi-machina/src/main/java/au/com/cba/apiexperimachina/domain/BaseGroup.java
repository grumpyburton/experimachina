package au.com.cba.apiexperimachina.domain;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.MappedSuperclass;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@MappedSuperclass
public class BaseGroup {

    @Id
    @GeneratedValue
    private Long id;
    private String name;
    private String description;

    private boolean active;

    @ManyToMany
    private List<Eligibility> eligibilities = new ArrayList<Eligibility>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    private java.util.Date createDate;
    private java.util.Date expireDate;

    public Date getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
    }

    public Date getExpireDate() {
        return expireDate;
    }

    public void setExpireDate(Date expireDate) {
        this.expireDate = expireDate;
    }

    public List<Eligibility> getEligibilities() {
        return eligibilities;
    }

    public void setEligibilities(List<Eligibility> eligibilities) {
        this.eligibilities = eligibilities;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }
}
