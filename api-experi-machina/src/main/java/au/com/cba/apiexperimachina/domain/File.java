package au.com.cba.apiexperimachina.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import org.hibernate.annotations.GenericGenerator;

import java.util.Date;

@Entity
public class File {
    @Id
    @GeneratedValue
    private Long id;
    private Date createDate;
    private String name;
    private String type;
    private boolean active;
    private long size;

    @JsonIgnore
    @Lob
    private byte[] data;
    public File() {
    }
    public File(String name, String type, byte[] data) {
        this.name = name;
        this.type = type;
        this.data = data;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public byte[] getData() {
        return data;
    }

    public void setData(byte[] data) {
        this.data = data;
    }

    public Date getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public long getSize() {
        return size;
    }

    public void setSize(long size) {
        this.size = size;
    }
}
