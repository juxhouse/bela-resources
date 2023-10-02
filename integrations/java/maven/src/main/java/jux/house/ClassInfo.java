package jux.house;

import java.util.ArrayList;
import java.util.List;

public class ClassInfo {
    public String className;
    public String superClass;
    public List<String> interfaces = new ArrayList<>();
    public List<String> fields = new ArrayList<>();
    public List<String> methods = new ArrayList<>();
    public List<String> annotations = new ArrayList<>();

    public String toString() {
      return className;
    }
}
