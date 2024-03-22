package au.com.cba.apiexperimachina.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
public class ControlGroup  extends BaseGroup {

    private String name;
    private String description;
    private boolean active;
    private java.util.Date createDate;
    private java.util.Date expireDate;
    @ManyToMany
    private List<Eligibility> eligibilities = new ArrayList<Eligibility>();

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

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

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

    public void addEligilbity(Eligibility e)
    {
        if(this.eligibilities == null)
        {
            this.eligibilities = new ArrayList<Eligibility>();
        }
        this.eligibilities.add(e);
    }
}
