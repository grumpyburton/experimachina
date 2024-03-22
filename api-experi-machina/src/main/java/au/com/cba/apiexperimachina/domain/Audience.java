package au.com.cba.apiexperimachina.domain;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
public class Audience {
    @Id
    @GeneratedValue
    private Long id;
    private String name;
    private String description;
    private String type;
    @ManyToOne
    private ControlGroup controlGroup;
    @ManyToOne
    private Eligibility eligibility;
    @ManyToOne
    private Experiment experiment;
    @ManyToOne
    private Survey survey;
    @ManyToMany
    private List<Customer> customers = new ArrayList<>();

    private java.util.Date createDate;
    private java.util.Date updateDate;

   // private BaseGroup audienceFor;

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

    public List<Customer> getCustomers() {
        return customers;
    }

    public void setCustomers(List<Customer> customers) {
        this.customers = customers;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public ControlGroup getControlGroup() {
        return controlGroup;
    }

    public void setControlGroup(ControlGroup controlGroup) {
        this.controlGroup = controlGroup;
    }

    public Eligibility getEligibility() {
        return eligibility;
    }

    public void setEligibility(Eligibility eligibility) {
        this.eligibility = eligibility;
    }

    public Experiment getExperiment() {
        return experiment;
    }

    public void setExperiment(Experiment experiment) {
        this.experiment = experiment;
    }

    public Survey getSurvey() {
        return survey;
    }

    public void setSurvey(Survey survey) {
        this.survey = survey;
    }

    public Date getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
    }

    public Date getUpdateDate() {
        return updateDate;
    }

    public void setUpdateDate(Date updateDate) {
        this.updateDate = updateDate;
    }
}
