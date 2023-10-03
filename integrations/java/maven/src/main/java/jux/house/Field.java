package jux.house;

public class Field {
  public String name;
  public String owner;

  public Field(String fieldName) {
    this.name = fieldName;
  }

  public void setOwner(String owner) {
    this.owner = owner;
  }
}
