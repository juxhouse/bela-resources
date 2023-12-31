package jux.house;

public class Method {
  public String name;
  public String owner;
  public Field field;

  public Method(String methodName) {
    this.name = methodName;
  }

  public void setOwner(String owner) {
    this.owner = owner;
  }

  public void setField(Field field) {
    this.field = field;
  }
}
