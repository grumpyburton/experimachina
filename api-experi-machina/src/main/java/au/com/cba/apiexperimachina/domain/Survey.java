package au.com.cba.apiexperimachina.domain;

import com.fasterxml.jackson.databind.ser.Serializers;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
public class Survey extends BaseGroup {

    @ManyToMany
    private List<Eligibility> eligibilities = new ArrayList<Eligibility>();
    private boolean active;
    private java.util.Date createDate;
    private java.util.Date updateDate;
    private java.util.Date startDate;
    private java.util.Date endDate;
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

    public Date getUpdateDate() {
        return updateDate;
    }

    public void setUpdateDate(Date updateDate) {
        this.updateDate = updateDate;
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public List<Eligibility> getEligibilities() {
        return eligibilities;
    }

    public void setEligibilities(List<Eligibility> eligibilities) {
        this.eligibilities = eligibilities;
    }
}
