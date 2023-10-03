package jux.house;

import org.objectweb.asm.*;

import java.util.Arrays;

public class CustomClassVisitor extends ClassVisitor {

    private ClassInfo classInfo = new ClassInfo();

    public ClassInfo getClassInfo() {
        return classInfo;
    }

    public CustomClassVisitor(int api) {
        super(api);
    }

    public static ClassInfo init(byte[] classBytes) {
        ClassReader classReader = new ClassReader(classBytes);
        CustomClassVisitor classVisitor = new CustomClassVisitor(Opcodes.ASM9);
        classReader.accept(classVisitor, 0);
        ClassInfo info = classVisitor.getClassInfo();
        return info;
    }
    
    // Capture class-level details
    @Override
    public void visit(int version, int access, String name, String signature, String superName, String[] interfaces) {
        classInfo.className = name;
        classInfo.superClass = superName;
        classInfo.interfaces.addAll(Arrays.asList(interfaces));
    }

    // Capture field references
    @Override
    public FieldVisitor visitField(int access, String name, String descriptor, String signature, Object value) {
        Field field = new Field(name);
        classInfo.fields.add(field);
        return new CustomFieldVisitor(api);
    }

    // Capture method references
    @Override
    public MethodVisitor visitMethod(int access, String name, String descriptor, String signature, String[] exceptions) {
        Method method = new Method(name);
        classInfo.methods.add(method);
        return new CustomMethodVisitor(api, method);
    }

    // Capture annotations at the class level
    @Override
    public AnnotationVisitor visitAnnotation(String descriptor, boolean visible) {
        classInfo.annotations.add("Annotation: " + descriptor);
        return new CustomAnnotationVisitor(api);
    }

    public static class CustomFieldVisitor extends FieldVisitor {
        public CustomFieldVisitor(int api) {
            super(api);
        }

        // Capture field annotations
        @Override
        public AnnotationVisitor visitAnnotation(String descriptor, boolean visible) {
            System.out.println("Field Annotation: " + descriptor);
            return new CustomAnnotationVisitor(api);
        }
    }

    public static class CustomMethodVisitor extends MethodVisitor {
        public Method method;

        public CustomMethodVisitor(int api, Method method) {
            super(api);
            this.method = method;
        }

        // Capture opcode-based references
        @Override
        public void visitMethodInsn(int opcode, String owner, String name, String descriptor, boolean isInterface) {
            this.method.setOwner(owner);
        }

        @Override
        public void visitFieldInsn(int opcode, String owner, String name, String descriptor) {
            Field field = new Field(name);
            field.setOwner(owner);
            this.method.setField(field);
        }

        // Capture annotations on method
        @Override
        public AnnotationVisitor visitAnnotation(String descriptor, boolean visible) {
            System.out.println("Method Annotation: " + descriptor);
            return new CustomAnnotationVisitor(api);
        }
    }

    public static class CustomAnnotationVisitor extends AnnotationVisitor {
        public CustomAnnotationVisitor(int api) {
            super(api);
        }

        // Capture annotation values
        @Override
        public void visit(String name, Object value) {
            System.out.println("Annotation Field: " + name + "=" + value);
        }

        // Capture nested annotations
        @Override
        public AnnotationVisitor visitAnnotation(String name, String descriptor) {
            System.out.println("Nested Annotation: " + descriptor);
            return this;
        }
    }
}
