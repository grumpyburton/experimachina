package au.com.cba.apiexperimachina.domain;

public class Statistics {
    private long customers;
    private long segments;
    private long experiments;
    private long surveys;
    private long controls;

    public long getCustomers() {
        return customers;
    }

    public void setCustomers(long customers) {
        this.customers = customers;
    }

    public long getSegments() {
        return segments;
    }

    public void setSegments(long segments) {
        this.segments = segments;
    }

    public long getExperiments() {
        return experiments;
    }

    public void setExperiments(long experiments) {
        this.experiments = experiments;
    }

    public long getSurveys() {
        return surveys;
    }

    public void setSurveys(long surveys) {
        this.surveys = surveys;
    }

    public long getControls() {
        return controls;
    }

    public void setControls(long controls) {
        this.controls = controls;
    }
}
