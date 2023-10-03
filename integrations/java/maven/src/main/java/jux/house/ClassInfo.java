package jux.house;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class ClassInfo {
    public String className;
    public String superClass;
    public List<String> interfaces = new ArrayList<>();
    public List<Field> fields = new ArrayList<>();
    public List<Method> methods = new ArrayList<>();
    public List<String> annotations = new ArrayList<>();

   public Map<String, Object> toMap() {
        Map<String, Object> map = new HashMap<>();
        map.put("className", className);
        map.put("superClass", superClass);
        map.put("interfaces", interfaces);
        map.put("fields", fields);
        map.put("methods", methods);
        map.put("annotations", annotations);
        return map;
    }
}
